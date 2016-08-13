import React, { Component } from 'react'
import { withRouter, IndexLink } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import firebase from 'firebase'
//import css from './Header.scss'


export default
@withRouter
@connect(
  (state) => ({
    user: state.auth.user,
  }),
)
class Header extends Component {
  render() {
    const user = this.props.user
    const loggedIn = !!this.props.user
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to={loggedIn ? '/timeline' : '/login'}>PokéShare</IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
          {loggedIn &&
            <LinkContainer to='/timeline'>
              <NavItem>Post</NavItem>
            </LinkContainer>
          }
          </Nav>
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
                    this.props.router.push('/login')
                  })
                  .catch((e) => this.props.timelineError(e))
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
      </Navbar>
    )
  }
}
