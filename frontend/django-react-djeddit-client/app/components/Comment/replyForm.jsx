import React from 'react'

import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ReactMde from 'react-mde'
import { renderMathJs } from './utils'
import 'react-mde/lib/styles/css/react-mde-all.css'
import * as Showdown from 'showdown'

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
    const markdownConverter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
    })

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
                      {this.props.currentProfile.display_name}
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
                      {this.props.parentPost.created_by.display_name}
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
                  <button
                    className={`common-button${
                      this.state.content === '' ? ' disabled-button' : ''
                    }`}
                    type="submit"
                    disabled={this.state.content === ''}
                  >
                    Comment
                  </button>
                ) : (
                  <span>
                    <button
                      className="common-button"
                      type="submit"
                      disabled={this.state.content === ''}
                    >
                      Reply
                    </button>
                    &nbsp;
                    <span
                      className="pib-link"
                      type="reset"
                      onClick={this.props.onToggleForm}
                    >
                      Cancel
                    </span>
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
  currentProfile: PropTypes.object.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
  onToggleForm: PropTypes.func,
}
