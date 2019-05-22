/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { memo, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'containers/HomePage/Loadable'
// import FeaturePage from 'containers/FeaturePage/Loadable'
import SignUpPage from 'containers/SignUpPage/Loadable'
import SignInPage from 'containers/SignInPage/Loadable'
import NewTopicPage from 'containers/NewTopicPage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import TopicsList from 'containers/Topics/Loadable'
import ThreadsList from 'containers/Threads/Loadable'
import Header from 'components/Header'
import Footer from 'components/Footer'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import GlobalStyle from '../../global-styles'
import { useInjectSaga } from '../../utils/injectSaga'
import saga from './saga'
// import { makeSelectError, makeSelectLoading, makeSelectRepos } from './selectors'
import { makeSelectSignedInUser, makeSelectLoading } from './selectors'
// import { makeSelectUsername } from '../HomePage/selectors'
// import { changeUsername } from '../HomePage/actions'
import { loadSignedInUser } from './actions'

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`

const key = 'app'

function App({ signedInUser, loadSignedInUserAction, loading }) {
  useInjectSaga({ key, saga })

  useEffect(() => {
    loadSignedInUserAction()
  }, [])

  return (
    <AppWrapper>
      <Helmet
        titleTemplate="%s - React djeddit client"
        defaultTitle="React djeddit client"
      >
        <meta name="description" content="React djeddit client application" />
      </Helmet>
      <Header signedInUser={signedInUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/features" component={FeaturePage} /> */}
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route exact path="/topics" component={TopicsList} />
        <Route
          path="/topics/:topic_slug([A-Za-z0-9_\-\.]+)"
          component={ThreadsList}
        />
        <Route path="/new-topic" component={NewTopicPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer />
      <GlobalStyle />
    </AppWrapper>
  )
}

App.propTypes = {
  loading: PropTypes.bool,
  signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadSignedInUserAction: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  signedInUser: makeSelectSignedInUser(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    loadSignedInUserAction: () => dispatch(loadSignedInUser()),
    // onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    // onSubmitForm: evt => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault()
    //   dispatch(loadRepos())
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
)(App)
