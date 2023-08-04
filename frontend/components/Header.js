import React, { useState } from 'react';
import { APP_NAME } from '../config';
import NProgress from 'nprogress';
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
import '.././node_modules/nprogress/nprogress.css';
import Search from './blog/Search';


Router.onRouteChangeStart = url => NProgress.start();
Router.onRouteChangeComplete = url => NProgress.done();
Router.onRouteChangeError = url => NProgress.done();

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Navbar color="light" light expand="md">
        <Link legacyBehavior href='/'>
          <NavLink className='font-weight-bold'>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            <React.Fragment>
              <NavItem>
                <Link legacyBehavior href='/blogs'>
                  <NavLink>Blogs</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link legacyBehavior href="/contact">
                  <NavLink>Contact</NavLink>
                </Link>
              </NavItem>
            </React.Fragment>

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


            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link legacyBehavior href="/user">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link legacyBehavior href="/admin">
                  <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={{ cursor: 'pointer' }}
                  onClick={() => signout(() => Router.replace('/signin'))}>
                  Signout
                </NavLink>
              </NavItem>
            )}

            <NavItem>
              <Link legacyBehavior href="/user/crud/blog">
                <NavLink className="btn btn-primary text-light">Write a blog</NavLink>
              </Link>
            </NavItem>

          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </React.Fragment>
  );
};

export default Header;

//npm install reactstrap react react-dom
// adding legacyBehaviour for Invalid `<Link>` with `<a>` child