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

  // // 페이지 로드 시 스크롤 위치를 최상단으로 이동
  // useEffect(() => {
  //   window.scrollTo(0, 0);
    
  //   const container = document.querySelector('.fullpage-container');
  //   if (container) {
  //     container.scrollTo(0, 0);
  //   }
  // }, []);

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
          threshold: 0.7,
          rootMargin: '-10% 0px'
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
  const [thirdImagesRef, thirdImagesInView] = useImageInView();
  
  // 섹션 4 refs
  const [fourthTitleRef, fourthTitleInView] = useInView();
  const [fourthContentRef, fourthContentInView] = useInView();

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
                  src="https://www.youtube.com/embed/FgNH6TBWcLg" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
                <iframe 
                  src="https://www.youtube.com/embed/FLISfIievYY" 
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
            <ImageGroup 
              ref={thirdImagesRef}
              className={`${thirdImagesInView ? 'visible' : ''}`}
            >
              <LeftImage src={leftImage} alt="Left screenshot" className="side-image" />
              <CenterImage src={centerImage} alt="Center screenshot" className="center-image" />
              <RightImage src={rightImage} alt="Right screenshot" className="side-image" />
            </ImageGroup>
          </ThirdSection>
        </div>
        <div>
          <FourthSection>
            <ThirdContentArea 
              ref={fourthTitleRef}
              className={`fade-in ${fourthTitleInView ? 'visible' : ''}`}
            >
              <ThirdSectionTitle>원하는 조합이<br/>없다구요?</ThirdSectionTitle>
            </ThirdContentArea>
            <ThirdImageGroup 
              ref={fourthContentRef}
              className={`fade-in fade-in-delay-1 ${fourthContentInView ? 'visible' : ''}`}
            >
              <br/>
              <br/>
              <br/>
              <LeftContent>
                <DescriptionContainer>
                  <DescriptionTitle>걱정마세요,<br/>원하는 가수와 곡을 선택하면</DescriptionTitle>
                  <Description>
                    앱 내 신청곡 기능에서<br/>
                    손쉽게 신청 하실수 있습니다!
                  </Description>
                </DescriptionContainer>
                <Main3SecondImage src={thirdFirstImage} alt="Left process" />
              </LeftContent>
              <RightContent>
                <Main3FirstImage src={thirdSecondImage} alt="Right process" />
                <DescriptionContainer isRight={true}>
                  <DescriptionTitle>10분내 원하는 곡이<br/>제조 완료!</DescriptionTitle>
                  <Description>
                    곡 제작 난이도에 따라서<br/>
                    1시간까지 소요될수 있습니다.
                  </Description>
                </DescriptionContainer>
              </RightContent>
            </ThirdImageGroup>
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
  margin-top: 15vh;
  width: 40vw;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2vh;
`;

const Logo = styled.img`
  width: 3vw;
  min-width: 30px;
  height: auto;
  margin-right: 1vw;
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 2vw, 2.5rem);
  color: #FFD700;
`;

const MainText = styled.div`
  margin-bottom: 2vh;
`;

const TextLine = styled.h2`
  font-size: clamp(2rem, 3.5vw, 4rem);
  font-weight: bold;
  margin: 0.5vh 0;
`;

const SubText = styled.p`
  font-size: clamp(1rem, 1.5vw, 2rem);
  margin-bottom: 3vh;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1vw;
`;

const StoreButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8vh 1.5vw;
  background-color: #FFD700;
  border: none;
  border-radius: 8px;
  font-size: clamp(0.8rem, 1vw, 1.2rem);
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
  margin-right: 0.8vw;
  display: flex;
  align-items: center;
  height: 50%;
  
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
  height: 75vh;
  width: auto;
  max-width: 35vw;
  object-fit: contain;
  object-position: bottom;
  z-index: 1;
`;

