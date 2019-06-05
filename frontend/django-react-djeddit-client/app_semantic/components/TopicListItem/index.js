import React from 'react'
import PropTypes from 'prop-types'
import { FaComments } from 'react-icons/fa'
import { Grid, List } from 'semantic-ui-react'
import styled from 'styled-components'

const CounterText = styled.div`
  font-size: 0.7rem;
`

function TopicListItem(props) {
  return (
    <List.Item onClick={props.onClick}>
      <Grid verticalAlign="middle">
        <Grid.Column width={2}>
          <FaComments size={32} />
        </Grid.Column>
        <Grid.Column width={12}>
          <List.Content>
            <h4>{props.item.title}</h4>
          </List.Content>
          <List.Content>{props.item.description}</List.Content>
        </Grid.Column>
        <Grid.Column width={2}>
          <CounterText>123</CounterText>
          <CounterText>Threads</CounterText>
        </Grid.Column>
      </Grid>
    </List.Item>
  )
}

TopicListItem.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func,
}

export default TopicListItem
