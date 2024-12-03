import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CircleGraph from "../common/CircleGraph.jsx";
import useFetchData from "../../hooks/useFetch.jsx";
import Error from "../common/Error.jsx";
import LoadingSpinners from "../common/LoadingSpinners.jsx";

export default function SavingsGoal({ targetAmount, setTargetAmount }) {
  const today = new Date().getFullYear();
  const [selectMonth, setSelectMonth] = useState(new Date().getMonth());
  const [currentTargetAmount, setCurrentTargetAmount] = useState(targetAmount);

  const options = [
    { month: 1, value: "1.1 ~ 1.31" },
    { month: 2, value: today % 4 === 0 ? "2.1 ~ 2.29" : "2.1 ~ 2.28" },
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

  const { data, error, isLoading } = useFetchData(
    `/api/target/graph?month=${selectMonth}`
  );

  useEffect(() => {
    if (data) {
      setCurrentTargetAmount(data.targetAmount);
    }
  }, [data]);

  useEffect(() => {
    if (targetAmount) {
      setCurrentTargetAmount(targetAmount);
    }
  }, [targetAmount]);

  const handleSelectMonthChange = (e) => {
    setSelectMonth(e.target.value);
  };

  if (error) return <Error />;
  if (isLoading) return <LoadingSpinners />;

  const currentAmount = data?.nowAmount;
  const chartWidth = 200;
  const chartHeight = 120;

  return (
    <Container>
      <BoxWrapper>
        <TopContainer>
          <Text>한달 저축 목표</Text>
          <Select value={selectMonth || ""} onChange={handleSelectMonthChange}>
            {options.map((item, idx) => (
              <option key={idx} value={item.month}>
                {item.value}
              </option>
            ))}
          </Select>
        </TopContainer>
        <BottomContainer>
          <CostContainer>
            <CostTitle>목표금액</CostTitle>
            <CostNum>
              {currentTargetAmount
                ? currentTargetAmount.toLocaleString() + "원"
                : "0원"}
            </CostNum>
            <CostTitle>현재 금액</CostTitle>
            <CostNum>
              {currentAmount ? currentAmount.toLocaleString() + "원" : "0원"}
            </CostNum>
          </CostContainer>
          <CircleGraph
            goalAmount={currentTargetAmount}
            currentAmount={currentAmount}
            height={chartHeight}
            width={chartWidth}
          />
        </BottomContainer>
      </BoxWrapper>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const BoxWrapper = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray00};
  background-color: #fff;
`;

const Text = styled.a`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;

const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.gray07};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray08};
  height: 1.5rem;
  width: 8rem;
  text-align: left;
`;

const BottomContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  background-color: #fff;
`;

const CostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CostTitle = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray06};
`;

const CostNum = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`;
