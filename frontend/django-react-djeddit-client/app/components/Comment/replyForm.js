import React from 'react'

import PropTypes from 'prop-types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'

import markdownConverter from './markdownConverter'

const conf = window.DJEDDIT_CONFIG

let DISPLAY_USERNAME_FIELD = 'username'

if (conf) {
  ;({ DISPLAY_USERNAME_FIELD } = conf)
}

export class ReplyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      mdeTab: 'write',
    }

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeContent(content) {
    this.setState({ content })
  }

  handleTabChange = tab => {
    this.setState({ mdeTab: tab })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmitPost({
      content: this.state.content,
      parent: this.props.parentPost.uid,
    })
    this.setState({ content: '' })
  }

  render() {
    return (
      <Row>
        <Col md={11}>
          <div className="post-container bs-callout">
            {this.props.parentPost.level === 0 ? (
              <div className="">
                <h6 style={{ display: 'inline' }} className="">
                  Comment as{' '}
                </h6>
                {this.props.currentProfile ? (
                  <h4 className="" style={{ display: 'inline' }}>
                    <a
                      href={this.props.currentProfile.get_absolute_url}
                      target="blank"
                    >
                      {this.props.currentProfile[DISPLAY_USERNAME_FIELD]}
                    </a>
                  </h4>
                ) : null}
              </div>
            ) : (
              <div className="">
                <h6 style={{ display: 'inline' }} className="">
                  Reply to{' '}
                </h6>
                <h4 className="" style={{ display: 'inline' }}>
                  {this.props.parentPost.created_by ? (
                    <a
                      href={this.props.parentPost.created_by.get_absolute_url}
                      target="blank"
                    >
                      {this.props.parentPost.created_by[DISPLAY_USERNAME_FIELD]}
                    </a>
                  ) : (
                    'Guest'
                  )}
                </h4>
              </div>
            )}
            <ReactMde
              onChange={this.handleChangeContent}
              value={this.state.content}
              selectedTab={this.state.mdeTab}
              onTabChange={this.handleTabChange}
              generateMarkdownPreview={markdown =>
                Promise.resolve(markdownConverter.makeHtml(markdown))
              }
            />
            <br />
            <form
              method="post"
              acceptCharset="utf-8"
              onSubmit={this.handleSubmit}
            >
              <div className="btn-group btn-group-xs" role="group">
                {this.props.parentPost.level === 0 ? (
                  <Button disabled={this.state.content === ''} type="submit">
                    Comment
                    {/* <button */}
                    {/* className={`common-button${ */}
                    {/* this.state.content === '' ? ' disabled-button' : '' */}
                    {/* }`} */}
                    {/* type="submit" */}
                    {/* disabled={this.state.content === ''} */}
                    {/* > */}
                    {/* Comment */}
                    {/* </button> */}
                  </Button>
                ) : (
                  <span>
                    <Button type="submit" disabled={this.state.content === ''}>
                      Reply
                    </Button>
                    &nbsp;
                    <Button type="reset" onClick={this.props.onToggleForm}>
                      Cancel
                    </Button>
                  </span>
                )}
              </div>
            </form>
          </div>
        </Col>
      </Row>
    )
  }
}

ReplyForm.propTypes = {
  parentPost: PropTypes.object.isRequired,
  currentProfile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitPost: PropTypes.func.isRequired,
  onToggleForm: PropTypes.func,
}
