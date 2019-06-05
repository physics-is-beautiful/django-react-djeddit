import React from 'react'
import PropTypes from 'prop-types'
// import { FaComments } from 'react-icons/fa'
import { Breadcrumb as SemanticBreadcrumb } from 'semantic-ui-react'
// import styled from 'styled-components'

function Breadcrumb(props) {
  return <SemanticBreadcrumb icon="right angle" sections={props.sections} />
}

Breadcrumb.propTypes = {
  sections: PropTypes.array,
}

export default Breadcrumb
