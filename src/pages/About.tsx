import styled from 'styled-components';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import section2Image from '../assets/About/sec2.jpeg';
import section1Image from '../assets/About/sec1.png';
import backgroundImage2 from '../assets/About/backgroundimage.jpeg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import Footer from '../components/Footer';
import { createGlobalStyle } from 'styled-components';
import { ReactComponent as DownIcon } from '../assets/Main/MainDownIcon.svg';

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #1a1a1a;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
`;

const About = () => {
  const navigate = useNavigate();
  
  const scrollToSection2 = () => {
    document.getElementById('section2')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const [activeEnergy, setActiveEnergy] = useState<number>(0);
  
  const handleEnergyClick = (index: number) => {
    setActiveEnergy(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };
  
  const nextSlide = useCallback(() => {
    setActiveEnergy((prev) => (prev + 1) % 2);
  }, []);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide]);
  
  return (
    <>
      <GlobalStyle />
      <MainWrapper>
        <FullPageContainer>
          <HomeContainer>
            <Section>
              <ContentWrapper>
                <MainText>
                  <TextLine>모두를 위한 음악.</TextLine>
                </MainText>
                <SubText>
                  창작자가 좋은 음악을 만들기 어려운 환경,<br/>
                  대중들이 음악을 더 균형있게 즐길수 없는 환경을 해결하기 위해 일합니다.
                </SubText>
                <ButtonGroup>
                  <StoreButton onClick={scrollToSection2}>
                    자세히 보기
                  </StoreButton>
                </ButtonGroup>
              </ContentWrapper>
              <FloatingDownIcon onClick={scrollToSection2} />
            </Section>
          </HomeContainer>
          
          <Section2Container id="section2" backgroundPosition="center center">
            <Section2Content>
              <Section2Title>창작자를 위한 플랫폼</Section2Title>
              <Section2Text>
                음악 시장의 중심은 소비자가 아닙니다.<br/>
                창작자를 중심으로, 공정한 수익분배가 이루어지도록 합니다.
              </Section2Text>
            </Section2Content>
          </Section2Container>
          
          <Section3Container>
            <Section3TitleContainer>
              <Section3Title>균형잡힌 음악시장</Section3Title>
              <Section3Subtitle>소수 자본가들이 독점 하지 않는, <br/>좋은 음악이 최종 승리하는 음악시장을 추구합니다.</Section3Subtitle>
            </Section3TitleContainer>
            <Section3Content>
              <EnergyImageContainer>
                <EnergyImage src={activeEnergy === 0 ? section1Image : section2Image} 
                            alt="에너지 솔루션" />
              </EnergyImageContainer>
              <EnergyOptionsContainer>
                <EnergyOption 
                  onClick={() => handleEnergyClick(0)}
                  className={activeEnergy === 0 ? 'active' : ''}
                >
                  <EnergyTitle>기형적인 마케팅 구조 개선</EnergyTitle>
                  <EnergyDescription>차트인을 위한 필수조건이 오직 좋은 음악을 만드는것이여야 합니다.</EnergyDescription>
                </EnergyOption>
                <EnergyOption 
                  onClick={() => handleEnergyClick(1)}
                  className={activeEnergy === 1 ? 'active' : ''}
                >
                  <EnergyTitle>음악 장르 다양성 문제 해결</EnergyTitle>
                  <EnergyDescription>생산자가 대형 기획사에 편중되어 있는 문제를 해결합니다.</EnergyDescription>
                </EnergyOption>
              </EnergyOptionsContainer>
            </Section3Content>
          </Section3Container>
        </FullPageContainer>
        <Footer />
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100vw;
  position: absolute;
  left: 0;
  right: 0;
`;

const FullPageContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  position: relative;
  
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
      display: none; // 모바일에서 어두운 오버레이 제거
    }
  }
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  color: white;
  margin-top: 0;
  width: 100%;
  max-width: 800px;
  text-align: left;
  padding: 0 20px;
  margin-left: 10%;
  margin-right: auto;
  
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 0 15px;
  }
`;

const MainText = styled.div`
  margin-bottom: 30px;
  text-align: left;
`;

const TextLine = styled.h2`
  font-size: 60px;
  font-weight: bold;
  margin: 8px 0;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const SubText = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  line-height: 1.5;
  text-align: left;
  
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 30px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 12px;
  
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const StoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 30px;
  background-color: #FFD700;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  color: black;
  min-width: 150px;
  height: 50px;

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px 20px;
    min-width: 130px;
    height: 45px;
  }
`;

const Section2Container = styled.div<{ backgroundPosition: string }>`
  width: 100%;
  height: 100vh;
  background: url(${backgroundImage2}) no-repeat;
  background-size: cover;
  background-position: ${props => props.backgroundPosition};
  position: relative;
  
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
      display: none; // 모바일에서 어두운 오버레이 제거
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #000000);
  }
`;

const Section2Content = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
  width: 100%;
  max-width: 800px;
`;

const Section2Title = styled.h2`
  font-size: 36px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #FFD700;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Section2Text = styled.p`
  font-size: 20px;
  line-height: 1.6;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0 15px;
  }
`;

const Section3Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  padding: 80px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top, #000000, transparent);
    z-index: 1;
  }
`;

const Section3TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    margin-bottom: 40px;
  }
`;

const Section3Title = styled.h2`
  font-size: 36px;
  font-weight: 400;
  color: #FFD700;
  margin: 0;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    font-size: 28px;
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const Section3Subtitle = styled.p`
  font-size: 18px;
  color: #AAAAAA;
  margin: 0;
  padding-left: 20px;
  border-left: 1px solid #333;
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding-left: 0;
    border-left: none;
    text-align: center;
  }
`;

const Section3Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const EnergyImageContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  height: 500px;
  overflow: hidden;
  position: relative;
  margin: 0 auto 40px auto;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    height: 300px;
    margin-bottom: 30px;
  }
`;

const EnergyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
  &[src*="sec1.png"] {
    width: 300px;
    height: auto;
    object-fit: contain;
    max-height: 70%;
    background-color: transparent;
  }
`;

const EnergyOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const EnergyTitle = styled.h3`
  font-size: 20px;
  color: #888888;
  margin-bottom: 10px;
  font-weight: 400;
  transition: color 0.3s ease;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const EnergyDescription = styled.p`
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  transition: color 0.3s ease;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

const EnergyOption = styled.div`
  width: 45%;
  text-align: center;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 1px;
    background-color: #333;
    transition: background-color 0.3s ease;
  }
  
  &.active:before {
    background-color: #FFFFFF;
  }
  
  &.active ${EnergyTitle} {
    color: #FFFFFF;
  }
  
  &.active ${EnergyDescription} {
    color: #AAAAAA;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FloatingDownIcon = styled(DownIcon)`
  position: absolute;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: auto;
  color: white;
  animation: float 2s ease-in-out infinite;
  cursor: pointer;

  @media (max-width: 768px) {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    z-index: 10;
  }

  @keyframes float {
    0% {
      transform: translateX(-50%) translateY(0px);
    }
    50% {
      transform: translateX(-50%) translateY(-20px);
    }
    100% {
      transform: translateX(-50%) translateY(0px);
    }
  }
`;

export default About;