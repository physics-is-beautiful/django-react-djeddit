/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl'

export const scope = 'boilerplate.containers.SignInPage'

export default defineMessages({
  signinHeader: {
    id: `${scope}.signin.header`,
    defaultMessage: 'Sign in account',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  // usernameDescription: {
  //   id: `${scope}.username.description`,
  //   defaultMessage:
  //     'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.',
  // },
  email: {
    id: `${scope}.email`,
    defaultMessage: 'E-mail',
  },
  password: {
    id: `${scope}.password`,
    defaultMessage: 'Password',
  },
  // passwordDescription: {
  //   id: `${scope}.password.description`,
  //   defaultMessage:
  //     "<ul><li>Your password can't be too similar to your other personal information.</li><li>Your password must contain at least 8 characters.</li><li>Your password can't be a commonly used password.</li><li>Your password can't be entirely numeric.</li></ul>",
  // },
  // passwordConfirmation: {
  //   id: `${scope}.password.confirmation`,
  //   defaultMessage: 'Password confirmation*',
  // },
  // passwordConfirmationDescription: {
  //   id: `${scope}.password.confirmation.description`,
  //   defaultMessage: 'Enter the same password as before, for verification.',
  // },
  submitButton: {
    id: `${scope}.submitButton`,
    defaultMessage: 'Submit',
  },
})
