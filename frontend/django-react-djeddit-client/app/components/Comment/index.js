// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import { FaComments } from 'react-icons/fa'
// // import { Button, Comment, Form, Grid, Icon, List } from 'semantic-ui-react'
// import { Container } from 'react-bootstrap/Container'
// import { Row } from 'react-bootstrap/Row'
// import { Col } from 'react-bootstrap/Col'
// import { FormattedMessage } from 'react-intl'
// import ContentEditor from 'components/ContentEditor'
//
// import ReactMarkdown from 'react-markdown'
// import MathJax from 'react-mathjax2'
// import RemarkMathPlugin from 'remark-math'
//
// import messages from '../../containers/Thread/messages'
//
// // see frontend/django-react-djeddit-client/app_old_structure/components/post.jsx
//
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
//
// function CommentItem(props) {
//   const [addCommentValue, setAddCommentValue] = useState('')
//   const [editCommentValue, setEditCommentValue] = useState(props.item.content)
//
//   const [replyFormShow, setReplyFormShow] = useState(false)
//   const [editFormShow, setEditFormShow] = useState(false)
//
//   const conf = window.DJEDDIT_CONFIG
//
//   let DISPLAY_USERNAME_FIELD = 'username'
//
//   if (conf) {
//     ;({ DISPLAY_USERNAME_FIELD } = conf)
//   }
//
//   const handleAddCommentValueChange = val => {
//     setAddCommentValue(val)
//   }
//
//   const handleEditCommentValueChange = val => {
//     setEditCommentValue(val)
//   }
//
//   const toggleReplyForm = () => {
//     if (editFormShow) {
//       setEditFormShow(false)
//     }
//     setReplyFormShow(!replyFormShow)
//   }
//
//   const toggleEditForm = () => {
//     if (replyFormShow) {
//       setReplyFormShow(false)
//     }
//     setEditFormShow(!editFormShow)
//   }
//
//   return (
//     <Comment>
//       <Comment.Avatar
//         as="a"
//         src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
//       />
//       <Comment.Content>
//         <Comment.Author>{props.item.created_by[DISPLAY_USERNAME_FIELD]}</Comment.Author>
//         <Comment.Metadata>
//           <div>2 days ago</div>
//           {/* <div> */}
//           {/* <Icon name="star" />5 Faves */}
//           {/* </div> */}
//         </Comment.Metadata>
//         <Comment.Text>
//           {editFormShow ? (
//             <Form
//               onSubmit={() => {
//                 setEditFormShow(false)
//                 props.handleUpdateSubmit(props.item, editCommentValue)
//               }}
//             >
//               <ContentEditor
//                 onContentChange={value => handleEditCommentValueChange(value)}
//                 initialValue={editCommentValue}
//               />
//               <Button type="submit">
//                 <FormattedMessage {...messages.submitButton} />
//               </Button>
//             </Form>
//           ) : (
//             <MarkdownMathRender source={editCommentValue} /> // <ReactMarkdown source={editCommentValue} />
//           )}
//         </Comment.Text>
//         <Comment.Actions>
//           <Comment.Action onClick={toggleReplyForm}>
//             <Icon name="reply" />
//             Reply
//           </Comment.Action>
//           <Comment.Action onClick={toggleEditForm}>
//             <Icon name="edit" />
//             Edit
//           </Comment.Action>
//           <Comment.Action>
//             <Icon name="delete" />
//             Delete
//           </Comment.Action>
//         </Comment.Actions>
//         {replyFormShow && (
//           <Form
//             onSubmit={() => {
//               setReplyFormShow(false)
//               props.handleAddSubmit(props.item, addCommentValue)
//             }}
//           >
//             <ContentEditor
//               onContentChange={value => handleAddCommentValueChange(value)}
//             />
//             <Button type="submit">
//               <FormattedMessage {...messages.submitButton} />
//             </Button>
//           </Form>
//         )}
//       </Comment.Content>
//       {props.children}
//     </Comment>
//   )
// }
//
// CommentItem.propTypes = {
//   item: PropTypes.any,
//   handleAddSubmit: PropTypes.func,
//   handleUpdateSubmit: PropTypes.func,
// }
//
// export default CommentItem
