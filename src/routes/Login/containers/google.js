import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import firebase from 'firebase'
import { withRouter } from 'react-router'
import provider from 'auth/providers/google'
import { connect } from 'react-redux'
import { loginError } from '../modules'
//import { PromiseAction } from 'store/promise-action'

export default 
@withRouter
@connect(
  (state) => ({
    error: state.login.error,
  }),
  {
    loginError,
  },
)
class LoginContainer extends Component {
  componentWillMount() {
    this.props.loginError()
  }

  onSignIn = (googleUser) => {
    return firebase.auth().signInWithPopup(provider)
      .then(() => this.props.router.push('/timeline'))
      .catch((err) => this.props.loginError(err))
  }

  render() {
    const {error} = this.props
    return (
      <div>
        {
          error && <div>{`Error: ${error}`}</div>
        }
        <GoogleButton onClick={this.onSignIn} />
      </div>
    )
  }
}
