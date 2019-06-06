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
import NewThreadPage from 'containers/NewThreadPage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import TopicsList from 'containers/Topics/Loadable'
import ThreadsList from 'containers/Threads/Loadable'
import ThreadPage from 'containers/Thread/Loadable'
import Header from 'containers/Header'
// import Footer from 'components/Footer'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
// import GlobalStyle from '../../global-styles'
import DjedditStyle from '../../djeddit-styles'
import { useInjectSaga } from '../../utils/injectSaga'
import saga from './saga'
// import { makeSelectError, makeSelectLoading, makeSelectRepos } from './selectors'
// import { makeSelectSignedInUser, makeSelectLoading } from './selectors'
// import { makeSelectUsername } from '../HomePage/selectors'
// import { changeUsername } from '../HomePage/actions'
import { loadSignedInUser } from './actions'
import { TOPIC_URL_MASK } from './urls'

const AppWrapper = styled.div`
  // max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 2rem;
  flex-direction: column;
`

const key = 'app'

function App({ loadSignedInUserAction, loading }) {
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
      {/* <Header signedInUser={signedInUser} /> */}
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/features" component={FeaturePage} /> */}
        <Route path="/signup" component={SignUpPage} />
        <Route path="/signin" component={SignInPage} />
        <Route exact path="/topics" component={TopicsList} />
        {/* ThreadsList aka TopicPage */}
        <Route exact path={TOPIC_URL_MASK} component={ThreadsList} />
        <Route
          exact
          path={
            '/:topicSlug([A-Za-z0-9_\\-\\.]+)/:threadId(\\d+)/:threadSlug([A-Za-z0-9_\\-\\.]+)'
          }
          component={ThreadPage}
        />
        <Route path="/new-topic" component={NewTopicPage} />
        <Route
          path="/topics/:topicSlug([A-Za-z0-9_\-\.]+)/new-thread"
          component={NewThreadPage}
        />
        <Route path="" component={NotFoundPage} />
      </Switch>
      {/*<Footer />*/}
      <DjedditStyle />
      {/*<GlobalStyle />*/}
    </AppWrapper>
  )
}

App.propTypes = {
  loading: PropTypes.bool,
  // signedInUser: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  loadSignedInUserAction: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  // signedInUser: makeSelectSignedInUser(),
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
