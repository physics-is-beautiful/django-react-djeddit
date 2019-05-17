/*
 * TopicsPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { createStructuredSelector } from 'reselect'

import TopicListItem from 'components/TopicListItem'

import { useInjectReducer } from 'utils/injectReducer'
import { useInjectSaga } from 'utils/injectSaga'
import H2 from 'components/H2'
import { List } from 'semantic-ui-react'
import {
  makeSelectTopicsList,
  // makeSelectLoading,
  // makeSelectError,
} from './selectors'

import CenteredSection from './CenteredSection'
import Section from './Section'
import messages from './messages'
import * as loadTopicsActionsCreator from './actions'

import reducer from './reducer'
import saga from './saga'

const key = 'topicsList'

export function TopicsList({ topicListActions, topicsList }) {
  useInjectReducer({ key, reducer })
  useInjectSaga({ key, saga })

  useEffect(() => {
    topicListActions.loadTopics()
  }, [])

  return (
    <article>
      <Helmet>
        <title>Topics List</title>
        <meta name="description" content="Djeedit React topics List" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.topicsList} />
          </H2>
        </CenteredSection>
        <Section>
          <List selection celled>
            {topicsList &&
              topicsList.results.map(item => (
                <TopicListItem key={item.slug} item={item} />
              ))}
          </List>
        </Section>
      </div>
    </article>
  )
}

TopicsList.propTypes = {
  topicListActions: PropTypes.shape({
    loadTopics: PropTypes.func.isRequired,
  }).isRequired,
  topicsList: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
}

const mapStateToProps = createStructuredSelector({
  topicsList: makeSelectTopicsList(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
})

export function mapDispatchToProps(dispatch) {
  return {
    topicListActions: bindActionCreators(loadTopicsActionsCreator, dispatch),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(TopicsList)
