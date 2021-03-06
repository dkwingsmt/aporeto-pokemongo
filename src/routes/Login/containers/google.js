import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import { withRouter } from 'react-router'
import provider from 'auth/providers/google'
import { connect } from 'react-redux'
import { loginOAuth2 } from '../modules'
import AlertBar from 'components/AlertBar'
//import { PromiseAction } from 'store/promise-action'

export default 
@withRouter
@connect(
  (state) => ({
    alert: state.login.alert,
  }),
  {
    loginOAuth2,
  },
)
class LoginContainer extends Component {
  onSignIn = () => {
    this.props.loginOAuth2('google', provider)
      .then(() => {
        this.props.router.push('/timeline')
      })
  }

  render() {
    const {alert} = this.props
    return (
      <div>
        <AlertBar {...alert} />
        <GoogleButton onClick={this.onSignIn} />
      </div>
    )
  }
}
