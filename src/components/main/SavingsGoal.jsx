import styled from "styled-components";
import CircleGraph from "../CircleGraph";

export default function SavingsGoal() {
  //윤년 계산을 위한 현재 날짜
  const today = new Date().getFullYear();

  const options = [
    { month: 1, value: "1.1 ~ 1.31" },
    { month: 2, value: today % 4 == 0 ? "2.1 ~ 2.29" : "2.1 ~ 2.28" },
    { month: 3, value: "3.1 ~ 3.31" },
    { month: 4, value: "4.1 ~ 4.30" },
    { month: 5, value: "5.1 ~ 5.31" },
    { month: 6, value: "6.1 ~ 6.30" },
    { month: 7, value: "7.1 ~ 7.31" },
    { month: 8, value: "8.1 ~ 8.31" },
    { month: 9, value: "9.1 ~ 9.30" },
    { month: 10, value: "10.1 ~ 10.31" },
    { month: 11, value: "11.1 ~ 11.30" },
    { month: 12, value: "12.1 ~ 12.31" },
  ];

  //원형 그래프 설정
  const goalAmount = 100; // 목표 금액
  const currentAmount = 85; // 현재 금액
  const chartWidth = 200; // 원하는 가로 크기
  const chartHeight = 40; // 원하는 높이
  return (
    <Container>
      <TopContainer>
        <Text>한달 저축 목표</Text>
        {/* 날짜 선택 */}
        <Select>
          {options.map((item, idx) => (
            <option key={idx} value={item.month}>
              {item.value}
            </option>
          ))}
        </Select>
      </TopContainer>
      {/* 하단 부분 */}
      <BottomContainer>
        {/* 금액 부분 컨테이너 */}
        <CostContainer>
          {/* 목표금액 */}
          <CostTitle>목표금액</CostTitle>
          <CostNum>20000원</CostNum>
          {/* 현재금액 */}
          <CostTitle>현재 금액</CostTitle>
          <CostNum>40000원</CostNum>
        </CostContainer>
        <CircleGraph
          goalAmount={goalAmount}
          currentAmount={currentAmount}
          chartHeight={chartHeight}
          chartWidth={chartWidth}
        />
      </BottomContainer>
    </Container>
  );
}
//원형 그래프 데이터 예시

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  border-bottom: 1px;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray00};
`;

const Text = styled.a`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.gray07};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray02};
`;

const BottomContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const CostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CostTitle = styled.a`
  color: ${({ theme }) => theme.colors.gray03};
`;
const CostNum = styled.a`
  color: ${({ theme }) => theme.colors.black};
`;
