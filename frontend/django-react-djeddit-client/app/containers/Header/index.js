import React, { memo, useState, useEffect } from 'react'
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  FormattedRelative,
} from 'react-intl'
// import { Menu } from 'semantic-ui-react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import PropTypes from 'prop-types'
import history from 'utils/history'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { matchPath } from 'react-router-dom'
import A from './A'
import Img from './Img'
// import NavBar from './NavBar'
// import HeaderLink from './HeaderLink'
import Banner from './banner.jpg'
import messages from './messages'
import { makeSelectSignedInUser, makeSelectLocation } from '../App/selectors'
import { loadSignedInUser } from '../App/actions'
import { useInjectSaga } from '../../utils/injectSaga'

import saga from '../App/saga'
import { TOPIC_URL_MASK } from '../App/urls'

const conf = window.DJEDDIT_CONFIG
let EMBEDDED_MODE = false
if (conf) {
  ;({ EMBEDDED_MODE } = conf)
}

const Header = ({ intl, location, signedInUser }) => {
  useInjectSaga({ key: 'app', saga }) // app level saga
  // console.log(location);

  const topicUrlMatch = matchPath(
    location.pathname, // like: /course/123
    { path: TOPIC_URL_MASK },
  )
  useEffect(() => {
    if (location) {
      switch (location.pathname) {
        case '/': {
          setActiveMenu('home')
          break
        }
        case '/topics': {
          setActiveMenu('topics')
          break
        }
        case '/signup': {
          setActiveMenu('signup')
          break
        }
        case '/new-topic': {
          setActiveMenu('new-topic')
          break
        }
        case '/signin': {
          setActiveMenu('signin')
          break
        }
        default: {
          setActiveMenu('home')
          break
        }
      }
    }
  }, [location])

  // console.log(topicUrlMatch)

  // TODO set match href menu intial
  const [activeMenu, setActiveMenu] = useState('home')

  const handleHomeClick = () => {
    history.push('/')
    // setActiveMenu('home')
  }

  const handleTopicsClick = () => {
    history.push('/topics')
    // setActiveMenu('topics')
  }

  const handleSignupClick = () => {
    history.push('/signup')
    // setActiveMenu('signup')
  }

  const handleNewTopicClick = () => {
    history.push('/new-topic')
    // setActiveMenu('new-topic')
  }

  const handleNewThreadClick = topicSlug => {
    history.push(`${topicSlug}/new-thread`)
    setActiveMenu('new-thread')
  }

  const handleSigninClick = () => {
    history.push('/signin')
    setActiveMenu('signin')
  }

  return (
    <div>
      {!EMBEDDED_MODE && (
        <A href="/">
          <Img src={Banner} alt="django-react-djeddit-client - Logo" />
        </A>
      )}
      <Navbar>
        <Nav className="mr-auto">
          {!EMBEDDED_MODE && (
            <Nav.Link
              name={intl.formatMessage(messages.home)}
              active={activeMenu === 'home'}
              onClick={handleHomeClick}
            >
              {intl.formatMessage(messages.home)}
            </Nav.Link>
          )}
          {!EMBEDDED_MODE && (
            <Nav.Link
              name={intl.formatMessage(messages.topics)}
              active={activeMenu === 'topics'}
              onClick={handleTopicsClick}
            >
              {intl.formatMessage(messages.topics)}
            </Nav.Link>
          )}
          {signedInUser && (
            <React.Fragment>
              <Nav.Link
                name={intl.formatMessage(messages.newTopic)}
                active={activeMenu === 'new-topic'}
                onClick={handleNewTopicClick}
              >
                {intl.formatMessage(messages.newTopic)}
              </Nav.Link>
              {topicUrlMatch && (
                <Nav.Link
                  name={intl.formatMessage(messages.newThread)}
                  active={activeMenu === 'new-thread'}
                  onClick={() =>
                    handleNewThreadClick(topicUrlMatch.params.topicSlug)
                  }
                >
                  {intl.formatMessage(messages.newThread)}
                </Nav.Link>
              )}
            </React.Fragment>
          )}
        </Nav>
        {!EMBEDDED_MODE && (
          <Nav>
            {/* <Nav.Link> */}
            {/* <Input icon='search' placeholder='Search...' /> */}
            {/* </Nav.Link> */}
            {signedInUser ? (
              <Navbar.Text>{signedInUser.username}</Navbar.Text>
            ) : (
              <React.Fragment>
                <Nav.Link
                  name="Sign in"
                  active={activeMenu === 'signup'}
                  onClick={handleSigninClick}
                >
                  Sign in
                </Nav.Link>
                <Nav.Link
                  name="Sign Up"
                  active={activeMenu === 'signup'}
                  onClick={handleSignupClick}
                >
                  Sign Up
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        )}
      </Navbar>
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
  // loading: PropTypes.bool,
  location: PropTypes.object,
  intl: PropTypes.object,
  signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  signedInUser: makeSelectSignedInUser(),
  location: makeSelectLocation(),
})

export function mapDispatchToProps(dispatch) {
  return {
    loadSignedInUserAction: () => dispatch(loadSignedInUser()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(injectIntl(Header))
