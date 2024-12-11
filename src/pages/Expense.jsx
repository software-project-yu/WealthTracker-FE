import Layout from "../components/common/Layout";
import DailyGraph from "../components/common/DailyGraph";
import styled from "styled-components";
import { useState, useEffect } from "react";
import HousingIcon from "../assets/images/categoryIMG/Housing.png";
import FoodIcon from "../assets/images/categoryIMG/Food.png";
import TransportIcon from "../assets/images/categoryIMG/Transport.png";
import GameIcon from "../assets/images/categoryIMG/Game.png";
import ShoppingIcon from "../assets/images/categoryIMG/Shopping.png";
import HousingIcon2 from "../assets/images/categoryIMG/Housing2.png";
import { fetchDailyData, fetchExpenseData } from '../api/expenseAPI';

export default function Expense() {
  const [dailyData, setDailyData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyResponse, expenseResponse] = await Promise.all([
          fetchDailyData(),
          fetchExpenseData()
        ]);
        
        const formattedDailyData = dailyResponse.map(item => ({
          dayNum: item.dayNum,
          costNum: item.costSum
        }));
        
        setDailyData(formattedDailyData);
        setExpenseData(expenseResponse);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <PageTitle>소비 분석</PageTitle>
      <Container>
        <Section>
          <SectionTitle>주간 분석</SectionTitle>
          <GraphWrapper>
            <DailyGraph data={dailyData} />
          </GraphWrapper>
        </Section>

        <Section>
          <SectionTitle2>비용 내역</SectionTitle2>
          <CardContainer>
            {expenseData.map((expense) => {
              const icons = {
                납부: HousingIcon,
                식비: FoodIcon,
                교통: TransportIcon,
                오락: GameIcon,
                쇼핑: ShoppingIcon,
                기타: HousingIcon2,
              };
              const icon = icons[expense.categoryName];

              return (
                <ExpenseCard 
                  key={`expense-${expense.categoryName}-${expense.amount}-${Math.random()}`}
                  $hasDetails={expense.expendList?.length > 0}
                >
                  <CardHeader>
                    <CategoryWrapper>
                      <IconWrapper>
                        <Icon src={icon} alt={expense.categoryName} />
                      </IconWrapper>
                      <Category>{expense.categoryName}</Category>
                    </CategoryWrapper>
                    <ChangeWrapper $upDown={expense.upOrDown?.toLowerCase()}>
                      <ChangeText>{expense.percent}% {expense.upOrDown}</ChangeText>
                      <ComparisonText>지난달 대비</ComparisonText>
                    </ChangeWrapper>
                  </CardHeader>
                  <TotalAmount>{expense.amount.toLocaleString()}원</TotalAmount>
                  {expense.expendList?.length > 0 && (
                    <Details>
                      {expense.expendList.map((detail) => (
                        <DetailRow 
                          key={`${expense.categoryName}-${detail.expendName}-${Math.random()}`}
                        >
                          <DetailCategory>{detail.expendName}</DetailCategory>
                          <DetailRight>
                            <DetailAmount>
                              {detail.cost.toLocaleString()}원
                            </DetailAmount>
                            <DetailDate>
                              {detail.expendDate.split('T')[0]}
                            </DetailDate>
                          </DetailRight>
                        </DetailRow>
                      ))}
                    </Details>
                  )}
                </ExpenseCard>
              );
            })}
          </CardContainer>
        </Section>
      </Container>
    </Layout>
  );
}

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-left: 20px;
  margin-bottom: 5px;
  margin-top: 20px;
  color: ${({ theme }) => theme.colors.gray03};
`;

const Container = styled.div`
  padding: 20px 30px;
  max-width: 1500px;
  margin-left: 20px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 700;
  line-height: 32px;
  margin-left: 10px;
  margin-top: -10px;
`;

const SectionTitle2 = styled.h2`
  font-size: 24px;
  font-weight: 400;
  margin-left: -42px;
  line-height: 32px;
  margin-top: -25px;
  color: ${({ theme }) => theme.colors.gray03};
  padding: 10px;
`;

const GraphWrapper = styled.div`
  max-width: 1170px;
  height: 220px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 20px 25px rgba(76, 103, 100, 0.1);
  margin: -30px;
  padding: 24px 0;
  border-radius: 8px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-left: -28px;
`;

const ExpenseCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray00};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  margin: -2px;
  box-shadow: 0px 20px 25px rgba(76, 103, 100, 0.1);
  max-width: 385px;
  height: 210px;
  
  ${({ $hasDetails }) =>
    $hasDetails &&
    `
      background: ${({ theme }) => theme.colors.gray09};
      & > div:last-child {
        background: ${({ theme }) => theme.colors.white};
        flex-grow: 1;
      }
    `}
`;

const CardHeader = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.gray09};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: -12px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray10};
  position: relative;
  margin-left: 10px;
  margin-top: 0;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Category = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.gray04};
  margin-left: 10px;
  margin-top: -20px;
`;

const ChangeWrapper = styled.div`
  text-align: right;
  color: ${({ $upDown }) => {
    if ($upDown === 'up') return ({ theme }) => theme.colors.red;
    if ($upDown === 'down') return ({ theme }) => theme.colors.blue;
    return ({ theme }) => theme.colors.gray03;
  }};
`;

const ChangeText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const TotalAmount = styled.div`
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  margin-left: 65px;
  margin-top: -40px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 37px;
  &:nth-child(2) {
    border-bottom: none;
  }
`;

const DetailCategory = styled.div`
  color: ${({ theme }) => theme.colors.black02};
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
`;

const DetailRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DetailAmount = styled.div`
  margin-bottom: 0.2rem;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
`;

const DetailDate = styled.div`
  color: ${({ theme }) => theme.colors.gray04};
  font-size: 14px;
  text-align: right;
`;

const ComparisonText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray06};
  margin-top: 0.5rem;
  margin: 0px;
  padding: 0px;
`;
