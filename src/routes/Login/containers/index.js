import React, { Component } from 'react'
import GoogleLogin from './google'
import FacebookLogin from './facebook'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Modal } from 'react-bootstrap'
import AlertBar from 'components/AlertBar'
import css from './login.scss'

class LoginLoading extends Component {
  render() {
    return (
      <div className={css.staticModal}>
        <Modal.Dialog>

          <Modal.Body>
            <h4>Loading login info...</h4>
            <p>(Please wait shortly)</p>
          </Modal.Body>

        </Modal.Dialog>
      </div>
    )
  }
}

export default
@withRouter
@connect(
  (state) => ({
    valid: state.auth.valid,
    user: state.auth.user,
    alert: state.login.alert,
  })
)
class LoginContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.valid && nextProps.user) {
      this.props.router.push('/timeline')
    }
  }

  render() {
    const {alert, valid} = this.props
    return valid ? (
      <div>
        <AlertBar {...alert} />
        <FacebookLogin />
      </div>
    ) : <LoginLoading />
  }
}
