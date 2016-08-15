import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import AlertBar from 'components/AlertBar'
import FontAwesome from 'react-fontawesome'
import { loginOAuth2 } from '../modules'
//import { PromiseAction } from 'store/promise-action'
import css from './login.scss'

import provider from 'auth/providers/facebook'

export default 
@withRouter
@connect(
  (state) => ({
    error: state.login.error,
  }),
  {
    loginOAuth2,
  },
)
class LoginContainer extends Component {
  onSignIn = () => {
    this.props.loginOAuth2('facebook', provider)
      .then(() => {
        this.props.router.push('/timeline')
      })
  }

  render() {
    const {alert} = this.props
    return (
      <div>
        <AlertBar {...alert} />
        <Button className={css.facebookLogin} onClick={this.onSignIn} >
          <FontAwesome name='facebook-official' inverse className={css.facebookIcon} />
          Facebook
        </Button>
      </div>
    )
  }
}
