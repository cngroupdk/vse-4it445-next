import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

import { AvatarPhoto, Link, NavLink, Button } from '../atoms/';
import { useAuth } from '../utils/auth';

export function TopNavigation() {
  const { user, signout } = useAuth();
  const history = useHistory();

  return (
    <nav className="flex justify-between bb b--white-10 bg-dark-green white">
      <Link to="/" noUnderline className="b white flex items-center pv2 ph3">
        <FontAwesomeIcon icon={faFeatherAlt} className="mr2 f4" />
        Quacker
      </Link>
      <div className="flex-grow flex items-center">
        <NavLink exact to="/" className="pa3">
          Home
        </NavLink>
        <NavLink to="/about" className="pa3">
          About
        </NavLink>
        {user ? (
          <>
            <NavLink
              to={`/${user.screenName}`}
              noUnderline
              className="ph3 pv1 h-100 flex items-center"
            >
              <AvatarPhoto
                className="v-mid dib mr2"
                src={user.profileImageUrl}
                alt={user.screenName}
                size={2}
              />{' '}
              {user.name}
            </NavLink>
            <Button
              color="navbar"
              border
              narrow
              onClick={() => {
                signout();
                history.push('/');
                window.location.reload();
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/auth/signin" className="pa3">
              Sign In
            </NavLink>
            <Button
              to="/auth/signup"
              as={Link}
              color="navbar"
              narrow
              border
              noUnderline
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
