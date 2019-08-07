import React from 'react';

import logo from './img/logo.svg';

export function TopNavigation() {
  return (
    <nav className="flex justify-between bb b--white-10 bg-dark-green">
      <a
        className="b link white hover-white no-underline flex items-center pa2"
        href="/"
      >
        <img src={logo} className="dib h2 w2" alt="Logo" />
        Quacker
      </a>
      <div className="flex-grow flex items-center">
        <a className="f6 link dib white dim pa3 mr1 mr2-ns" href="#0">
          About
        </a>
        <a className="f6 link dib white dim pa3 mr1 mr2-ns" href="#0">
          Sign In
        </a>
        <a
          className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 mr1 mr2-ns br-pill ba b--white-20"
          href="#0"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}
