/*
 * TopicsPage
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

import TopicListItem from 'components/TopicListItem'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import H2 from 'components/H2'
import { List } from 'semantic-ui-react'
import {
  makeSelectTopicsList,
  // makeSelectLoading,
  // makeSelectError,
} from './selectors'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
import * as loadTopicsActionsCreator from './actions'

import reducer from './reducer'
import saga from './saga'
import history from '../../utils/history'

const key = 'topics'

export function TopicsList({ topicListActions, topicsList }) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  const [topics, setTopics] = useState([])
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [nextHref, setNextHref] = useState(null)

  useEffect(() => {
    // refresh topics from server
    topicListActions.loadTopics()

    return () => {
      // clear topics list while unmount
      topicListActions.topicsListLoaded(false)
    }
  }, [])

  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and waiting for a server response
      setHasMoreItems(Boolean(false))
      topicListActions.loadTopics(nextHref)
    }
  }

  const onTopicClick = (e, slug) => {
    history.push(`/topics/${slug}`)
  }

  useEffect(() => {
    if (topicsList) {
      setTopics([...topics, ...topicsList.results])
      setHasMoreItems(Boolean(topicsList.next))
      setNextHref(topicsList.next)
    }
  }, [topicsList])

  let items = []

  if (topics) {
    items = topics.map(item => (
      <TopicListItem
        onClick={e => {
          onTopicClick(e, item.slug)
        }}
        key={item.slug}
        item={item}
      />
    ))
  }

  return (
    <article>
      <Helmet>
        <title>Topics List</title>
        <meta name="description" content="Djeedit React topics List" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.topicsList} />
          </H2>
        </CenteredSection>
        <Section>
          {/* <List selection celled> */}
          {/* {topicsList && */}
          {/* topicsList.results.map(item => ( */}
          {/* <TopicListItem key={item.slug} item={item} /> */}
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

TopicsList.propTypes = {
  topicListActions: PropTypes.shape({
    loadTopics: PropTypes.func.isRequired,
    topicsListLoaded: PropTypes.func.isRequired,
  }).isRequired,
  topicsList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  topicsList: makeSelectTopicsList(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    topicListActions: bindActionCreators(loadTopicsActionsCreator, dispatch),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(TopicsList)
