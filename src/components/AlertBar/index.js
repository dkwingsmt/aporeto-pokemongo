import React, { Component, PropTypes } from 'react'
import { Alert } from 'react-bootstrap' 

export default class AlertBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertVisible: false,
    }
  }

  static propsTypes = {
    detail: PropTypes.object,  // Need a `message` prop
    type: PropTypes.string,         // undefined | 'warning' | 'error'
    prefix: PropTypes.string,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.detail !== this.props.detail || nextProps.type !== this.props.type) {
      this.setState({alertVisible: true})
    }
  }

  handleAlertDismiss = () => {
    this.setState({alertVisible: false})
  }

  render() {
    if (this.state.alertVisible && this.props.detail) {
      const {type, detail={}} = this.props
      const bsStyle = type === 'error' ? 'danger'
                    : type === 'warning' ? 'warning'
                    : type === 'success' ? 'success'
                    : 'info'
      const prefix = this.props.prefix || 
                     type === 'error' ? 'Error: '
                   : type === 'warning' ? 'Warning: '
                   : ''
      return (
        <Alert bsStyle={bsStyle} onDismiss={this.handleAlertDismiss} style={{textAlign: 'left'}}>
        { prefix && <strong>{prefix}</strong> }
        { detail.message }
        </Alert>
      )
    } else {
      return <noscript />
    }
  }
}
