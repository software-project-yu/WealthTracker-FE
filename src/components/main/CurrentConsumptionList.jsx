import styled from "styled-components";

export default function CurrentConsumptionList() {
  const example = [
    {
      expendId: 1,
      expendName: "RP구매",
      category: "오락",
      cost: 10000,
      expendDate: "2024-11-22",
    },
    {
      expendId: 2,
      expendName: "스타벅스 커피",
      category: "식비",
      cost: 5500,
      expendDate: "2024-11-21",
    },
    {
      expendId: 3,
      expendName: "지하철 교통비",
      category: "교통",
      cost: 1250,
      expendDate: "2024-11-20",
    },
    {
      expendId: 4,
      expendName: "넷플릭스 구독",
      category: "오락",
      cost: 17000,
      expendDate: "2024-11-19",
    },
    {
      expendId: 5,
      expendName: "이케아 쇼핑",
      category: "쇼핑",
      cost: 45000,
      expendDate: "2024-11-18",
    },
  ];
  //날짜 포맷
  //비용 쉼표 처리

  return (
    <Container>
      {example?.map((item) => (
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
