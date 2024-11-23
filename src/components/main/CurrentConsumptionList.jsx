import styled from "styled-components";
import useFetchData from "../../hooks/useFetch";
import Error from "../common/Error";
import LoadingSpinners from "../common/LoadingSpinners";
//최근 거래 내역 컴포넌트
export default function CurrentConsumptionList() {
  const { data, error, isLoading } = useFetchData("/api/expend/list");
  if (error) return <Error />;
  if (isLoading) return <LoadingSpinners />;
  return (
    <Container>
      {data &&
        data.map((item) => (
          <BoxContainer key={item.expendId}>
            <LeftContainer>
              <BigText>{item.expendName}</BigText>
              <SmallText>{item.category}</SmallText>
            </LeftContainer>
            <RightContainer>
              <BigText>{item.cost.toLocaleString("ko-KR")}원</BigText>
              <SmallText>{item.expendDate.replaceAll("-", ".")}</SmallText>
            </RightContainer>
          </BoxContainer>
        ))}
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const BoxContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray09};
`;

const LeftContainer = styled.div`
  display: flex;
  align-content: start;
  flex-direction: column;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: end;
  flex-direction: column;
`;
const BigText = styled.a`
  font-size: 1.2rem;
  font-weight: 600;
`;
const SmallText = styled.a`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray03};
`;
