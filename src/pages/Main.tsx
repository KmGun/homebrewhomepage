import styled from 'styled-components';
import logoImage from '../assets/homebrewlogo.png';
import appPreviewImage from '../assets/Main/MainappPreviewImage.png';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import leftImage from '../assets/Main/Main2LeftImage.png';
import centerImage from '../assets/Main/Main2MiddleImage.png';
import rightImage from '../assets/Main/Main2RightImage.png';
import { ReactComponent as WebIcon } from '../assets/Main/webIcon.svg';
import { ReactComponent as MobileIcon } from '../assets/Main/mobileIcon.svg';
import { ReactComponent as DownIcon } from '../assets/Main/MainDownIcon.svg';
import { useEffect, useState, useRef } from 'react';
import thirdFirstImage from '../assets/Main/Main3FirstImage.png';
import thirdSecondImage from '../assets/Main/Main3SecondImage.png';
import Footer from '../components/Footer';
import song1Thumbnail from '../assets/Main/song/song1.png';
import song2Thumbnail from '../assets/Main/song/song2.png';
import song3Thumbnail from '../assets/Main/song/song3.png';
import song4Thumbnail from '../assets/Main/song/song4.png';
import song5Thumbnail from '../assets/Main/song/song5.png';
import song1Audio from '../assets/Main/song/song1.mp3';
import song2Audio from '../assets/Main/song/song2.mp3';
import song3Audio from '../assets/Main/song/song3.mp3';
import song4Audio from '../assets/Main/song/song4.mp3';
import song5Audio from '../assets/Main/song/song5.mp3';
import song6Thumbnail from '../assets/Main/song/song6.png';
import song7Thumbnail from '../assets/Main/song/song7.png';
import song6Audio from '../assets/Main/song/song6.mp3';
import song7Audio from '../assets/Main/song/song7.mp3';
import { ReactComponent as PlayButtonIcon } from '../assets/Main/playbutton.svg';
import { useNavigate } from 'react-router-dom';

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
  
  & > div:not(:last-child) {
    min-height: 100vh;
    height: auto;
    width: 100%;
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
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const navigate = useNavigate();

  // 페이지 로드 시 스크롤 위치를 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const container = document.querySelector('.fullpage-container');
    if (container) {
      container.scrollTo(0, 0);
    }
  }, []);

  const handleAudioRef = (el: HTMLAudioElement | null, index: number) => {
    if (audioRefs.current.length <= index) {
      audioRefs.current = [...audioRefs.current, ...Array(index - audioRefs.current.length + 1).fill(null)];
    }
    audioRefs.current[index] = el;
  };

  const handlePlayClick = (index: number) => {
    if (currentlyPlaying === index) {
      audioRefs.current[index]?.pause();
      setCurrentlyPlaying(null);
    } else {
      if (currentlyPlaying !== null) {
        audioRefs.current[currentlyPlaying]?.pause();
      }
      audioRefs.current[index]?.play();
      setCurrentlyPlaying(index);
    }
  };

  const songData = [
    { img: song1Thumbnail, audio: song1Audio, title: '소나기', artist: '성시경' },
    { img: song2Thumbnail, audio: song2Audio, title: '꽃피는 봄이 오면', artist: '이수' },
    { img: song3Thumbnail, audio: song3Audio, title: '비처럼 음악처럼', artist: '김광석' },
    { img: song4Thumbnail, audio: song4Audio, title: '첫사랑', artist: '아이유' },
    { img: song5Thumbnail, audio: song5Audio, title: '고민중독', artist: '팜하니' },
    { img: song6Thumbnail, audio: song6Audio, title: 'TOMBOY', artist: '윤도현' },
    { img: song7Thumbnail, audio: song7Audio, title: '보고싶다', artist: '나얼' },
  ];

  const scrollToNextSection = () => {
    const container = document.querySelector('.fullpage-container');
    if (container) {
      const sectionHeight = window.innerHeight;
      const currentScrollTop = (container as HTMLElement).scrollTop;
      const nextSectionPosition = (Math.floor(currentScrollTop / sectionHeight) + 1) * sectionHeight;
      
      container.scrollTo({
        top: nextSectionPosition,
        behavior: 'smooth'
      });
    }
  };

  const useInView = () => {
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
            
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        },
        { 
          threshold: 0.1,
          rootMargin: '0px'
        }
      );

      const current = ref.current;
      if (current) {
        observer.observe(current);
      }

      return () => {
        if (current) {
          observer.unobserve(current);
        }
      };
    }, [hasAnimated]);

    return [ref, isInView] as const;
  };

  const useImageInView = () => {
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            setHasAnimated(true);
            
            if (ref.current) {
              observer.unobserve(ref.current);
            }
          }
        },
        { 
          threshold: 0.2,
          rootMargin: '0px'
        }
      );

      const current = ref.current;
      if (current) {
        observer.observe(current);
      }

      return () => {
        if (current) {
          observer.unobserve(current);
        }
      };
    }, [hasAnimated]);

    return [ref, isInView] as const;
  };

  const [titleRef, titleInView] = useInView();
  const [playlistRef, playlistInView] = useInView();
  const [videoRef, videoInView] = useInView();

  // 섹션 3 refs
  const [thirdTitleRef, thirdTitleInView] = useInView();
  const [thirdCenterRef, thirdCenterInView] = useInView();
  const [thirdBottomRef, thirdBottomInView] = useImageInView();
  
  // 섹션 4 refs
  const [fourthTitleRef, fourthTitleInView] = useInView();
  const [fourthFirstProcessRef, fourthFirstProcessInView] = useInView();
  const [fourthSecondProcessRef, fourthSecondProcessInView] = useInView();

  return (
    <MainWrapper>
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
                  <StoreButton href="https://homebrewmusic.onelink.me/CxhH/g3pllyei">
                    <ButtonIcon><MobileIcon /></ButtonIcon>
                    앱으로 듣기
                  </StoreButton>
                  <StoreButton href="https://homebrewmusic.web.app/allArtistSongs/01418">
                    <ButtonIcon><WebIcon /></ButtonIcon>
                    웹으로 듣기
                  </StoreButton>
                </ButtonGroup>
              </ContentWrapper>
              <AppPreview src={appPreviewImage} alt="App preview" />
              <FloatingDownIcon onClick={scrollToNextSection} />
            </Section>
          </HomeContainer>
        </div>
        <div>
          <SecondSection>
            <TitleArea ref={titleRef} className={`fade-in ${titleInView ? 'visible' : ''}`}>
              <MainTitle>이런 음악을<br/>만듭니다.</MainTitle>
              <SubTitle>홈브루 프로듀싱 팀과, 유저들이 직접 제작한<br/>음원들을 들어보세요!</SubTitle>
            </TitleArea>
            
            <div ref={playlistRef} className={`fade-in fade-in-delay-1 ${playlistInView ? 'visible' : ''}`}>
              <SectionSubTitle>유저가 직접 제작한 음원들</SectionSubTitle>
              <PlaylistArea>
                {songData.map((song, index) => (
                  <SongCard key={index}>
                    <div 
                      className="image-container" 
                      onClick={(e) => {
                        e.preventDefault();
                        handlePlayClick(index);
                      }}
                    >
                      <img src={song.img} alt={`Song ${index + 1}`} />
                      <PlayButton isPlaying={currentlyPlaying === index}>
                        <PlayButtonIcon />
                      </PlayButton>
                      <AudioWaveContainer isPlaying={currentlyPlaying === index}>
                        <AudioWaveLine />
                        <AudioWaveLine />
                        <AudioWaveLine />
                        <AudioWaveLine />
                        <AudioWaveLine />
                      </AudioWaveContainer>
                    </div>
                    <SongInfo>
                      <h3>{song.title}</h3>
                      <p>{song.artist}</p>
                    </SongInfo>
                    <audio
                      ref={(el) => handleAudioRef(el, index)}
                      src={song.audio}
                      onEnded={() => setCurrentlyPlaying(null)}
                    />
                  </SongCard>
                ))}
              </PlaylistArea>
            </div>
            
            <div ref={videoRef} className={`fade-in fade-in-delay-2 ${videoInView ? 'visible' : ''}`}>
              <SectionSubTitle>SNS에서 바이럴 되고 있는 영상들</SectionSubTitle>
              <VideoArea>
                <iframe 
                  src="https://www.youtube.com/embed/PWAuFySkrCQ" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                <iframe 
                  src="https://www.youtube.com/embed/AE4pKWvWQHc"
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                <iframe 
                  src="https://www.youtube.com/embed/VByUtz2rJNo" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              </VideoArea>
            </div>
          </SecondSection>
        </div>
        <div>
          <ThirdSection>
            <ContentArea 
              ref={thirdTitleRef}
              className={`fade-in ${thirdTitleInView ? 'visible' : ''}`}
            >
              <SectionTitle>상상도 못한<br/>무제한의 컨텐츠.</SectionTitle>
              <Description>
                가수당 평균 10곡,<br />
                유저들이 직접 제작한<br />
                새로운 커버곡이 매일 업데이트 됩니다.
              </Description>
            </ContentArea>
            <CenterImageWrapper 
              ref={thirdCenterRef}
              className={`fade-in ${thirdCenterInView ? 'visible' : ''}`}
            >
              <CenterImage src={centerImage} alt="Center screenshot" />
            </CenterImageWrapper>
            <BottomImagesWrapper 
              ref={thirdBottomRef}
              className={`fade-in fade-in-delay-1 ${thirdBottomInView ? 'visible' : ''}`}
            >
              <LeftImage src={leftImage} alt="Left screenshot" />
              <RightImage src={rightImage} alt="Right screenshot" />
            </BottomImagesWrapper>
          </ThirdSection>
        </div>
        <div>
          <FourthSection>
            <FourthContentWrapper>
              <div 
                ref={fourthTitleRef}
                className={`fade-in ${fourthTitleInView ? 'visible' : ''}`}
              >
                <FourthTitle>원하는 조합이<br/>없다구요?</FourthTitle>
              </div>
              
              <ProcessContainer>
                <ProcessRow 
                  ref={fourthFirstProcessRef}
                  className={`fade-in ${fourthFirstProcessInView ? 'visible' : ''}`}
                >
                  <ProcessContent isReversed={false}>
                    <ProcessTitle>걱정마세요,<br/>원하는 가수와 곡을 선택하면</ProcessTitle>
                    <ProcessDescription>
                      앱 내 신청곡 기능에서<br/>
                      손쉽게 신청 하실수 있습니다!
                    </ProcessDescription>
                  </ProcessContent>
                  <ProcessImage src={thirdFirstImage} alt="Song request process" />
                </ProcessRow>

                <ProcessRow 
                  ref={fourthSecondProcessRef}
                  className={`fade-in ${fourthSecondProcessInView ? 'visible' : ''}`}
                >
                  <ProcessContent isReversed={true}>
                    <ProcessTitle>10분내 원하는 곡이<br/>제조 완료!</ProcessTitle>
                    <ProcessDescription>
                      곡 제작 난이도에 따라서<br/>
                      1시간까지 소요될수 있습니다.
                    </ProcessDescription>
                  </ProcessContent>
                  <ProcessImage src={thirdSecondImage} alt="Song creation process" />
                </ProcessRow>
              </ProcessContainer>
            </FourthContentWrapper>
          </FourthSection>
        </div>
        <Banner />
      </FullPageContainer>
      <Footer />
    </MainWrapper>
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
  margin-top: 180px;
  width: 500px;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

const Logo = styled.img`
  width: 40px;
  height: auto;
  margin-right: 12px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #FFD700;
`;

const MainText = styled.div`
  margin-bottom: 24px;
`;

const TextLine = styled.h2`
  font-size: 48px;
  font-weight: bold;
  margin: 8px 0;
`;

const SubText = styled.p`
  font-size: 24px;
  margin-bottom: 32px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const StoreButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8vh 1.5vw;
  background-color: #FFD700;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
  text-decoration: none;
  color: black;
  min-width: 120px;
  height: 40px;

  &:hover {
    transform: scale(1.05);
  }
`;

const ButtonIcon = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
  height: 20px;
  
  svg {
    height: 100%;
    width: auto;
    color: black;
  }
`;

const AppPreview = styled.img`
  position: absolute;
  bottom: 0;
  right: 10%;
  height: 800px;
  width: 450px;
  max-width: 500px;
  object-fit: contain;
  object-position: bottom;
  z-index: 1;
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

const SecondSection = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: #1a1a1a;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2vh;

  > div {
    max-width: 1400px;
    margin: 0 auto;
    width: min(90%, 100% - 200px);
    padding: 0;
  }

  > div:first-child {
    padding-top: 200px;  // 이 값을 조정하시면 됩니다
  }

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-delay-1 {
    transition-delay: 0.2s;
  }

  .fade-in-delay-2 {
    transition-delay: 0.4s;
  }
`;

const TitleArea = styled.div`
  text-align: left;
  margin: 0 0 1vh 0;  // 상단 마진 제거 (SecondSection에서 처리)
`;

const MainTitle = styled.h1`
  font-size: 2.8rem;
  color: #FFD700;
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.2rem;
  color: white;
`;

const SectionSubTitle = styled.h2`
  font-size: 1.6rem;
  color: white;
  margin: 2vh 0;
`;

const PlaylistArea = styled.div`
  display: grid;
  gap: 24px;
  padding: 1vh 0;
  margin-bottom: 1vh;
  width: 100%;
  justify-content: start;
  
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  
  @media (max-width: 1600px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 20px;
  }
`;

const SongCard = styled.div`
  width: 100%;
  max-width: 180px;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  
  .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    
    &:hover {
      img {
        filter: brightness(0.7);
      }
    }
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    display: block;
  }
