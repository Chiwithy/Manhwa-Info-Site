import Link from 'next/link';
import './NavBar.css';

const Navbar = () => {
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
            <Link href="/about"> About </Link>
          </li>
          <li>
            <Link href="/manhwas"> Manhwas </Link>
          </li>
          <li>
            <Link href="/login"> Login </Link>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
