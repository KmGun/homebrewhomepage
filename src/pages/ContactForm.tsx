import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';
import { useState } from 'react';

const ContactForm = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    content: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <ContactFormContainer>
      <FormSection>
        <MainTitle>아래 내용을 간단히 채워주세요.</MainTitle>
        <FormWrapper>
          <SubTitle>24시간 내 회신 드리겠습니다.</SubTitle>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label>이름 *</Label>
              <Input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요" 
              />
            </InputGroup>
            <InputGroup>
              <Label>이메일 *</Label>
              <Input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력해주세요" 
              />
            </InputGroup>
            <InputGroup>
              <Label>전화번호 *</Label>
              <Input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="전화번호를 입력해주세요" 
              />
            </InputGroup>
            <InputGroup>
              <Label>제목 *</Label>
              <Input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="제목을 입력해주세요" 
              />
            </InputGroup>
            <InputGroup>
              <Label>내용 *</Label>
              <TextArea 
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="내용을 입력해주세요" 
                rows={5} 
              />
            </InputGroup>
            <InputGroup>
              <Label>첨부파일</Label>
              <Input type="file" />
            </InputGroup>
            <SubmitButton type="submit">작성 완료</SubmitButton>
          </Form>
        </FormWrapper>
      </FormSection>
    </ContactFormContainer>
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
`;

const FormSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  padding: 2rem 0;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  background: rgba(17, 17, 17, 0.8);
  border-radius: 15px;
  padding: 2rem;
  margin: 0 1rem;
`;

const MainTitle = styled.h1`
  font-size: 2.8rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
  position: relative;
  z-index: 1;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: white;
  font-size: 1.1rem;
`;

const Input = styled.input`
  padding: 0.7rem;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const TextArea = styled.textarea`
  padding: 0.7rem;
  border-radius: 4px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
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
`;

export default ContactForm;