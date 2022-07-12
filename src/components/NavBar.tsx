import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { useState } from "react";

const SubNav = styled.nav`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  font-size: 24px;
  color: ${(props) => props.theme.white.lighter};
  button {
    margin-left: 10px;
    border: 0;
    background: transparent;
    font-size: 24px;
  }
  svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.white.lighter};
  }
  ul {
    display: flex;
    li {
      padding: 0 10px;
    }
  }
`;

const NavBar = () => {
  const [theme, setTheme] = useRecoilState(isDarkAtom);
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => setMenu((prev) => !prev);
  const toggleTheme = () => setTheme((prev) => !prev);
  return (
    <>
      <SubNav>
        <Link to="/">🏠</Link>
        <button onClick={toggleTheme} title="Toggle theme">
          {theme ? "🌞" : "🌚"}
        </button>
      </SubNav>
    </>
  );
};

export default NavBar;
