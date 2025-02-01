/*
  This component controlls the navigation menu.

  Inspired from this example:
  https://codesandbox.io/s/react-bootstrap-hamburger-menu-example-rnud4?from-embed
*/

// Global npm libraries
import React, { useState } from 'react'
import { Nav, Navbar, Image } from 'react-bootstrap' // Used for Navbar Style and Layouts .
import { NavLink } from 'react-router-dom' // Used to navigate between routes

// Assets
import Logo from './psf-logo.png'

function NavMenu (props) {
  // Get the current path
  const { currentPath } = props.appData

  // Navbar state
  const [expanded, setExpanded] = useState(false)

  // Handle click event
  const handleClickEvent = () => {
    // Collapse the navbar
    setExpanded(false)
  }

  return (
    <>
      <Navbar expanded={expanded} onToggle={setExpanded} expand='xxxl' bg='dark' variant='dark' style={{ paddingRight: '20px' }}>
        <Navbar.Brand href='#home' style={{ paddingLeft: '20px' }}>
          <Image src={Logo} thumbnail width='50' />{' '}
          PSF Web3 Demo
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <NavLink
              className={(currentPath === '/balance' || currentPath === '/') ? 'nav-link-active' : 'nav-link-inactive'}
              to='/balance'
              onClick={handleClickEvent}
            >
              Check Balance
            </NavLink>
            <NavLink
              className={currentPath === '/placeholder2' ? 'nav-link-active' : 'nav-link-inactive'}
              to='/placeholder2'
              onClick={handleClickEvent}

            >
              Placeholder2
            </NavLink>
            <NavLink
              className={currentPath === '/placeholder3' ? 'nav-link-active' : 'nav-link-inactive'}
              to='/placeholder3'
              onClick={handleClickEvent}
            >
              Placeholder 3
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavMenu
