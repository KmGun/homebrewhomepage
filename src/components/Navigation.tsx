import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <NavItem>
          <StyledNavLink to="/about">회사 소개</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/">Homebrew</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/contact">CONTACT</StyledNavLink>
        </NavItem>
      </NavList>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  gap: 3rem;
`;

const NavItem = styled.li``;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  
  &.active {
    color: #FFD700;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #FFD700;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

export default Navigation; 