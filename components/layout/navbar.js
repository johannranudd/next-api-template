import React from 'react';
import Link from 'next/link';
import { StyledNav } from '../../styles/navbar.styles/navbar.styles';
// import { useAppContext } from '../../context/context';

const Navbar = () => {
  // const { state } = useAppContext();
  return (
    <StyledNav>
      <section className='section-center'>
        <div>
          <Link href={`/`}>
            <h2 className='logo'>&lt;/&gt;</h2>
          </Link>
        </div>
        <ul className='menu'>
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>
            <Link href={`/people`}>Other</Link>
          </li>
        </ul>
      </section>
    </StyledNav>
  );
};

export default Navbar;
