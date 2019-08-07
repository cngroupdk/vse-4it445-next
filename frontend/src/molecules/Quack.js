import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

export function Quack() {
  return (
    <article className="flex w-100 bb b--black-05 pb2 mt2" href="#0">
      <div className="w2 w3-ns v-mid">
        <a href="#0">
          <img
            src="http://mrmrs.github.io/photos/p/1.jpg"
            className="ba b--black-10 db br2 w2 w3-ns h2 h3-ns"
          />
        </a>
      </div>
      <div className="pl3">
        <div className="pb2">
          <a href="#0" className="black link no-underline underline-hover">
            <span className="f6 f5-ns fw6 lh-title mv0">Young Gatchell</span>{' '}
            <span className="f6 fw4 mt0 mb0 black-60">@yg123</span>
          </a>{' '}
          - May 13
        </div>
        <div className="black">Hello, World!</div>
        <div className="pt2">
          <form className="">
            <button
              className="f6 button-reset bg-white mr2 bn dim pointer pv2 black-60"
              type="submit"
            >
              <FontAwesomeIcon icon={faHeart} /> Like
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