`;

const PlayButton = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;

  svg {
    width: 40px;
    height: 40px;
  }

  ${props => !props.isPlaying && `
    .image-container:hover & {
      visibility: visible;
    }
  `}
`;

const AudioWaveContainer = styled.div<{ isPlaying: boolean }>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 20px;
  visibility: ${props => props.isPlaying ? 'visible' : 'hidden'};
  padding: 4px 6px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 4px;
  backdrop-filter: blur(2px);
`;

const AudioWaveLine = styled.div`
  width: 3px;
  background-color: #FFD700;
  border-radius: 2px;
  animation: waveAnimation 0.8s ease-in-out infinite;
  box-shadow: 0 0 4px rgba(255, 215, 0, 0.5);

  &:nth-child(1) { height: 30%; animation-delay: 0s; }
  &:nth-child(2) { height: 70%; animation-delay: 0.1s; }
  &:nth-child(3) { height: 100%; animation-delay: 0.2s; }
  &:nth-child(4) { height: 60%; animation-delay: 0.3s; }
  &:nth-child(5) { height: 40%; animation-delay: 0.4s; }

  @keyframes waveAnimation {
    0%, 100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0.5);
    }
  }
`;

const SongInfo = styled.div`
  margin-top: 10px;
  
  h3 {
    color: white;
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  p {
    color: #888;
    font-size: 0.9rem;
  }
`;

const VideoArea = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  margin: 4vh 0 250px 0;
  padding: 20px 0;
  width: 100%;
  
  @media (max-width: 1600px) {
    flex-wrap: wrap;
  }
  
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  iframe {
    width: 30%;
    max-width: 400px;
    aspect-ratio: 16/9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 1600px) {
      width: 45%;
      max-width: 380px;
      margin-bottom: 20px;
    }
    
    @media (max-width: 900px) {
      width: 90%;
      max-width: 350px;
    }
  }
`;

const ThirdSection = styled.div`
  width: 100%;
  height: 100vh;
  padding-bottom: 200px;
  background-color: #101010;
  position: relative;
  overflow: hidden;

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-delay-1 {
    transition-delay: 0.2s;
  }
`;

const ContentArea = styled.div`
  position: absolute;
  left: 10%;
  top: 20%;
  max-width: 400px;
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: 2.8rem;
  color: #FFD700;
  margin-bottom: 2rem;
  line-height: 1.2;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: white;
  line-height: 1.6;
`;

const CenterImage = styled.img`
  position: absolute;
  left: 50%;
  top: 200px;  // 약간 위로
  transform: translate(-50%, -50%);
  height: 700px;
  width: auto;
  z-index: 1;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
`;

const LeftImage = styled.img`
  position: absolute;
  left: 10%;
  bottom: 0;  // 아래에 배치
  height: 550px;
  width: auto;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
`;

const RightImage = styled.img`
  position: absolute;
  right: 10%;
  bottom: 0;  // 아래에 배치
  height: 550px;
  width: auto;
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5));
`;

const FourthSection = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;

  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    
    &.visible {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-delay-1 {
    transition-delay: 0.2s;
  }

  .fade-in-delay-2 {
    transition-delay: 0.4s;
  }
`;

const FourthContentWrapper = styled.div`
  max-width: 1400px;
  width: min(90%, 100% - 200px);
  margin: 0 auto;
`;

const FourthTitle = styled.h2`
  font-size: 2.8rem;
  color: #FFD700;
  margin-bottom: 80px;
  text-align: left;
`;

const ProcessContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 120px;
  margin-top: 60px;
  width: 100%;

  > div:nth-child(1) {
    transition-delay: 0.2s;
  }

  > div:nth-child(2) {
    transition-delay: 0.4s;
  }
`;

const ProcessRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

interface ProcessContentProps {
  isReversed?: boolean;
}

const ProcessContent = styled.div<ProcessContentProps>`
  width: 400px;
  padding-left : 100px;
  padding-right : 100px;
  text-align: ${props => props.isReversed ? 'right' : 'left'};
`;

const ProcessTitle = styled.h3`
  font-size: 2rem;
  color: white;
  margin-bottom: 24px;
`;

const ProcessDescription = styled.p`
  font-size: 1.2rem;
  color: #999;
  line-height: 1.6;
`;

interface ProcessImageProps {
  isReversed?: boolean;
}

const ProcessImage = styled.img<ProcessImageProps>`
  width: 400px;
  height: auto;
  object-fit: contain;
  margin-left: ${props => props.isReversed ? 'auto' : '0'};
  padding-left:100px;
  padding-right:100px;
`;

const BannerSection = styled.div`
  width: 100%;
  background-color: #FFD700;
  padding: 60px 0;

  > div {
    max-width: 1400px;
    margin: 0 auto;
    width: min(70%, 100% - 600px);
  }
`;

const BannerInner = styled.div`  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BannerLeft = styled.div`
  flex: 1;
`;

const BannerTitle = styled.h2`
  font-size: 2rem;
  color: #000;
  margin-bottom: 24px;
  font-weight: bold;
`;

const BannerText = styled.p`
  font-size: 1.1rem;
  color: #333;
  line-height: 1.6;
  font-weight: 700;
`;

const BannerButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: #000;
  color: white;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const Banner = () => {
  const navigate = useNavigate();

  return (
    <BannerSection>
      <BannerInner>
        <BannerLeft>
          <BannerTitle>홈브루가 궁금하다면 연락 주세요.</BannerTitle>
          <BannerText>
            이곳에서 일해보고 싶다는 생각이 들었다면,<br/>
            홈브루를 도와주고 싶으시다면,<br/>
            모두 연락 주세요.
          </BannerText>
          <BannerButton as="button" onClick={() => navigate('/contact')}>
            연락하기
          </BannerButton>
        </BannerLeft>
      </BannerInner>
    </BannerSection>
  );
};

const CenterImageWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const BottomImagesWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  height: 550px;
  z-index: 1;
`;

export default Main;

