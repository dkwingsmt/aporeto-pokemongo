import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import firebase from 'firebase'
import { logoutSuccess } from 'store/auth'
import { timelineError } from '../modules'
import PostPanel from './post'

export default
@withRouter
@connect(
  (state) => ({
    user: state.auth.user,
    error: state.timeline.error,
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
    const {user, error} = this.props
    return (
      <div>
        {
          error && <div>{`Error: ${error}`}</div>
        }
        <PostPanel />
        {user ? `Logged in! ${user.uid}` : 'Didnt log in'}
        <Link to='/logout' onClick={(e) => {
          e.preventDefault()
          firebase.auth().signOut()
            .then(() => {
              this.props.logoutSuccess()
              this.props.router.push('/login')
            })
            .catch((e) => this.props.timelineError(e))
        }}>
          Log out
        </Link>
      </div>
    )
  }
}

