import styled from 'styled-components';
import logoImage from '../assets/homebrewlogo.png';
import appPreviewImage from '../assets/Main/MainappPreviewImage.png';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import leftImage from '../assets/Main/Main2LeftImage.png';
import centerImage from '../assets/Main/Main2MiddleImage.png';
import rightImage from '../assets/Main/Main2RightImage.png';
import { ReactComponent as WebIcon } from '../assets/Main/webIcon.svg';
import { ReactComponent as MobileIcon } from '../assets/Main/mobileIcon.svg';
import { useEffect } from 'react';
import thirdFirstImage from '../assets/Main/Main3FirstImage.png';
import thirdSecondImage from '../assets/Main/Main3SecondImage.png';
import Footer from '../components/Footer';

const FullPageContainer = styled.div`
  height: auto;
  min-height: 100vh;
  overflow-y: visible;
  
  & > div {
    height: 100vh;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Main = () => {
  useEffect(() => {
    let isScrolling: NodeJS.Timeout;
    let lastScrollTop = 0;
    let isAnimating = false;
    
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      const currentScrollTop = container.scrollTop;
      
      if (isAnimating) return;  // 애니메이션 중이면 추가 스크롤 무시
      
      window.clearTimeout(isScrolling);
      
      isScrolling = setTimeout(() => {
        const sectionHeight = window.innerHeight;
        const targetSection = Math.round(currentScrollTop / sectionHeight) * sectionHeight;
        
        isAnimating = true;  // 애니메이션 시작
        
        container.scrollTo({
          top: targetSection,
          behavior: 'smooth'
        });
        
        // 애니메이션 완료 후 플래그 해제
        setTimeout(() => {
          isAnimating = false;
        }, 1000);  // 스크롤 애니메이션 시간보다 약간 길게 설정
      }, 100);  // 50ms에서 100ms로 증가
      
      lastScrollTop = currentScrollTop;
    };

    const container = document.querySelector('.fullpage-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // 휠 이벤트에 대한 추가 제어
      container.addEventListener('wheel', (e) => {
        if (isAnimating) {
          e.preventDefault();
        }
      }, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', () => {});
      }
    };
  }, []);

  return (
    <>
      <div style={{ overflow: 'hidden' }}>
        <FullPageContainer className="fullpage-container">
          <div>
            <HomeContainer>
              <Section>
                <ContentWrapper>
                  <LogoArea>
                    <Logo src={logoImage} alt="Homebrew logo" />
                    <Title>Homebrew</Title>
                  </LogoArea>
                  <MainText>
                    <TextLine>원하는 노래를</TextLine>
                    <TextLine>원하는 목소리로.</TextLine>
                  </MainText>
                  <SubText>AI 커버 스트리밍 서비스</SubText>
                  <ButtonGroup>
                    <StoreButton>
                      <ButtonIcon><MobileIcon /></ButtonIcon>
                      앱으로 듣기
                    </StoreButton>
                    <StoreButton>
                      <ButtonIcon><WebIcon /></ButtonIcon>
                      웹으로 듣기
                    </StoreButton>
                  </ButtonGroup>
                </ContentWrapper>
                <AppPreview src={appPreviewImage} alt="App preview" />
              </Section>
            </HomeContainer>
          </div>
          <div>
            <SecondSection>
              <ContentArea>
                <SectionTitle>상상도 못한</SectionTitle>
                <SubTitle>무제한의 컨텐츠.</SubTitle>
                <Description>
                  가수당 평균 10곡,<br />
                  유저들이 직접 제작한<br />
                  새로운 커버곡이 매일 업데이트 됩니다.
                </Description>
              </ContentArea>
              <ImageGroup>
                <LeftImage src={leftImage} alt="Left screenshot" />
                <CenterImage src={centerImage} alt="Center screenshot" />
                <RightImage src={rightImage} alt="Right screenshot" />
              </ImageGroup>
            </SecondSection>
          </div>
          <div>
            <ThirdSection>
              <ThirdContentArea>
                <ThirdSectionTitle>원하는 조합이<br/>없다구요?</ThirdSectionTitle>
              </ThirdContentArea>
              <ThirdImageGroup>
                <LeftContent>
                  <DescriptionContainer>
                    <DescriptionTitle>걱정마세요,<br/>원하는 가수와 곡을 선택하면</DescriptionTitle>
                    <Description>
                      앱 내 신청곡 기능에서<br/>
                      손쉽게 신청 하실수 있습니다!
                    </Description>
                  </DescriptionContainer>
                  <Main3SecondImage src={thirdSecondImage} alt="Left process" />
                </LeftContent>
                <RightContent>
                  <Main3FirstImage src={thirdFirstImage} alt="Right process" />
                  <DescriptionContainer>
                    <DescriptionTitle>10분내 원하는 곡이<br/>제조 완료!</DescriptionTitle>
                    <Description>
                      곡 제작 난이도에 따라서<br/>
                      1시간까지 소요될수 있습니다.
                    </Description>
                  </DescriptionContainer>
                </RightContent>
              </ThirdImageGroup>
            </ThirdSection>
          </div>
        </FullPageContainer>
      </div>
      <Footer />
    </>
  );
};

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
`;

