import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ReactMde from 'react-mde'
import * as Showdown from 'showdown'
import 'react-mde/lib/styles/css/react-mde-all.css'

function ContentEditor(props) {
  const [mdeTab, setMdeTab] = useState('write')
  const [content, setContent] = useState('')

  const handleContentChange = val => {
    // setFormData(prevState => ({ ...prevState, content: val }))
    setContent(val)
    props.onContentChange(val)
  }

  const handleTabChange = tab => {
    setMdeTab(tab)
  }

  const markdownConverter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  })

  return (
    <ReactMde
      onChange={handleContentChange}
      value={content}
      onTabChange={handleTabChange}
      selectedTab={mdeTab}
      generateMarkdownPreview={markdown =>
        Promise.resolve(markdownConverter.makeHtml(markdown))
      }
    />
  )
}

ContentEditor.propTypes = {
  // className: PropTypes.string,
  onContentChange: PropTypes.func.isRequired,
}

export default ContentEditor
