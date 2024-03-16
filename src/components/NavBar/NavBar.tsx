import Link from 'next/link';
import './NavBar.css';
import React from 'react';
import LoggedIn from './LoggedIn';

interface NavBarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}


const Navbar: React.FC<NavBarProps> = ({isLoggedIn, isAdmin}) => {
  return (
    <nav>
      <div className='nav-container'>
      <div className='nav-left'>
        <ul>
          <li>
            <Link href="/" className='nav-bar-logo'> <img src={"/site-images/logo.png"} className='nav-bar-logo'/> </Link>
          </li>
          <li className='search-field'>
            <input className='nav-bar-search' type="text" placeholder='Search Manhwa...'/>
          </li>
        </ul>
      </div>
      <div className='nav-bar-right'>
        <ul>
          <li>
            <Link href="/about" className="nav-bar-link"> About </Link>
          </li>
          <li>
            <Link href="/manhwas" className="nav-bar-link"> Manhwas </Link>
          </li>
          {isLoggedIn && isAdmin ? (
            <li>
              <Link href="/admin-panel" className="nav-bar-link"> Admin Panel </Link>
            </li>
            ) : (<></>)
          }
          {isLoggedIn ? (
            <LoggedIn username="wahaha"/>
          ) : (
            <li>
            <Link href="/login" className="nav-bar-link"> Log In </Link>
            </li>
          )
          }
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
