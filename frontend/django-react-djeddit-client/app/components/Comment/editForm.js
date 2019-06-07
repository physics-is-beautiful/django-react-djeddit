import React from 'react'

import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'

import Showdown from 'showdown'

export class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: props.parentPost.content,
      mdeTab: 'write',
    }

    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeContent(content) {
    this.setState({ content })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmitPost({
      content: this.state.content,
      uid: this.props.parentPost.uid,
      // parent: this.props.parentPost.uid
    })
    // this.setState({ content: '' })
  }

  // componentWillReceiveProps(nextProps) {
  //   // refresh with reload
  //   this.setState({ content: nextProps.parentPost.content })
  // }

  handleTabChange = tab => {
    this.setState({ mdeTab: tab })
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
              {/* /!* <textarea value={this.state.content} onChange={this.handleChangeContent} /> *!/ */}
              {/* <div id="div_id_edit_content" className="control-group"> */}
              {/* <div className="controls"> */}
              {/* <div className="wmd-wrapper" id="id_edit_content-wmd-wrapper"> */}
              {/* <div className="wmd-panel"> */}
              {/* <div */}
              {/* id={`${ */}
              {/* this.props.parentPost.uid */}
              {/* }id_edit_content_wmd_button_bar`} */}
              {/* /> */}
              {/* <textarea */}
              {/* style={{ height: '10rem' }} */}
              {/* className="pagedownwidget wmd-input" */}
              {/* cols="40" */}
              {/* id={`${this.props.parentPost.uid}id_edit_content`} */}
              {/* name="content" */}
              {/* rows="10" */}
              {/* required */}
              {/* value={this.state.content} */}
              {/* onBlur={this.handleChangeContent} */}
              {/* onChange={this.handleChangeContent} */}
              {/* /> */}
              {/* </div> */}
              {/* <p className="wmd-preview-title"> */}
              {/* <small>Preview:</small> */}
              {/* </p> */}
              {/* <div className="wmd-panel wmd-preview"> */}
              {/* {renderMathJs( */}
              {/* <ReactMarkdown source={this.state.content} />, */}
              {/* )} */}
              {/* </div> */}
              {/* /!* native pagedown editor preview: *!/ */}
              {/* /!* <div id={this.props.parentPost.uid + 'id_edit_content_wmd_preview'} className='wmd-panel wmd-preview' /> *!/ */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
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
                      Edit
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

EditForm.propTypes = {
  parentPost: PropTypes.object.isRequired,
  currentProfile: PropTypes.object.isRequired,
  onSubmitPost: PropTypes.func.isRequired,
  onToggleForm: PropTypes.func,
}
