import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { map, orderBy } from 'lodash'
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
    const postList = orderBy(map(posts, (post, key) => ({...post, postId: key})), 'time', 'desc')
    return (
      <div>
        <AlertBar {...alert} />
        <PostPanel />
        <div>
        {postList.map((post) =>
          <PostItem {...post} key={post.time} />
        )}
        </div>
      </div>
    )
  }
}