const Section = styled.section`
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 10%;
  position: relative;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  color: white;
  margin-top: 20vh;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #FFD700;
`;

const MainText = styled.div`
  margin-bottom: 1rem;
`;

const TextLine = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const SubText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const StoreButton = styled.button`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #FFD700;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonIcon = styled.span`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  
  svg {
    width: 20px;
    height: 20px;
    color: black;
  }
`;

const AppPreview = styled.img`
  position: absolute;
  bottom: 0;
  right: 10%;
  height: 90vh;
  max-width: 400px;
  object-fit: contain;
  z-index: 1;
`;

const SecondSection = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
  position: relative;
  overflow: hidden;
`;

const ContentArea = styled.div`
  position: absolute;
  left: 10%;
  top: 25%;
  transform: translateY(-25%);
  max-width: 400px;
  z-index: 5;
`;

const SectionTitle = styled.h1`
  font-size: 2rem;
  color: #FFD700;
  margin-bottom: 0.5rem;
`;

const SubTitle = styled.h2`
  font-size: 3rem;
  color: #FFD700;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 1.3rem;
  line-height: 1.8;
  color: white;
  white-space: pre-line;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const ImageGroup = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  z-index: 1;
`;

const LeftImage = styled.img`
  position: absolute;
  height: 65vh;
  max-width: 250px;
  object-fit: contain;
  left: 15%;
  bottom: -5%;
  z-index: 1;
`;

const CenterImage = styled.img`
  position: absolute;
  height: 70vh;
  max-width: 270px;
  object-fit: contain;
  left: 50%;
  bottom: 5%;
  transform: translateX(-50%);
  z-index: 3;
`;

const RightImage = styled.img`
  position: absolute;
  height: 65vh;
  max-width: 250px;
  object-fit: contain;
  right: 15%;
  bottom: -5%;
  z-index: 1;
`;

const ThirdSection = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
  position: relative;
  overflow: hidden;
`;

const ThirdContentArea = styled.div`
  position: absolute;
  left: 20%;
  top: 15%;
  max-width: 400px;
  z-index: 5;
  text-align: left;
`;

const ThirdSectionTitle = styled.h1`
  font-size: 3rem;
  color: #FFD700;
  margin-bottom: 1.5rem;
  font-weight: bold;
`;

const ThirdImageGroup = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 60%;
  left: 20%;
  right: 20%;
  height: 100%;
  padding-top: 40vh;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 45%;
  height: 45vh;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 45%;
  height: 45vh;
`;

const Main3FirstImage = styled.img`
  height: 30vh;
  max-width: 350px;
  object-fit: contain;
`;

const Main3SecondImage = styled.img`
  height: 30vh;
  max-width: 350px;
  object-fit: contain;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.8rem;
  color: white;
  margin-bottom: 0.5rem;
`;

export default Main;
