import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//404에러페이지
export default function ErrorPage() {
  const nav = useNavigate();
  return (
    <Container>
      <NumberText>404</NumberText>
      <NotFoundText>NOT FOUND</NotFoundText>
      <Text>요청하신 페이지를 찾을 수 없습니다.</Text>
      <HomeButton type="button" onClick={() => nav(-1)}>
        홈으로
      </HomeButton>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray00};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NumberText = styled.h1`
  font-weight: 900;
  font-size: 3.5rem;
  -webkit-text-stroke: 5px ${({ theme }) => theme.colors.blue};
  -webkit-text-fill-color: transparent;
`;
const NotFoundText = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue};
`;

const Text = styled.h2`
  padding: 3rem 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.blue};
`;

const HomeButton = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 0.25rem;
  height: fit-content;
  padding: 1rem 5rem;
  border: none;
  cursor: pointer;

  &:hover {
    transition: 0.5s;
    transform: scale(120%);
  }
`;
