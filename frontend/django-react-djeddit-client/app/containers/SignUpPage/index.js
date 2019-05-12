/*
 * SignUpPage
 */

import React, { useEffect, memo, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createStructuredSelector } from 'reselect'
import { Button, Checkbox, Form } from 'semantic-ui-react'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors'
import H2 from 'components/H2'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
import { loadRepos } from '../App/actions'
import { changeUsername } from './actions'
import { makeSelectUsername } from './selectors'
import reducer from './reducer'
import saga from './saga'

const key = 'signup'

export function SignUpPage({
  // username,
  // loading,
  // error,
  // repos,
  onSubmitForm,
  intl,
  // onChangeUsername,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const [submitDisabled, setSubmitDisabled] = useState(true)

  const handleChange = (e, { name, value }) => {
    // TODO validate input
    setState(prevState => ({ ...prevState, [name]: value }), () => {})
  }

  // useEffect(() => {
  //   // When initial state username is not null, submit the form to load repos
  //   if (username && username.trim().length > 0) onSubmitForm()
  // }, [])

  // const reposListProps = {
  //   loading,
  //   error,
  //   repos,
  // }

  const handleSubmit = () => {
    const { name, email } = this.state
    onSubmitForm()
  }

  /* TODO create this form based on OPTION API call */

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
            <Form.Field required>
              <Form.Input
                label={intl.formatMessage(messages.username)}
                value={state.username}
                onChange={handleChange}
              />
              <FormattedMessage {...messages.usernameDescription} />
            </Form.Field>
            <Form.Field required>
              <Form.Input
                label={intl.formatMessage(messages.email)}
                value={state.email}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field required>
              <Form.Input
                label={intl.formatMessage(messages.password)}
                value={state.password}
                onChange={handleChange}
              />
              <FormattedHTMLMessage {...messages.passwordDescription} />
            </Form.Field>
            <Form.Field required>
              <Form.Input
                label={intl.formatMessage(messages.passwordConfirmation)}
                value={state.password2}
                onChange={handleChange}
              />
              <FormattedMessage {...messages.passwordConfirmationDescription} />
            </Form.Field>
            <Button type="submit" disabled={submitDisabled}>
              <FormattedMessage {...messages.submitButton} />
            </Button>
          </Form>
        </Section>
        <Section>
          {/* <H2> */}
          {/* <FormattedMessage {...messages.trymeHeader} /> */}
          {/* </H2> */}
          {/* <Form onSubmit={onSubmitForm}> */}
          {/* <label htmlFor="username"> */}
          {/* <FormattedMessage {...messages.trymeMessage} /> */}
          {/* <AtPrefix> */}
          {/* <FormattedMessage {...messages.trymeAtPrefix} /> */}
          {/* </AtPrefix> */}
          {/* <Input */}
          {/* id="username" */}
          {/* type="text" */}
          {/* placeholder="mxstbr" */}
          {/* value={username} */}
          {/* onChange={onChangeUsername} */}
          {/* /> */}
          {/* </label> */}
          {/* </Form> */}
          {/* <ReposList {...reposListProps} /> */}
        </Section>
      </div>
    </article>
  )
}

SignUpPage.propTypes = {
  // loading: PropTypes.bool,
  // error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  // onChangeUsername: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault()
      dispatch(loadRepos())
    },
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
