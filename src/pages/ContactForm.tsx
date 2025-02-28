import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import { useState, useLayoutEffect, useRef } from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import Footer from '../components/Footer';

const ContactForm = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    content: ''
  });
  
  useLayoutEffect(() => {
    if (isInitialMount.current) {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      isInitialMount.current = false;
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getTitle = () => {
    switch(type) {
      case 'entertainment':
        return '연예 기획사 문의';
      case 'artist':
        return '아티스트 문의';
      case 'hire':
        return '채용 문의';
      default:
        return '문의하기';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 항목 검사
    const { name, email, phone, title, content } = formData;
    if (!name || !email || !phone || !title || !content) {
      alert('모든 필수 항목을 채워주세요. (첨부파일 제외)');
      return;
    }
    
    alert('문의가 성공적으로 제출되었습니다.');
    // 메인 컨택트 페이지(카드 선택 페이지)로 이동
    navigate('/contact');
  };

  return (
    <>
      <GlobalStyle />
      <ContactFormContainer>
        <FormSection>
          <MainTitle>아래 내용을 간단히 채워주세요.</MainTitle>
          <FormWrapper>
            <SubTitle>24시간 내 회신 드리겠습니다.</SubTitle>
            <Form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
              <InputGroup>
                <Label htmlFor="name">이름 *</Label>
                <Input 
                  id="name"
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="이름을 입력해주세요" 
                  onClick={(e) => e.stopPropagation()}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">이메일 *</Label>
                <Input 
                  id="email"
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="이메일을 입력해주세요" 
                  onClick={(e) => e.stopPropagation()}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="phone">전화번호 *</Label>
                <Input 
                  id="phone"
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="전화번호를 입력해주세요" 
                  onClick={(e) => e.stopPropagation()}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="title">제목 *</Label>
                <Input 
                  id="title"
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="제목을 입력해주세요" 
                  onClick={(e) => e.stopPropagation()}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="content">내용 *</Label>
                <TextArea 
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="내용을 입력해주세요" 
                  rows={5} 
                  onClick={(e) => e.stopPropagation()}
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="file">첨부파일</Label>
                <Input 
                  id="file"
                  type="file" 
                  onClick={(e) => e.stopPropagation()}
                />
              </InputGroup>
              <SubmitButton type="submit">작성 완료</SubmitButton>
            </Form>
          </FormWrapper>
        </FormSection>
        <Footer />
      </ContactFormContainer>
    </>
  );
};

const ContactFormContainer = styled.div`
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
    background: rgba(0, 0, 0, 0.7);
  }
  
  @media (max-width: 768px) {
    &::before {
      display: none; // 모바일에서 어두운 오버레이 제거
    }
  }
`;

const FormSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 2rem 0;
  
  @media (max-width: 768px) {
    padding: 1.5rem 0;
    justify-content: flex-start;
    margin-top: 80px; /* 네비게이션 바 높이보다 더 크게 설정 */
    padding-top: 2rem; /* 추가 패딩 */
  }
  
  @media (max-width: 480px) {
    margin-top: 70px; /* 더 작은 화면에서 조정 */
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgba(17, 17, 17, 0.8);
  border-radius: 15px;
  padding: 2rem;
  margin: 0 2rem; /* 좌우 여백 */
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 80%; /* 너비 감소로 좌우 여백 확보 */
    width: 80%; /* 명시적 너비 설정 */
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 1.2rem;
    max-width: 75%; /* 더 작은 화면에서 너비 추가 감소 */
    width: 75%; /* 명시적 너비 설정 */
  }
`;

const MainTitle = styled.h1`
  font-size: 2.8rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    gap: 0.3rem;
  }
`;

const Label = styled.label`
  color: white;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  
  &:focus {
    outline: 2px solid #FFD700;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.85rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.8rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.7rem;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  
  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.85rem;
    min-height: 80px;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.8rem;
    min-height: 70px;
  }
`;

const SubmitButton = styled.button`
  background: #FFD700;
  color: black;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  width: 100%;
  
  &:hover {
    background: #FFC700;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
    margin-top: 0.8rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
    margin-top: 0.6rem;
  }
`;

export default ContactForm;