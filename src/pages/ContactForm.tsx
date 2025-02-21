import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import backgroundImage from '../assets/Main/MainbackgroundImage.png';

const ContactForm = () => {
  const { type } = useParams();
  
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

  return (
    <ContactFormContainer>
      <FormSection>
        <MainTitle>아래 내용을 간단히 채워주세요.</MainTitle>
        <FormWrapper>
          <SubTitle>24시간 내 회신 드리겠습니다.</SubTitle>
          <Form>
            <InputGroup>
              <Label>이름</Label>
              <Input type="text" placeholder="이름을 입력해주세요" />
            </InputGroup>
            <InputGroup>
              <Label>이메일</Label>
              <Input type="email" placeholder="이메일을 입력해주세요" />
            </InputGroup>
            <InputGroup>
              <Label>전화번호</Label>
              <Input type="tel" placeholder="전화번호를 입력해주세요" />
            </InputGroup>
            <InputGroup>
              <Label>제목</Label>
              <Input type="text" placeholder="제목을 입력해주세요" />
            </InputGroup>
            <InputGroup>
              <Label>내용</Label>
              <TextArea placeholder="내용을 입력해주세요" rows={5} />
            </InputGroup>
            <InputGroup>
              <Label>첨부파일</Label>
              <Input type="file" />
            </InputGroup>
            <SubmitButton>작성 완료</SubmitButton>
          </Form>
        </FormWrapper>
      </FormSection>
    </ContactFormContainer>
  );
};

const ContactFormContainer = styled.div`
  width: 100%;
  min-height: 100vh;
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