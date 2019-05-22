import React, { useState } from 'react'
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  FormattedRelative,
} from 'react-intl'
import { Input, Menu } from 'semantic-ui-react'

import PropTypes from 'prop-types'
import history from 'utils/history'

import A from './A'
import Img from './Img'
// import NavBar from './NavBar'
// import HeaderLink from './HeaderLink'
import Banner from './banner.jpg'
import messages from './messages'

const Header = ({ intl, signedInUser }) => {
  const [activeMenu, setActiveMenu] = useState('home')

  const handleHomeClick = () => {
    history.push('/')
    setActiveMenu('home')
  }

  const handleTopicsClick = () => {
    history.push('/topics')
    setActiveMenu('topics')
  }

  const handleSignupClick = () => {
    history.push('/signup')
    setActiveMenu('signup')
  }

  const handleNewTopicClick = () => {
    history.push('/new-topic')
    setActiveMenu('new-topic')
  }

  const handleNewThreadClick = () => {
    history.push('/new-thread')
    setActiveMenu('new-thread')
  }

  const handleSigninClick = () => {
    history.push('/signin')
    setActiveMenu('signin')
  }

  return (
    <div>
      <A href="/">
        <Img src={Banner} alt="django-react-djeddit-client - Logo" />
      </A>
      <Menu secondary>
        <Menu.Item
          name={intl.formatMessage(messages.home)}
          active={activeMenu === 'home'}
          onClick={handleHomeClick}
        />
        <Menu.Item
          name={intl.formatMessage(messages.topics)}
          active={activeMenu === 'topics'}
          onClick={handleTopicsClick}
        />
        {signedInUser && (
          <React.Fragment>
            <Menu.Item
              name={intl.formatMessage(messages.newTopic)}
              active={activeMenu === 'new-topic'}
              onClick={handleNewTopicClick}
            />
            <Menu.Item
              name={intl.formatMessage(messages.newThread)}
              active={activeMenu === 'new-thread'}
              onClick={handleNewThreadClick}
            />
          </React.Fragment>
        )}
        <Menu.Menu position="right">
          {/* <Menu.Item> */}
          {/* <Input icon='search' placeholder='Search...' /> */}
          {/* </Menu.Item> */}
          {signedInUser ? (
            <Menu.Item
              name={signedInUser.username}
              // active={activeMenu === 'signup'}
              // onClick={handleSignupClick}
            />
          ) : (
            <React.Fragment>
              <Menu.Item
                name="Sign in"
                active={activeMenu === 'signup'}
                onClick={handleSigninClick}
              />
              <Menu.Item
                name="Sign Up"
                active={activeMenu === 'signup'}
                onClick={handleSignupClick}
              />
            </React.Fragment>
          )}
        </Menu.Menu>
      </Menu>
      {/* <NavBar> */}
      {/* <HeaderLink to='/'> */}
      {/* <FormattedMessage {...messages.home} /> */}
      {/* </HeaderLink> */}
      {/* <HeaderLink to='/features'> */}
      {/* <FormattedMessage {...messages.features} /> */}
      {/* </HeaderLink> */}
      {/* </NavBar> */}
    </div>
  )
}

Header.propTypes = {
  // selectedMenu: PropTypes.string,
  intl: PropTypes.object,
  signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

export default injectIntl(Header)
