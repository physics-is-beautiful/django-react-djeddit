import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, Menu } from 'semantic-ui-react'
import { injectIntl, intlShape, FormattedRelative } from 'react-intl'

import PropTypes from 'prop-types'
import history from 'utils/history'

import A from './A'
import Img from './Img'
// import NavBar from './NavBar'
// import HeaderLink from './HeaderLink'
import Banner from './banner.jpg'
import messages from './messages'

const Header = ({ intl }) => {
  const [activeMenu, setActiveMenu] = useState('home')

  const handleHomeClick = () => {
    history.push('/')
    setActiveMenu('home')
  }

  const handleTopicsClick = () => {
    history.push('/topics')
    setActiveMenu('topics')
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
        <Menu.Menu position="right">
          {/*<Menu.Item>*/}
          {/*<Input icon='search' placeholder='Search...' />*/}
          {/*</Menu.Item>*/}
          <Menu.Item
            name="Login"
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Sign Up"
            // active={activeItem === 'logout'}
            // onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
      {/*<NavBar>*/}
      {/*<HeaderLink to='/'>*/}
      {/*<FormattedMessage {...messages.home} />*/}
      {/*</HeaderLink>*/}
      {/*<HeaderLink to='/features'>*/}
      {/*<FormattedMessage {...messages.features} />*/}
      {/*</HeaderLink>*/}
      {/*</NavBar>*/}
    </div>
  )
}

Header.propTypes = {
  selectedMenu: PropTypes.string,
  intl: PropTypes.object,
}

export default injectIntl(Header)
