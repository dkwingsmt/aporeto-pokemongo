import React, { Component } from 'react'
import GoogleLogin from './google'
import FacebookLogin from './facebook'
import { connect } from 'react-redux'
import AlertBar from 'components/AlertBar'

export default
@connect(
  (state) => ({
    alert: state.login.alert,
  })
)
class LoginContainer extends Component {
  render() {
    const {alert} = this.props
    return (
      <div>
        <AlertBar {...alert} />
        <FacebookLogin />
      </div>
    )
  }
}
