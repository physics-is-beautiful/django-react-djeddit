import React from 'react'
import PropTypes from 'prop-types'
import { FaComments } from 'react-icons/fa'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styled from 'styled-components'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'

const CounterText = styled.div`
  font-size: 0.7rem;
`

function ThreadListItem(props) {
  return (
    <ListGroup.Item action onClick={props.onClick}>
      <Container>
        <Row>
          <Col md={1}>
            <FaComments size={32} />
          </Col>
          <Col md={10}>
            <h4>{props.item.title}</h4>
            {props.item.description}
          </Col>
          <Col md={1}>
            <CounterText>{props.item.posts_counter}</CounterText>
            <CounterText>Comments</CounterText>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  )
}

ThreadListItem.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func,
}

export default ThreadListItem
