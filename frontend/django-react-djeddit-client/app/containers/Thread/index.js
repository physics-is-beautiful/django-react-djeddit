/*
 * ThreadPage
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
import ReactMarkdown from 'react-markdown'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import H2 from 'components/H2'
import { Comment, Icon } from 'semantic-ui-react'
import {
  makeSelectThread,
  makeSelectPosts,
  // makeSelectLoading,
  // makeSelectError,
} from './selectors'

import {
  makeSelectTopic,
  // makeSelectLoading,
  // makeSelectError,
} from '../Topics/selectors'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
import * as threadActionsCreator from './actions'
import * as topicsActionsCreator from '../Topics/actions'

import reducer from './reducer'
import saga from './saga'

import topicsReducer from '../Topics/reducer'
import topicsSaga from '../Topics/saga'

// import history from '../../utils/history'

const threadKey = 'thread'
const topicsKey = 'topics'

export function ThreadPage({
  threadActions,
  topicsActions,
  match,
  postsList,
  thread,
  topic,
}) {
  useInjectReducer({ key: threadKey, reducer })
  useInjectSaga({ key: threadKey, saga })

  useInjectReducer({ key: topicsKey, reducer: topicsReducer })
  useInjectSaga({ key: topicsKey, saga: topicsSaga })

  const [posts, setPosts] = useState([])
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [nextHref, setNextHref] = useState(null)

  useEffect(() => {
    if (!topic) {
      // todo do we need topic?
      topicsActions.loadTopic(match.params.topicSlug)
    }
    // load thread from server
    threadActions.loadThread(match.params.threadId)
    // load posts of thread from server
    threadActions.loadPosts(match.params.threadId)

    // reset on unmount
    return () => {
      // clear topics list while unmount
      threadActions.loadPosts(false)
    }
  }, [])

  // TODO load next page comments
  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and waiting for a server response
      setHasMoreItems(Boolean(false))
      threadActions.loadThread(nextHref)
    }
  }

  useEffect(() => {
    if (postsList) {
      setPosts([...posts, ...postsList.results])
      setHasMoreItems(Boolean(postsList.next))
      setNextHref(postsList.next)
    }
  }, [postsList])

  let comments = []

  if (posts) {
    comments = posts.map(item => (
      <Comment key={item.uid}>
        <Comment.Avatar
          as="a"
          src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
        />
        <Comment.Content>
          <Comment.Author>{item.created_by.username}</Comment.Author>
          <Comment.Metadata>
            <div>2 days ago</div>
            {/*<div>*/}
              {/*<Icon name="star" />5 Faves*/}
            {/*</div>*/}
          </Comment.Metadata>
          <Comment.Text>
            <ReactMarkdown source={item.content} />
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>
              <Icon name="reply" />
              Reply
            </Comment.Action>
            <Comment.Action>
              <Icon name="edit" />
              Edit
            </Comment.Action>
            <Comment.Action>
              <Icon name="delete" />
              Delete
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    ))
  }

  return (
    <article>
      <Helmet>
        {/* TODO add titles */}
        <title>Thread</title>
        <meta name="description" content="Djeedit React thread" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            {thread && thread.title}
            {/* <FormattedMessage {...messages.postsList} /> */}
          </H2>
        </CenteredSection>
        {/* TODO embed first post from posts */}
        <Section>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={hasMoreItems}
            // loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
          >
            <Comment.Group threaded>{comments}</Comment.Group>
            {/* <List selection celled> */}
            {/* {comments} */}
            {/* </List> */}
            {postsList && postsList.count === 0 && (
              <h4>There are no thread to show</h4>
            )}
          </InfiniteScroll>
        </Section>
      </div>
    </article>
  )
}

ThreadPage.propTypes = {
  threadActions: PropTypes.shape({
    loadThread: PropTypes.func.isRequired,
    loadPosts: PropTypes.func.isRequired,
    postsLoaded: PropTypes.func.isRequired,
  }).isRequired,
  topicsActions: PropTypes.shape({
    loadTopic: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.object,
  thread: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  postsList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  topic: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  postsList: makeSelectPosts(),
  topic: makeSelectTopic(),
  thread: makeSelectThread(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    threadActions: bindActionCreators(threadActionsCreator, dispatch),
    topicsActions: bindActionCreators(topicsActionsCreator, dispatch),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(ThreadPage)
