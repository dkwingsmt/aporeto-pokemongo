import React, { Component } from 'react'
import { withRouter, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Button, Modal, Navbar, Nav, NavItem } from 'react-bootstrap'
import firebase from 'firebase'
import { logoutSuccess } from 'store/auth'
//import css from './Header.scss'


export default
@withRouter
@connect(
  (state) => ({
    user: state.auth.user,
  }),
  {
    logoutSuccess,
  }
)
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      modalError: '',
    }
  }

  close = () => {
    this.setState({showModal: false})
  }

  open = () => {
    this.setState({showModal: true})
  }

  render() {
    const user = this.props.user
    const loggedIn = !!this.props.user
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to={loggedIn ? '/timeline' : '/'}>PokéShare</IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          {loggedIn && [
            <NavItem key='name'>{user.displayName}</NavItem>,
            <LinkContainer key='logout'
              to='/logout'
              onClick={(e) => {
                e.preventDefault()
                firebase.auth().signOut()
                  .then(() => {
                    this.props.logoutSuccess()
                  })
                  .catch((e) => {
                    this.setState({
                      showModal: true,
                      modalError: e.stack,
                    })
                  })
              }}
            >
              <NavItem>Log out</NavItem>
            </LinkContainer>,
          ]}
          {!loggedIn &&
            <LinkContainer to='/login'>
              <NavItem>Log In</NavItem>
            </LinkContainer>
          }
          </Nav>
        </Navbar.Collapse>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{this.state.modalError}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
    )
  }
}
