import styled, { createGlobalStyle } from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import homebrewLogo from '../assets/homebrewlogo.png';
import { useState, useEffect } from 'react';
import GlobalStyle from '../styles/GlobalStyle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // PC로 전환될 때 메뉴 닫기
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 10px 이상이면 스크롤된 것으로 간주
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    // 초기 스크롤 상태 확인
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <GlobalStyle />
      <Nav isScrolled={isScrolled} isMenuOpen={isMenuOpen}>
        <LogoContainer>
          <LogoLink to="/">
            <Logo src={homebrewLogo} alt="Homebrew Logo" />
          </LogoLink>
          <LogoText>Homebrew</LogoText>
        </LogoContainer>
        
        {/* 데스크톱 네비게이션 - ul, li 대신 div 사용 */}
        <DesktopNavContainer>
          <StyledNavLink to="/about">회사 소개</StyledNavLink>
          <StyledNavLink to="/">Homebrew</StyledNavLink>
          <StyledNavLink to="/contact">CONTACT</StyledNavLink>
        </DesktopNavContainer>
        
        {/* 모바일 네비게이션 - 배경과 내용 분리 */}
        <MobileNavWrapper className={isMenuOpen ? 'open' : ''}>
          <MobileNavBackground className={isMenuOpen ? 'open' : ''} />
          <MobileNavContent>
            <MobileNavItem onClick={() => handleNavigation('/about')}>
              회사 소개
            </MobileNavItem>
            <MobileNavItem onClick={() => handleNavigation('/')}>
              Homebrew
            </MobileNavItem>
            <MobileNavItem onClick={() => handleNavigation('/contact')}>
              CONTACT
            </MobileNavItem>
          </MobileNavContent>
        </MobileNavWrapper>
        
        <MenuButton onClick={toggleMenu}>
          <MenuIcon isOpen={isMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </MenuIcon>
        </MenuButton>
      </Nav>
    </>
  );
};

// Nav 컴포넌트에 isScrolled와 isMenuOpen props 추가
interface NavProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
}

const Nav = styled.nav<NavProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isScrolled, isMenuOpen }) => 
    isScrolled ? 'rgba(0, 0, 0, 0.6)' : 
    isMenuOpen ? 'transparent' : 'rgba(0, 0, 0, 0)'};
  backdrop-filter: ${({ isScrolled }) => 
    isScrolled ? 'blur(8px)' : 'none'};
  -webkit-backdrop-filter: ${({ isScrolled }) => 
    isScrolled ? 'blur(8px)' : 'none'};
  box-shadow: ${({ isScrolled }) => 
    isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  height: 60px;
  box-sizing: border-box;
  transition: background-color 0.2s ease, backdrop-filter 0.2s ease, box-shadow 0.2s ease;
  margin: 0;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    pointer-events: none; /* 네비게이션 바 자체는 이벤트를 받지 않음 */
    
    /* 메뉴가 열려있을 때만 이벤트 활성화 */
    ${props => props.isMenuOpen && `
      pointer-events: auto;
    `}
  }
`;

const LogoContainer = styled.div`
  position: relative;
  z-index: 1001;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    pointer-events: auto; /* 로고는 항상 클릭 가능하게 */
  }
`;

const LogoLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const LogoText = styled.h1`
  color: #FFD700;
  font-size: 20px;
  font-weight: 1000;
  margin-left: 10px;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

// DesktopNavList를 DesktopNavContainer로 변경하고 ul 대신 div 사용
const DesktopNavContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 3rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  position: relative;
  font-weight: 500;
  margin: 0 1.5rem;
  
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
  
  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 400;
  }
`;

interface MenuIconProps {
  isOpen: boolean;
}

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 768px) {
    display: block;
    pointer-events: auto; /* 메뉴 버튼은 항상 클릭 가능하게 */
  }
`;

const MenuIcon = styled.div<MenuIconProps>`
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: white;
    border-radius: 2px;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      opacity: ${({ isOpen }) => isOpen ? '0' : '1'};
    }
    
    &:nth-child(3) {
      transform: ${({ isOpen }) => isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'rotate(0)'};
    }
  }
`;

// 모바일 네비게이션 래퍼
const MobileNavWrapper = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: auto;
    display: flex;
    flex-direction: column;
    z-index: 990;
    box-sizing: border-box;
    overflow: hidden;
    pointer-events: none;
    
    &.open {
      pointer-events: auto;
    }
  }
`;

// 모바일 네비게이션 배경 - 애니메이션 적용
const MobileNavBackground = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: calc(100% + 60px);
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.2s ease;
    pointer-events: none;
    
    &.open {
      transform: scaleY(1);
    }
  }
`;

// 모바일 네비게이션 내용 - 고정 위치
const MobileNavContent = styled.div`
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    opacity: 0;
    transition: opacity 0.1s ease;
    position: relative;
    z-index: 991;
    margin-top: 60px;
    pointer-events: none;
    
    ${MobileNavWrapper}.open & {
      opacity: 1;
      transition-delay: 0.1s;
      pointer-events: auto;
    }
  }
`;

// 모바일 네비게이션 아이템
const MobileNavItem = styled.div`
  width: 100%;
  background-color: transparent;
  text-align: left;
  box-sizing: border-box;
  padding: 20px 2rem;
  cursor: pointer;
  color: white;
  font-size: 18px;
  font-weight: 400;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default Navigation; 
