import React from 'react'
import PropTypes from 'prop-types'
import { FaComments } from 'react-icons/fa'
import { Grid, List } from 'semantic-ui-react'
import styled from 'styled-components'

const CounterText = styled.div`
  font-size: 0.7rem;
`

{/* TODO add Submitted row */}
{/* TODO add Votes row */}
{/* TODO add menu row */}
// see frontend/django-react-djeddit-client/app_old_structure/components/post.jsx

function PostItem(props) {
  return (
    <List.Item>
      <Grid verticalAlign="middle">
        {/*<Grid.Column width={2}>*/}
          {/*<FaComments size={32} />*/}
        {/*</Grid.Column>*/}
        <Grid.Column width={16}>
          {/*<List.Content>*/}
            {/*<h4>{props.item.title}</h4>*/}
          {/*</List.Content>*/}
          <List.Content>{props.item.content}</List.Content>
        </Grid.Column>
        {/*<Grid.Column width={2}>*/}
          {/*<CounterText>123</CounterText>*/}
          {/*<CounterText>Threads</CounterText>*/}
        {/*</Grid.Column>*/}
      </Grid>
    </List.Item>
  )
}

PostItem.propTypes = {
  item: PropTypes.any,
}

export default PostItem
