/*
 * SignUpPage
 */

import React, { useEffect, memo, useState } from 'react'

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

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
// import { loadRepos } from '../App/actions'
// import { signUp } from './actions'
import * as signupCreators from './actions'
import { makeSelectUser } from './selectors'
import reducer from './reducer'
import saga from './saga'

const key = 'signup'

export function SignUpPage({
  // username,
  // loading,
  // error,
  // repos,
  // onSubmitForm,
  signUpActions,
  intl,
  // onChangeUsername,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const formList = ['username', 'email', 'password1', 'password2']
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
      if (!formData[formKey]) {
        errors[formKey] = `${formKey} is required`
      }
    })

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid'
    }
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
    signUpActions.signUp(formData)
  }

  /* TODO create this form based on OPTION API call */
  /* TODO add validation errors info */

  return (
    <article>
      <Helmet>
        <title>Sign Up</title>
        <meta name="description" content="Djeddit react signup page" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            {/* <FormattedMessage {...messages.startProjectHeader} /> */}
            <FormattedMessage {...messages.signupHeader} />
          </H2>
          <p>{/* <FormattedMessage {...messages.startProjectMessage} /> */}</p>
        </CenteredSection>
        <Section>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.username} />
              </label>
              <Form.Control
                // label={intl.formatMessage(messages.username)}
                required
                type="text"
                value={formData.username}
                onChange={handleChange}
                name="username"
              />
              <FormattedMessage {...messages.usernameDescription} />
            </Form.Group>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.email} />
              </label>
              <Form.Control
                required
                // label={intl.formatMessage(messages.email)}
                value={formData.email}
                onChange={handleChange}
                type="text"
                name="email"
              />
            </Form.Group>
            <Form.Group required>
              <label>
                <FormattedHTMLMessage {...messages.password} />
              </label>
              <Form.Control
                // label={intl.formatMessage(messages.password)}
                required
                value={formData.password}
                type="password"
                name="password1"
                onChange={handleChange}
              />
              <FormattedHTMLMessage {...messages.passwordDescription} />
            </Form.Group>
            <Form.Group>
              <label>
                <FormattedHTMLMessage {...messages.passwordConfirmation} />
              </label>
              <Form.Control
                // label={intl.formatMessage(messages.passwordConfirmation)}
                required
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
              />
              <FormattedMessage {...messages.passwordConfirmationDescription} />
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

SignUpPage.propTypes = {
  signUpActions: PropTypes.shape({
    signUp: PropTypes.func.isRequired,
  }).isRequired,
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // onSubmitForm: PropTypes.func,
  // username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  // user: makeSelectUser(),
  // formData: makeSelectFormData(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    signUpActions: bindActionCreators(signupCreators, dispatch),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    //   // dispatch(loadRepos())
    //   dispatch(signUp())
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
)(injectIntl(SignUpPage))
