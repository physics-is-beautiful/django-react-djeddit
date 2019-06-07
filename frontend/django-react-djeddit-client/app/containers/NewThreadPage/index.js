/*
 * NewThreadPage
 */

import React, { useEffect, memo, useState } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { createStructuredSelector } from 'reselect'
// import { Button, Form } from 'semantic-ui-react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useInjectReducer } from '../../utils/injectReducer'
import { useInjectSaga } from '../../utils/injectSaga'

import H2 from 'components/H2'
import ContentEditor from 'components/ContentEditor'

import { makeSelectSignedInUser } from '../App/selectors'
import { makeSelectTopic } from '../Topics/selectors'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'

import * as newThreadCreators from './actions'
import * as topicsActionsCreator from '../Topics/actions'

import reducer from './reducer'
import saga from './saga'
import topicsReducer from '../Topics/reducer'
import topicsSaga from '../Topics/saga'

const key = 'threads'
const topicsKey = 'topics'

export function NewThreadPage({
  match,
  // loading,
  // error,
  signedInUser,
  // onSubmitForm,
  newThreadActions,
  topicsActions,
  intl,
  topic,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  useInjectReducer({ key: topicsKey, reducer: topicsReducer })
  useInjectSaga({ key: topicsKey, saga: topicsSaga })

  useEffect(() => {
    if (!topic) {
      // load topic if we navigate url by reloading page
      topicsActions.loadTopic(match.params.topicSlug)
    }
  }, [])

  const formList = ['title', 'content']
  const formDict = formList.reduce(
    (_obj, x) => {
      const obj = Object.assign({}, _obj)
      obj[x] = ''
      return obj
    },
    { topic_slug: match.params.topicSlug },
  )

  const [formData, setFormData] = useState(formDict)
  const [errors, setErrors] = useState({})
  // const [mdeTab, setMdeTab] = useState('write')

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const validateForm = () => {
    const validationErrors = {}
    formList.forEach(function(formKey) {
      if (!formData[formKey]) {
        validationErrors[formKey] = `${formKey} is required`
      }
    })

    return validationErrors
  }

  // const handleChange = (event, { name, value }) => {
  //   setFormData(prevState => ({ ...prevState, [name]: value }))
  // }
  const handleChange = event => {
    const { name } = event.target
    const { value } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleContentChange = val => {
    setFormData(prevState => ({ ...prevState, content: val }))
  }

  useEffect(() => {
    const validationErrors = validateForm()
    if (
      Object.keys(validationErrors).length === 0 &&
      validationErrors.constructor === Object
    ) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }

    setErrors(validationErrors)
  }, [formData])

  const handleSubmit = event => {
    event.preventDefault()
    event.stopPropagation()
    newThreadActions.newThread(formData)
  }

  if (signedInUser === undefined) {
    // user loading false / todo it is better to use signedInUserError value
    return (
      <Redirect
        to={{
          pathname: '/signin',
        }}
      />
    )
  }

  // const markdownConverter = new Showdown.Converter({
  //   tables: true,
  //   simplifiedAutoLink: true,
  //   strikethrough: true,
  //   tasklists: true,
  // })

  /* TODO create this form based on OPTION API call */
  /* TODO add validation errors info */

  return (
    <article>
      <Helmet>
        <title>New Thread</title>
        <meta name="description" content="Djeddit react newThread page" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.newThreadHeader} /> on the{' '}
            {topic.title}
          </H2>
        </CenteredSection>
        <Section>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.title} />
              </label>
              <Form.Control
                // label={intl.formatMessage(messages.title)}
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.content} />
              </label>
              <ContentEditor onContentChange={handleContentChange} />
            </Form.Group>
            <Button type="submit" disabled={submitDisabled}>
              <FormattedMessage {...messages.submitButton} />
            </Button>
          </Form>
        </Section>
      </div>
    </article>
  )
}

NewThreadPage.propTypes = {
  newThreadActions: PropTypes.shape({
    newThread: PropTypes.func.isRequired,
  }).isRequired,
  topicsActions: PropTypes.shape({
    loadTopic: PropTypes.func.isRequired,
  }).isRequired,
  signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  match: PropTypes.object,
  topic: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  signedInUser: makeSelectSignedInUser(),
  topic: makeSelectTopic(),
  // formData: makeSelectFormData(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    topicsActions: bindActionCreators(topicsActionsCreator, dispatch),
    newThreadActions: bindActionCreators(newThreadCreators, dispatch),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(injectIntl(NewThreadPage))