const FloatingDownIcon = styled(DownIcon)`
  position: absolute;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(30px, 3vw, 50px);
  height: auto;
  color: white;
  animation: float 2s ease-in-out infinite;
  cursor: pointer;

  @keyframes float {
    0% {
      transform: translateX(-50%) translateY(0px);
    }
    50% {
      transform: translateX(-50%) translateY(-2vh);
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
  gap: 3vh;

  // 내부 컨텐츠를 위한 컨테이너
  > div {
    max-width: 1200px;
    margin: 0 auto;
    width: 60%;  // 60%로 줄여서 양쪽 20% 여백 확보
    padding: 5% 0;
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
  margin-bottom: 1vh;
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
  margin: 4vh 0 3vh 0;
`;

const PlaylistArea = styled.div`
  display: grid;
  gap: 24px;
  padding: 10px 0;
  margin-bottom: 2vh;
  width: 100%;
  
  grid-template-columns: repeat(7, minmax(160px, 180px));
  
  @media (max-width: 1600px) {
    grid-template-columns: repeat(6, minmax(160px, 180px));
  }
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, minmax(160px, 180px));
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, minmax(150px, 170px));
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, minmax(140px, 160px));
    gap: 20px;
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(140px, 160px));
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
  display: grid;
  grid-template-columns: repeat(3, minmax(380px, 480px));
  gap: 24px;
  margin: 4vh 0;
  padding: 20px 0;
  width: 100%;
  justify-content: start;
  
  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, minmax(380px, 480px));
  }
  
  @media (max-width: 900px) {
    grid-template-columns: minmax(380px, 700px);
    gap: 20px;
  }
  
  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    max-width: 100%;
    height: auto;
  }
`;

const ContentArea = styled.div`
  position: absolute;
  left: 10%;
  top: 15%;
  transform: translateY(-25%);
  max-width: 400px;
  z-index: 5;
  text-align: left;
`;

const SectionTitle = styled.h1`
  font-size: 2.8rem;
  color: #FFD700;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
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

  &.visible {
    .center-image {
      opacity: 1;
      transform: translateX(-50%);
    }
    
    .side-image {
      opacity: 1;
      transform: translateY(0);
      transition-delay: 0.8s;
    }
  }
`;

const LeftImage = styled.img`
  position: absolute;
  height: 75vh;
  width: auto;
  max-width: 300px;
  object-fit: contain;
  object-position: bottom;
  left: 13%;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const CenterImage = styled.img`
  position: absolute;
  height: 80vh;
  width: auto;
  max-width: 320px;
  object-fit: contain;
  object-position: bottom;
  left: 50%;
  bottom: 10vh;
  transform: translateX(-50%) translateY(50px);
  z-index: 3;
  opacity: 0;
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const RightImage = styled.img`
  position: absolute;
  height: 75vh;
  width: auto;
  max-width: 300px;
  object-fit: contain;
  object-position: bottom;
  right: 13%;
  bottom: 0;
  z-index: 1;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
`;

const ThirdSection = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #101010;
  position: relative;
  overflow: hidden;

  > div {
    max-width: 1200px;
    margin: 0 auto;
    width: 60%;  // 60%로 줄여서 양쪽 20% 여백 확보
    height: 100%;
    position: relative;
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
  font-size: 2.8rem;
  color: #FFD700;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ThirdImageGroup = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  left: 20%;
  right: 20%;
  height: 70%;
  padding-top: 20vh;
  gap: 5vh;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24vw;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 24vw;
`;

const Main3FirstImage = styled.img`
  height: 25vh;
  max-width: 350px;
  object-fit: contain;
  margin-left: -10%;
`;

const Main3SecondImage = styled.img`
  height: 25vh;
  max-width: 350px;
  object-fit: contain;
`;

const DescriptionContainer = styled.div<{ isRight?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  text-align: ${props => props.isRight ? 'right' : 'left'};
`;

const DescriptionTitle = styled.h3`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const FourthSection = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
  position: relative;
  overflow: hidden;

  > div {
    max-width: 1200px;
    margin: 0 auto;
    width: 60%;  // 60%로 줄여서 양쪽 20% 여백 확보
    height: 100%;
    position: relative;
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
`;

const BannerSection = styled.div`
  width: 100%;
  background-color: #FFD700;
  padding: 60px 0;

  > div {
    max-width: 1200px;
    margin: 0 auto;
    width: 60%;  // 60%로 줄여서 양쪽 20% 여백 확보
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

export default Main;

