/*
 * SignUpPage
 */

import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
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
  username,
  // loading,
  // error,
  // repos,
  onSubmitForm,
  // onChangeUsername,
}) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  // useEffect(() => {
  //   // When initial state username is not null, submit the form to load repos
  //   if (username && username.trim().length > 0) onSubmitForm()
  // }, [])

  // const reposListProps = {
  //   loading,
  //   error,
  //   repos,
  // }

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
            {/*<FormattedMessage {...messages.startProjectHeader} />*/}
            <FormattedMessage {...messages.signupHeader} />
          </H2>
          <p>{/*<FormattedMessage {...messages.startProjectMessage} />*/}</p>
        </CenteredSection>
        <Section>
          <Form>
            <Form.Field required>
              <label>
                <FormattedMessage {...messages.username} />
              </label>
              <input />
              <FormattedMessage {...messages.usernameDescription} />
            </Form.Field>
            <Form.Field required>
              <label>
                <FormattedMessage {...messages.email} />
              </label>
              <input />
            </Form.Field>
            <Form.Field required>
              <label>
                <FormattedMessage {...messages.password} />
              </label>
              <input />
              <FormattedHTMLMessage {...messages.passwordDescription} />
            </Form.Field>
            <Form.Field required>
              <label>
                <FormattedMessage {...messages.passwordConfirmation} />
              </label>
              <input />
              <FormattedMessage {...messages.passwordConfirmationDescription} />
            </Form.Field>
            <Button type="submit"><FormattedMessage {...messages.submitButton} /></Button>
          </Form>
        </Section>
        <Section>
          {/*<H2>*/}
          {/*<FormattedMessage {...messages.trymeHeader} />*/}
          {/*</H2>*/}
          {/*<Form onSubmit={onSubmitForm}>*/}
          {/*<label htmlFor="username">*/}
          {/*<FormattedMessage {...messages.trymeMessage} />*/}
          {/*<AtPrefix>*/}
          {/*<FormattedMessage {...messages.trymeAtPrefix} />*/}
          {/*</AtPrefix>*/}
          {/*<Input*/}
          {/*id="username"*/}
          {/*type="text"*/}
          {/*placeholder="mxstbr"*/}
          {/*value={username}*/}
          {/*onChange={onChangeUsername}*/}
          {/*/>*/}
          {/*</label>*/}
          {/*</Form>*/}
          {/*<ReposList {...reposListProps} />*/}
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
)(SignUpPage)
