import styled from "styled-components";
import moment from "moment";
import arrow from "../assets/images/arrow.png";
export default function BackGround() {
  //현재 날짜 가져오기
  const today = moment().format("MMMM DD, YYYY");
  return (
    <Container>
      <ArrowImage src={arrow} />
      <DateText>{today}</DateText>
    </Container>
  );
}
const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray00};
  width: auto;
  height: 3rem;
  width: auto;
  height: 1.5rem;
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray02};

  @media (max-width: 1350px) {
    margin-top: 1.5rem;
  }
`;
const ArrowImage = styled.img`
  width: 1rem;
  height: 1rem;
  margin-right: 8px;
`;
const DateText = styled.a`
  color: ${({ theme }) => theme.colors.gray03};
  font-size: 1rem;
`;
