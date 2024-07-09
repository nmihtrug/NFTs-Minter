// src/components/Navbar.jsx
import React from 'react';
import './NavBar.jsx';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBar.jsx";

const Navbar = () => {
  return (
    <>
        <Nav>
            <Bars />

            <NavMenu>
                <NavLink to="/" >
                    About
                </NavLink>
                <NavLink to="/events" activeStyle>
                    Events
                </NavLink>
                <NavLink to="/annual" activeStyle>
                    Annual Report
                </NavLink>
                <NavLink to="/team" activeStyle>
                    Teams
                </NavLink>
                <NavLink to="/blogs" activeStyle>
                    Blogs
                </NavLink>
                <NavLink to="/create-nft" activeStyle>
                    Create NFT
                </NavLink>
                {/* Second Nav */}
                {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/login">
                    Sign In
                </NavBtnLink>
            </NavBtn>
        </Nav>
    </>
);
};

export default Navbar;
