import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { map } from 'lodash'
import { logoutSuccess } from 'store/auth'
import { timelineError } from '../modules'
import PostPanel from './post'
import AlertBar from 'components/AlertBar'
import pokemonsObject from 'static/pokemons.json'
import PostItem from './PostItem'

export default
@withRouter
@connect(
  (state) => ({
    user: state.auth.user,
    alert: state.timeline.alert,
    posts: state.timeline.posts,
  }),
  {
    timelineError,
    logoutSuccess,
  }
)
class TimelineContainer extends Component {
  componentWillMount() {
    this.props.timelineError()
  }

  render() {
    const {alert, posts} = this.props
    return (
      <div>
        <AlertBar {...alert} />
        <PostPanel />
        <div>
        {map(posts, (post, key) =>
          <PostItem {...post} key={key} />
        )}
        </div>
      </div>
    )
  }
}

