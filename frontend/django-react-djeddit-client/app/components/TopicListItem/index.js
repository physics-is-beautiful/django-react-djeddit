import React from 'react'
import PropTypes from 'prop-types'
import { FaComments } from 'react-icons/fa'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'

import styled from 'styled-components'

const CounterText = styled.div`
  font-size: 0.7rem;
`

function TopicListItem(props) {
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
            <CounterText>{props.item.threads_counter}</CounterText>
            <CounterText>Threads</CounterText>
          </Col>
        </Row>
      </Container>
    </ListGroup.Item>
  )
}

TopicListItem.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func,
}

export default TopicListItem
