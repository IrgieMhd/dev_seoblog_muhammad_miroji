import React, { useState } from 'react';
import { APP_NAME } from '../config';
import Router from 'next/router';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link legacyBehavior href='/'>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            {!isAuth() &&
              <React.Fragment>
                <NavItem>
                  <Link legacyBehavior href='/signin'>
                    <NavLink>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link legacyBehavior href='/signup'>
                    <NavLink>Register</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            }

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace('/signin'))}>
                  Signout
                </NavLink>
              </NavItem>
            )}

          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;

//npm install reactstrap react react-dom
// adding legacyBehaviour for Invalid `<Link>` with `<a>` child