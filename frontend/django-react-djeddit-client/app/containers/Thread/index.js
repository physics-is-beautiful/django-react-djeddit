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
// import { Comment, Segment } from 'semantic-ui-react'

import { useInjectReducer } from '../../utils/injectReducer'
import { useInjectSaga } from '../../utils/injectSaga'

import Breadcrumb from '../../components/Breadcrumb'
import H2 from '../../components/H2'
// import CommentItem from 'components/Comment'
// import arrayToTree from './arrayToTree'

// import ReactMarkdown from 'react-markdown'
// import MathJax from 'react-mathjax2'
// import RemarkMathPlugin from 'remark-math'
// import SectionSheet from './SectionSheet'

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
import history from '../../utils/history'
import { Post } from '../../components/Comment/post'
import { RootPost } from '../../components/Comment/rootPost'

// import { ReplyForm } from '../../components/Comment/replyForm'

// import history from '../../utils/history'

const threadKey = 'thread'
const topicsKey = 'topics'

// const MarkdownMathRender = props => {
//   const newProps = {
//     ...props,
//     plugins: [RemarkMathPlugin],
//     renderers: {
//       ...props.renderers,
//       math: _props => <MathJax.Node>{_props.value}</MathJax.Node>,
//       inlineMath: _props => <MathJax.Node inline>{_props.value}</MathJax.Node>,
//     },
//   }
//
//   return (
//     <MathJax.Context input="tex">
//       <ReactMarkdown {...newProps} />
//     </MathJax.Context>
//   )
// }

export function ThreadPage({
  threadActions,
  topicsActions,
  match,
  postsList,
  newPost,
  thread,
  topic,
  threadId,
}) {
  useInjectReducer({ key: threadKey, reducer })
  useInjectSaga({ key: threadKey, saga })

  useInjectReducer({ key: topicsKey, reducer: topicsReducer })
  useInjectSaga({ key: topicsKey, saga: topicsSaga })

  const [posts, setPosts] = useState([])
  const [hasMoreItems, setHasMoreItems] = useState(false)
  const [nextHref, setNextHref] = useState(null)

  useEffect(() => {
    if (match) {
      // loaded as SPA
      if (!topic) {
        topicsActions.loadTopic(match.params.topicSlug)
      }
      // load thread from server
      threadActions.loadThread(match.params.threadId)
      // load posts of thread from server
      threadActions.loadPosts(match.params.threadId)
    } else {
      // loaded as Component
      threadActions.loadPosts(threadId)
    }

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

  const handleAddSubmit = args => {
    threadActions.newPost(args)
  }

  const handleUpdateSubmit = args => {
    threadActions.updatePost(args)
  }

  // let comments = []
  let rootComment = null

  if (posts.length > 0) {
    rootComment = (
      <RootPost
        post={posts[0]}
        onSubmitReplay={handleAddSubmit}
        onSubmitEdit={handleUpdateSubmit}
        currentProfile={{ get_absolute_url: 'fsd', display_name: 'name' }}
        changePostVote={() => {}}
        onDelete={() => {}}
        showReplyFormOnly={Boolean(threadId)}
      />
    )
  }

  const renderPost = (post, onSubmitReplay, onSubmitEdit) => {
    const widthRem = `${post.level}rem`

    if (post.level === 0) {
      return null
    }

    return (
      <div key={post.uid} style={{ paddingLeft: widthRem }}>
        <div
          style={{
            width: widthRem,
            display: 'inline-block',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {/* TODO: add threadline if needed */}
        </div>
        <div style={{ position: 'relative' }}>
          <Post
            post={post}
            onSubmitReplay={onSubmitReplay}
            onSubmitEdit={onSubmitEdit}
            currentProfile={{ get_absolute_url: 'fsd', display_name: 'name' }}
            changePostVote={() => {}}
            onDelete={() => {}}
          />
        </div>
      </div>
    )
  }

  // all pages comments / todo check for performance
  const comments = posts
    .filter(function(item) {
      if (item.level === 0) {
        return false
      }
      return true
    })
    .map(item => renderPost(item, handleAddSubmit, handleUpdateSubmit))

  const [breadcrumbSections, setBreadcrumbSections] = useState([])

  useEffect(() => {
    if (topic) {
      // TODO generate this
      setBreadcrumbSections([
        {
          key: 'Topics',
          content: 'Topics',
          href: '/topics',
          // link: true,
          onClick: evt => {
            evt.preventDefault()
            history.push('/topics')
          },
        },
        {
          key: topic.slug,
          content: topic.title,
          href: `/topics/${topic.slug}`,
          // link: true,
          onClick: evt => {
            evt.preventDefault()
            history.push(`/topics/${topic.slug}`)
          },
        },
      ])
    }
  }, [topic])

  return (
    <article>
      {!threadId && (
        <React.Fragment>
          <Helmet>
            {/* TODO add titles */}
            <title>Thread</title>
            <meta name="description" content="Djeedit React thread" />
          </Helmet>
          <Breadcrumb sections={breadcrumbSections} />
        </React.Fragment>
      )}
      <div>
        <CenteredSection>
          <H2>
            {thread && thread.title}
            {/* <FormattedMessage {...messages.postsList} /> */}
          </H2>
        </CenteredSection>
        {/* root post */}
        {rootComment}
        {/* <div> */}
        {/* <div> */}
        {/* {posts && posts.length > 0 ? ( */}
        {/* <ReplyForm */}
        {/* parentPost={posts[0]} */}
        {/* currentProfile={{ */}
        {/* get_absolute_url: 'fsd', */}
        {/* display_name: 'name', */}
        {/* }} */}
        {/* onSubmitPost={handleAddSubmit} */}
        {/* /> */}
        {/* ) : null} */}
        {/* </div> */}
        {/* </div> */}
        <Section>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPage}
            hasMore={hasMoreItems}
            // loader={<div key={this.state.nextHref} style={{clear: 'both'}} />} // fix https://github.com/CassetteRocks/react-infinite-scroller/issues/14#issuecomment-225835845
          >
            {/* <Comment.Group threaded>{comments}</Comment.Group> */}
            {comments}
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
  threadId: PropTypes.number,
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
