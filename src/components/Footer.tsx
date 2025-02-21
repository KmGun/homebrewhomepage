import styled from 'styled-components';
import { ReactComponent as KakaoIcon } from '../assets/Footer/kakaoIcon.svg';
import { ReactComponent as YoutubeIcon } from '../assets/Footer/youtubeIcon.svg';
import { ReactComponent as InstagramIcon } from '../assets/Footer/instagramIcon.svg';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a1a1a;
  padding: 40px 0;
  color: #BABABA;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const CompanyInfo = styled.div`
  margin-bottom: 20px;
  line-height: 1.2;

  p {
    margin: 2px 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  right: 20px;
  top: 0;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #B3B3B3;
  border-radius: 8px;
  
  svg {
    width: 24px;
    height: 24px;
    fill: #BABABA;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanyInfo>
          <p>© 2025 Homebrew Corp.</p>
          <p>상호 : 홈브루 (Homebrew) | 사업자등록번호 : 885-13-02393 사업자정보 확인</p>
          <p>통신판매업 : 2024-서울달대문-2210</p>
          <p>주소 : 서울특별시 안암로 145 창업지원센터 2층 217호 | 대표이사 : 김진</p>
          <p>팩스 : 02-3275-8364</p>
        </CompanyInfo>
        <div>
          <p>고객센터 운영 카카오톡 채널답 문의 (24시간 언제든지)</p>
          <p>개인정보처리방침 | 서비스 이용약관</p>
          <p>사업 제휴 문의 | 투자</p>
        </div>
        <SocialLinks>
          <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
            <KakaoIcon />
          </SocialIcon>
          <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
            <YoutubeIcon />
          </SocialIcon>
          <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </SocialIcon>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 