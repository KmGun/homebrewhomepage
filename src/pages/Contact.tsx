import styled, { createGlobalStyle } from 'styled-components';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import enterIcon from '../assets/Contact/enterIcon.svg';
import artistIcon from '../assets/Contact/artistIcon.svg';
import hireIcon from '../assets/Contact/hireIcon.svg';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useLayoutEffect, useRef } from 'react';

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #1a1a1a;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const Contact = () => {
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      isInitialMount.current = false;
    }
  }, []);

  const handleCardClick = (type: string) => {
    navigate(`/contact/${type}`);
  };

  return (
    <>
      <GlobalStyle />
      <ContactContainer>
        <Section>
          <ContentWrapper>
            <Title>어디서 연락 주셨나요?</Title>
            <CardContainer>
              <ContactCard onClick={() => handleCardClick('entertainment')}>
                <IconWrapper>
                  <img src={enterIcon} alt="연예기획사 아이콘" />
                </IconWrapper>
                <CardTitle>연예 기획사</CardTitle>
              </ContactCard>
              <ContactCard onClick={() => handleCardClick('artist')}>
                <IconWrapper>
                  <img src={artistIcon} alt="아티스트 아이콘" />
                </IconWrapper>
                <CardTitle>아티스트</CardTitle>
              </ContactCard>
              <ContactCard onClick={() => handleCardClick('hire')}>
                <IconWrapper>
                  <img src={hireIcon} alt="채용 아이콘" />
                </IconWrapper>
                <CardTitle>채용</CardTitle>
              </ContactCard>
            </CardContainer>
          </ContentWrapper>
        </Section>
        <Footer />
      </ContactContainer>
    </>
  );
};

const ContactContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  @media (max-width: 768px) {
    &::before {
      display: none;
    }
  }
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  color: white;
  text-align: center;
  width: 100%;
  padding: 0 10%;
  margin-top: -80px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 5rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto auto;
    gap: 1.2rem;
    justify-items: center;
    margin-top: 70px;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const ContactCard = styled.div`
  width: 280px;
  height: 280px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    width: 160px;
    height: 150px;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    width: 140px;
    height: 130px;
    border-radius: 12px;
  }
  
  &:nth-child(3) {
    @media (max-width: 768px) {
      grid-column: span 2;
      margin-top: 0.5rem;
    }
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    margin-bottom: 0.6rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default Contact;
