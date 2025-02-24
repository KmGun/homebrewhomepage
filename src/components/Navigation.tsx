import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import homebrewLogo from '../assets/homebrewlogo.png';

const Navigation = () => {
  return (
    <Nav>
      <LogoLink to="/">
        <Logo src={homebrewLogo} alt="Homebrew Logo" />
      </LogoLink>
      <CenterNavList>
        <NavItem>
          <StyledNavLink to="/about">회사 소개</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/">Homebrew</StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/contact">CONTACT</StyledNavLink>
        </NavItem>
      </CenterNavList>
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.6);  // 반투명 검은색 배경
  backdrop-filter: blur(8px);  // 블러 효과
  -webkit-backdrop-filter: blur(8px);  // Safari 지원
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  // 미묘한 그림자 효과
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
  font-size: 16px;
  position: relative;
  font-weight: 500;
  
  &.active {
    color: #FFD700;
    font-weight: 600;
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

const LogoLink = styled(NavLink)`
  text-decoration: none;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const CenterNavList = styled(NavList)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export default Navigation; 