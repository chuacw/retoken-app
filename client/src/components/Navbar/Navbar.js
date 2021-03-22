import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { AssetContext } from "../../context/AssetContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { Button } from "../../globalStyles";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  NavText,
} from "./Navbar.style";

export default function Navbar(props) {
  const { user, getUser } = useContext(UserContext);
  const { assets, assetDispatch } = useContext(AssetContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  useEffect(() => {

    // Set user state if state is undefined
    const fetchUser = async () => await getUser();
    const getAssets = async () => await assetDispatch({ type: "GET_ASSETS" });

    if (!user) fetchUser();
    if (!assets) getAssets();
    console.log(user ? `navbar ${user.name} ${assets.length}` : `navbar user undefined  ${assets.length}`);
  }, [user]);

  /*
  useEffect(() => {
    console.log (`get into asset ${assets.length}`)
    const getAssets = async () => await assetDispatch({ type: "GET_ASSETS" });
//    if (!assets || assets === 'undefined') {
      console.log (`assets undefined getassets`)
      getAssets();
  //  }
    console.log(`navbar asset ${assets.length}`);
  }, [assets]);
*/
  window.addEventListener("resize", showButton);

  return (
    <>
      <IconContext.Provider
        value={{ color: ({ admin }) => (admin ? "#fafafa" : "#4b4d63") }}
      >
        <Nav admin={props.admin}>
          <NavbarContainer>
            <NavLogo to="/" admin={props.admin} onClick={closeMobileMenu}>
              <NavIcon />
              REToken
            </NavLogo>
            <NavText admin={props.admin}>
              {user && user.name
                ? `Welcome ${user.name}`
                : `You are not registered or login to wallet`}
            </NavText>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to="/" admin={props.admin} onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="/marketplace"
                  admin={props.admin}
                  onClick={closeMobileMenu}
                >
                  Marketplace
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="/addasset"
                  admin={props.admin}
                  onClick={closeMobileMenu}
                >
                  Add Asset
                </NavLinks>
              </NavItem>
              {(user ? user.role === "admin" : false) && (
                <NavItem>
                  <NavLinks
                    to="/admin"
                    admin={props.admin}
                    onClick={closeMobileMenu}
                  >
                    Admin
                  </NavLinks>
                </NavItem>
              )}
              <NavItemBtn>
                {button ? (
                  <NavBtnLink to="/myPortfolio">
                    <Button primary>My Portfolio</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink to="/myportfolio">
                    <Button onClick={closeMobileMenu} fontBig primary>
                      My Portfolio
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}
