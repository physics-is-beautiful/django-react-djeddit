import React from 'react'
// import { FormattedMessage } from 'react-intl'
import { Input, Menu } from 'semantic-ui-react'

import A from './A'
import Img from './Img'
// import NavBar from './NavBar'
// import HeaderLink from './HeaderLink'
import Banner from './banner.jpg'
import messages from './messages'

function Header() {
  return (
    <div>
      <A href="/">
        <Img src={Banner} alt="django-react-djeddit-client - Logo" />
      </A>
      <Menu secondary>
        <Menu.Item
          name="home"
          active={true}
          // active={activeItem === 'home'}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          name="topics"
          // active={activeItem === 'messages'}
          // onClick={this.handleItemClick}
        />
        <Menu.Item
          name="friends"
          // active={activeItem === 'friends'}
          // onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          {/*<Menu.Item>*/}
            {/*<Input icon="search" placeholder="Search..." />*/}
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
      {/*<HeaderLink to="/">*/}
      {/*<FormattedMessage {...messages.home} />*/}
      {/*</HeaderLink>*/}
      {/*<HeaderLink to="/features">*/}
      {/*<FormattedMessage {...messages.features} />*/}
      {/*</HeaderLink>*/}
      {/*</NavBar>*/}
    </div>
  )
}

export default Header
