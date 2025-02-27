import styled from 'styled-components';
import { ReactComponent as KakaoIcon } from '../assets/Footer/kakaoIcon.svg';
import { ReactComponent as YoutubeIcon } from '../assets/Footer/youtubeIcon.svg';
import { ReactComponent as InstagramIcon } from '../assets/Footer/instagramIcon.svg';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a1a1a;
  padding: 40px 0;
  color: #BABABA;
  font-size: 14px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const CompanyInfo = styled.div`
  margin-bottom: 20px;
  line-height: 1.4;

  p {
    margin: 2px 0;
    font-size: 13px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  
  @media (min-width: 768px) {
    position: absolute;
    right: 20px;
    top: 0;
  }
  
  @media (max-width: 767px) {
    margin-top: 20px;
  }
`;

const SocialIcon = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer'
})`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-color: #B3B3B3;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  
  svg {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px;
    box-sizing: border-box;
    fill: #1A1A1A;
  }
  
  &:hover {
    background-color: #999999;
  }
`;

const StyledLink = styled.a`
  color: #BABABA;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <CompanyInfo>
          <p>© 2025 Homebrew Corp.</p>
          <p>상호 : 홈브루 (Homebrew) | 사업자등록번호 : 885-13-02393 <StyledLink href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=8851302393" target="_blank" rel="noopener noreferrer"><strong>사업자정보 확인</strong></StyledLink></p>
          <p>통신판매업 : 2024-서울동대문-2210</p>
          <p>주소 : 서울특별시 안암로 145 창업지원센터 2층 217호 | 대표이사 : 김 건</p>
          <p>팩스 : 02-3275-8364</p>
        </CompanyInfo>
        <div style={{ fontSize: '13px' }}>
          <p>고객센터 운영 : <StyledLink href="http://pf.kakao.com/_ztcLG" target="_blank" rel="noopener noreferrer">카카오톡 채널 문의 (24시간 언제든지)</StyledLink></p>
          <p><StyledLink href="https://homebrew-prod.web.app/privacyPolicy" target="_blank" rel="noopener noreferrer">개인정보처리방침</StyledLink></p>
          <p><StyledLink href="mailto:hbrew001@gmail.com">사업 제휴 문의</StyledLink> | <StyledLink href="mailto:hbrew001@gmail.com">투자</StyledLink></p>
        </div>
        <SocialLinks>
          <SocialIcon href="http://pf.kakao.com/_ztcLG">
            <KakaoIcon />
          </SocialIcon>
          <SocialIcon href="https://www.youtube.com/@ai_limjaebum">
            <YoutubeIcon />
          </SocialIcon>
          <SocialIcon href="https://www.instagram.com/homebrewkr/">
            <InstagramIcon />
          </SocialIcon>
        </SocialLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 