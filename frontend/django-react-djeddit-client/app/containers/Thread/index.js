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
import { Comment, Segment } from 'semantic-ui-react'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import H2 from 'components/H2'
import CommentItem from 'components/Comment'

import arrayToTree from './arrayToTree'

import {
  makeSelectThread,
  makeSelectPosts,
  makeSelectNewPost,
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
  newPost,
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
      threadActions.postsLoaded(false)
    }
  }, [])

  // load next page comments
  const loadNextPage = () => {
    if (hasMoreItems) {
      // if we call next page setHasMore item false and waiting for a server response
      setHasMoreItems(Boolean(false))
      threadActions.loadPosts(match.params.threadId, nextHref)
    }
  }

  useEffect(() => {
    function mergeUnique(a, b, prop) {
      const reduced = a.filter(
        aItem => !b.find(bItem => aItem[prop] === bItem[prop]),
      )
      return reduced.concat(b)
    }

    if (postsList) {
      // remove existing comments in exist (newPost) with loaded
      setPosts(
        mergeUnique(posts, postsList.results, 'uid'),
        // [...posts, ...postsList.results]
      )
      setHasMoreItems(Boolean(postsList.next))
      setNextHref(postsList.next)
    }
  }, [postsList])

  useEffect(() => {
    // find parent in posts and append
    if (newPost) {
      // find last index with
      const parentIndex = posts.findIndex(x => x.uid === newPost.parent)
      // console.log('parent index' + parentIndex);
      const postsCopy = [...posts]
      postsCopy.splice(parentIndex + 1, 0, newPost)
      setPosts(postsCopy)
    }
  }, [newPost])

  const handleAddSubmit = (parentPost, value) => {
    const post = {
      content: value,
      parent: parentPost.uid,
    }
    threadActions.newPost(post)
  }

  const handleUpdateSubmit = (originalPost, value) => {
    //  update comment
    const post = {
      content: value,
      uid: originalPost.uid,
    }

    threadActions.updatePost(post)
  }

  let comments = []
  let rootComment = null

  // todo move to the postsList posts effect
  if (posts.length > 0) {
    const treePosts = arrayToTree(posts, { id: 'uid', parentId: 'parent' })

    const generateComments = postsList_ => {
      const comments_ = []
      for (let i = 0; i < postsList_.length; i++) {
        // root comments
        if (postsList_[i].children.length > 0) {
          const children = generateComments(postsList_[i].children)
          comments_.push(
            <CommentItem
              key={postsList_[i].data.uid}
              item={postsList_[i].data}
              handleAddSubmit={handleAddSubmit}
              handleUpdateSubmit={handleUpdateSubmit}
            >
              <Comment.Group>{children}</Comment.Group>
            </CommentItem>,
          )
        } else {
          comments_.push(
            <CommentItem
              key={postsList_[i].data.uid}
              item={postsList_[i].data}
              handleAddSubmit={handleAddSubmit}
              handleUpdateSubmit={handleUpdateSubmit}
            />,
          )
        }
      }
      return comments_
    }

    if (treePosts[0].children.length > 0) {
      comments = generateComments(treePosts[0].children)
    }

    rootComment = (
      <Segment.Group>
        <Segment>
          <Comment.Group>
            <CommentItem
              item={treePosts[0].data}
              handleAddSubmit={handleAddSubmit}
              handleUpdateSubmit={handleUpdateSubmit}
            />
          </Comment.Group>
        </Segment>
      </Segment.Group>
    )

    // all pages comments / todo check for performance
    // comments = posts.filter(function(item) {
    //   if (item.level === 0) {
    //     rootComment = (
    //       <Segment.Group>
    //         <Segment>
    //           <Comment.Group>
    //             <CommentItem
    //               item={item}
    //               handleAddSubmit={handleAddSubmit}
    //               handleUpdateSubmit={handleUpdateSubmit}
    //             />
    //           </Comment.Group>
    //         </Segment>
    //       </Segment.Group>
    //     )
    //     return false
    //   }
    //   return true
    // })
    // .map(item => (
    //   <CommentItem
    //     key={item.uid}
    //     item={item}
    //     handleAddSubmit={handleAddSubmit}
    //     handleUpdateSubmit={handleUpdateSubmit}
    //   />
    // ))
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
        {/* root post */}
        {rootComment}
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
              <h4>There are no comments to show</h4>
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
    newPost: PropTypes.func.isRequired,
  }).isRequired,
  topicsActions: PropTypes.shape({
    loadTopic: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.object,
  thread: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  postsList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  topic: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  newPost: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  postsList: makeSelectPosts(),
  topic: makeSelectTopic(),
  thread: makeSelectThread(),
  newPost: makeSelectNewPost(),
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
