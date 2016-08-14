import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import firebase from 'firebase'
import { logoutSuccess } from 'store/auth'
import { timelineError } from '../modules'
import PostPanel from './post'
import AlertBar from 'components/AlertBar'

export default
@withRouter
@connect(
  (state) => ({
    user: state.auth.user,
    alert: state.timeline.alert,
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
        <AlertBar {...this.props.alert} />
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

