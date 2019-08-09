import React from 'react';

import { Link } from '../atoms/';

import logo from './img/logo.svg';

export function TopNavigation() {
  return (
    <nav className="flex justify-between bb b--white-10 bg-dark-green white">
      <Link noUnderline className="b white flex items-center pa2" to="/">
        <img src={logo} className="dib h2 w2" alt="Logo" />
        Quacker
      </Link>
      <div className="flex-grow flex items-center">
        <Link to="/about" className="f6 dib white dim pa3 mr1 mr2-ns">
          About
        </Link>
        <Link to="/auth/signin" className="f6 dib white dim pa3 mr1 mr2-ns">
          Sign In
        </Link>
        <Link
          to="/auth/signup"
          className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 mr1 mr2-ns br-pill ba b--white-20"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
