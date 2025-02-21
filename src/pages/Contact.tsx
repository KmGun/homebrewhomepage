import styled from 'styled-components';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import enterIcon from '../assets/Contact/enterIcon.svg';
import artistIcon from '../assets/Contact/artistIcon.svg';
import hireIcon from '../assets/Contact/hireIcon.svg';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
  const navigate = useNavigate();

  const handleCardClick = (type: string) => {
    navigate(`/contact/${type}`);
  };

  return (
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
    </ContactContainer>
  );
};

const ContactContainer = styled.div`
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
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 5rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
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
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
`;

export default Contact;
