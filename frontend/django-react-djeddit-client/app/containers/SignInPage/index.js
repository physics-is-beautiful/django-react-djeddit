/*
 * SignInPage
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
import * as signinCreators from './actions'
// import { makeSelectUser } from './selectors'
import reducer from './reducer'
import saga from './saga'

const key = 'signin'

export function SignInPage({
  // username,
  // loading,
  // error,
  // repos,
  // onSubmitForm,
  signInActions,
  intl,
  // onChangeUsername,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  // const formList = ['username', 'email', 'password']
  const formList = ['login', 'password']
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

    // if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   errors.email = 'Email address is invalid'
    // }
    return errors
  }

  // const handleChange = (event, { name, value }) => {
  //   console.log(event);
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
    signInActions.signIn(formData)
  }

  /* TODO create this form based on OPTION API call */
  /* TODO add validation errors info */

  return (
    <article>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Djeddit react signin page" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            {/* <FormattedMessage {...messages.startProjectHeader} /> */}
            <FormattedMessage {...messages.signinHeader} />
          </H2>
          <p>{/* <FormattedMessage {...messages.startProjectMessage} /> */}</p>
        </CenteredSection>
        <Section>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                required
                label={intl.formatMessage(messages.login)}
                value={formData.login}
                onChange={handleChange}
                name="login"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                label={intl.formatMessage(messages.password)}
                value={formData.password}
                type="password"
                name="password"
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

SignInPage.propTypes = {
  signInActions: PropTypes.shape({
    signIn: PropTypes.func.isRequired,
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
    signInActions: bindActionCreators(signinCreators, dispatch),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    //   // dispatch(loadRepos())
    //   dispatch(signIn())
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
)(injectIntl(SignInPage))
