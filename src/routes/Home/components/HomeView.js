import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Jumbotron } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default
@withRouter
@connect(
  (state) => ({
    user: state.auth.user,
    valid: state.auth.valid,
  }),
  {
  },
)
class HomeView extends Component {
  componentWillMount() {
    if (this.props.user) {
      this.props.router.replace('/timeline')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.valid && nextProps.user) {
      this.props.router.push('/timeline')
    }
  }

  render() {
    return (
      <Jumbotron>
        <h1>Welcome to PokéShare!</h1>
        <p>This is where you share your exitement from the Pokémon Go world!</p>
        <p>
          <LinkContainer to='/login'>
            <Button bsStyle="primary">Login now</Button>
          </LinkContainer>
        </p>
      </Jumbotron>
    )
  }
}
