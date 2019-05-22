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
import { Button, Form } from 'semantic-ui-react'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
// import {
//   makeSelectRepos,
//   makeSelectLoading,
//   makeSelectError,
// } from 'containers/App/selectors'
import H2 from 'components/H2'
import { makeSelectSignedInUser } from '../App/selectors'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
// import { loadRepos } from '../App/actions'
// import { newThread } from './actions'
import * as newThreadCreators from './actions'
// import { makeSelectUser } from './selectors'
import reducer from './reducer'
import saga from './saga'

const key = 'newThread'

export function NewThreadPage({
  // username,
  // loading,
  // error,
  signedInUser,
  // onSubmitForm,
  newThreadActions,
  intl,
  // onChangeUsername,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const formList = ['title', 'content']
  const formDict = formList.reduce((_obj, x) => {
    const obj = Object.assign({}, _obj)
    obj[x] = ''
    return obj
  }, {})

  const [formData, setFormData] = useState(formDict)
  const [errors, setErrors] = useState({})
  const [mdeTab, setMdeTab] = useState('write')

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const validateForm = () => {
    const errors = {}
    formList.forEach(function(formKey) {
      if (!formData[formKey]) {
        errors[formKey] = `${formKey} is required`
      }
    })

    return errors
  }

  const handleChange = (event, { name, value }) => {
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleContentChange = val => {
    setFormData(prevState => ({ ...prevState, content: val }))
  }

  const handleTabChange = tab => {
    setMdeTab(tab)
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

  const handleSubmit = () => {
    // onSubmitForm(...formData)
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

  const markdownConverter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

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
            <FormattedMessage {...messages.newThreadHeader} />
          </H2>
        </CenteredSection>
        <Section>
          <Form onSubmit={handleSubmit}>
            <Form.Field required>
              <label>
                <FormattedHTMLMessage {...messages.title} />
              </label>
              <Form.Input
                // label={intl.formatMessage(messages.title)}
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Field>
            <Form.Field required>
              <label>
                <FormattedHTMLMessage {...messages.content} />
              </label>
              <ReactMde
                onChange={handleContentChange}
                value={formData.content}
                onTabChange={handleTabChange}
                selectedTab={mdeTab}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(markdownConverter.makeHtml(markdown))
                }
              />
              {/* <Form.Input */}
              {/* // label={intl.formatMessage(messages.description)} */}
              {/* value={formData.description} */}
              {/* type="textarea" */}
              {/* name="description" */}
              {/* onChange={handleChange} */}
              {/* /> */}
            </Form.Field>
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
  signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  signedInUser: makeSelectSignedInUser(),
  // user: makeSelectUser(),
  // formData: makeSelectFormData(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    newThreadActions: bindActionCreators(newThreadCreators, dispatch),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    //   // dispatch(loadRepos())
    //   dispatch(newThread())
    // },
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
