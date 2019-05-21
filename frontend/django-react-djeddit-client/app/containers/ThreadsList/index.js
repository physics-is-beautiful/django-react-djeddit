/*
 * ThreadsPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { bindActionCreators, compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import ThreadListItem from 'components/ThreadListItem'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import H2 from 'components/H2'
import { List } from 'semantic-ui-react'
import {
  makeSelectThreadsList,
  // makeSelectLoading,
  // makeSelectError,
} from './selectors'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
import * as loadThreadsActionsCreator from './actions'

import reducer from './reducer'
import saga from './saga'

const key = 'threadsList'

export function ThreadsList({ threadListActions, match, threadsList }) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const [threads, setThreads] = useState([])
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [nextHref, setNextHref] = useState(null)

  useEffect(() => {
    console.log(match);
    // load threads from server
    threadListActions.loadThreads()

    return () => {
      // clear threads list while unmount
      threadListActions.threadsListLoaded(false)
    }
  }, [])

  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and waiting for a server response
      setHasMoreItems(Boolean(false))
      threadListActions.loadThreads(nextHref)
    }
  }

  useEffect(() => {
    if (threadsList) {
      setThreads([...threads, ...threadsList.results])
      setHasMoreItems(Boolean(threadsList.next))
      setNextHref(threadsList.next)
    }
  }, [threadsList])

  let items = []

  if (threads) {
    items = threads.map(item => <ThreadListItem key={item.slug} item={item} />)
  }

  return (
    <article>
      <Helmet>
        <title>Threads List</title>
        <meta name="description" content="Djeedit React threads List" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.threadsList} />
          </H2>
        </CenteredSection>
        <Section>
          {/* <List selection celled> */}
          {/* {threadsList && */}
          {/* threadsList.results.map(item => ( */}
          {/* <ThreadListItem key={item.slug} item={item} /> */}
          {/* ))} */}
          {/* </List> */}
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={hasMoreItems}
            // loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
          >
            <List selection celled>
              {items}
            </List>
          </InfiniteScroll>
        </Section>
      </div>
    </article>
  )
}

ThreadsList.propTypes = {
  threadListActions: PropTypes.shape({
    loadThreads: PropTypes.func.isRequired,
    threadsListLoaded: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.object,
  threadsList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  threadsList: makeSelectThreadsList(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    threadListActions: bindActionCreators(loadThreadsActionsCreator, dispatch),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(ThreadsList)
