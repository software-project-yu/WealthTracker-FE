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
  display: flex;
  margin-left: 19rem;
  padding: 2rem;
  gap: 0.5rem;
`;
const ArrowImage = styled.img`
  width: 1rem;
  height: 1rem;
`;
const DateText = styled.a`
  color: ${({ theme }) => theme.colors.gray03};
  font-size: 1rem;
`;
