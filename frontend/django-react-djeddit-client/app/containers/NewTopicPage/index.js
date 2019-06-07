/*
 * NewTopicPage
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
// import { newTopic } from './actions'
import * as newtopicCreators from './actions'
// import { makeSelectUser } from './selectors'
import reducer from './reducer'
import saga from './saga'

const key = 'newtopic'

export function NewTopicPage({
  // username,
  // loading,
  // error,
  signedInUser,
  // onSubmitForm,
  newTopicActions,
  intl,
  // onChangeUsername,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const formList = ['title', 'description']
  // const formList = ['title']
  const formDict = formList.reduce((_obj, x) => {
    const obj = Object.assign({}, _obj)
    obj[x] = ''
    return obj
  }, {})

  const [formData, setFormData] = useState(formDict)
  const [errors, setErrors] = useState({})

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const validateForm = () => {
    const errors = {}
    formList.forEach(function(formKey) {
      if (formKey != 'description' && !formData[formKey]) {
        errors[formKey] = `${formKey} is required`
      }
    })

    return errors
  }

  // const handleChange = (event, { name, value }) => {
  //   setFormData(prevState => ({ ...prevState, [name]: value }))
  // }

  const handleChange = event => {
    const { name } = event.target
    const { value } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
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
    newTopicActions.newTopic(formData)
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

  /* TODO create this form based on OPTION API call */
  /* TODO add validation errors info */

  return (
    <article>
      <Helmet>
        <title>New topic</title>
        <meta name="description" content="Djeddit react newtopic page" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.newTopicHeader} />
          </H2>
        </CenteredSection>
        <Section>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.title} />
              </label>
              <Form.Control
                required
                type="text"
                // label={intl.formatMessage(messages.title)}
                value={formData.title}
                onChange={handleChange}
                name="title"
              />
            </Form.Group>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.description} />
              </label>
              <Form.Control
                // label={intl.formatMessage(messages.description)}
                value={formData.description}
                type="textarea"
                name="description"
                onChange={handleChange}
              />
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

NewTopicPage.propTypes = {
  newTopicActions: PropTypes.shape({
    newTopic: PropTypes.func.isRequired,
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
    newTopicActions: bindActionCreators(newtopicCreators, dispatch),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    //   // dispatch(loadRepos())
    //   dispatch(newTopic())
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
)(injectIntl(NewTopicPage))
