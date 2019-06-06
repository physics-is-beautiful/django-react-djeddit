import React from 'react'
import PropTypes from 'prop-types'
// import { FaComments } from 'react-icons/fa'
// import { Breadcrumb as SemanticBreadcrumb } from 'semantic-ui-react'
import ReactBreadcrumb from 'react-bootstrap/Breadcrumb'
// import styled from 'styled-components'

function Breadcrumb(props) {
  const sections = props.sections.map(sec => (
    <ReactBreadcrumb.Item onClick={sec.onClick} href={sec.href} key={sec.key}>
      {sec.content}
    </ReactBreadcrumb.Item>
  ))
  return <ReactBreadcrumb icon="right angle">{sections}</ReactBreadcrumb>
}

Breadcrumb.propTypes = {
  sections: PropTypes.array,
}

export default Breadcrumb
