import Link from 'next/link';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav>
      <div className='navBarContainer'>
      <div className='navBarLeft'>
        <ul>
          <li>
            <Link href="/"> Home </Link>
          </li>
          <li className='searchField'>
          <input className='navBarSearch' type="text" placeholder='Search Manhwa...'/>
          </li>
        </ul>
      </div>
      <div className='navBarRight'>
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
