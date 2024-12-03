import Layout from "../components/common/Layout";
import DailyGraph from "../components/common/DailyGraph"; // DailyGraph 사용
import styled from "styled-components";
import { useState, useEffect } from "react";
import HousingIcon from "../assets/images/categoryIMG/Housing.png";
import FoodIcon from "../assets/images/categoryIMG/Food.png";
import TransportIcon from "../assets/images/categoryIMG/Transport.png";
import GameIcon from "../assets/images/categoryIMG/Game.png";
import ShoppingIcon from "../assets/images/categoryIMG/Shopping.png";
import HousingIcon2 from "../assets/images/categoryIMG/Housing2.png";

export default function Expense() {
  const [dailyData, setDailyData] = useState([]); // DailyGraph 데이터 상태
  const [expenseData, setExpenseData] = useState([]); // 비용 내역 데이터 상태

  // dailyData API 호출
  useEffect(() => {
    const fetchDailyData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_SERVER_URL; // Vite 환경 변수
        const token = import.meta.env.VITE_TOKEN; // 토큰 환경 변수

        const response = await fetch(`${apiUrl}/api/expend/expendList/day`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 사용
          },
        });

        if (!response.ok) {
          throw new Error("주간 데이터를 불러오는 데 실패했습니다.");
        }

        const data = await response.json(); // 주간 데이터
        setDailyData(data); // 상태에 저장
      } catch (error) {
        console.error("주간 데이터 API 요청 오류:", error);
      }
    };

    fetchDailyData();
  }, []);

  // expenseData API 호출
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_SERVER_URL; // Vite 환경 변수
        const token = import.meta.env.VITE_TOKEN; // 토큰 환경 변수

        const response = await fetch(`${apiUrl}/api/expend/expendList`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Bearer 토큰 사용
          },
        });

        if (!response.ok) {
          throw new Error("비용 데이터를 불러오는 데 실패했습니다.");
        }

        const data = await response.json(); // 비용 데이터
        setExpenseData(data); // 상태에 저장
      } catch (error) {
        console.error("비용 데이터 API 요청 오류:", error);
      }
    };

    fetchExpenseData();
  }, []);

  return (
    <Layout>
      <PageTitle>소비 분석</PageTitle>
      <Container>
        {/* 주간 분석 섹션 */}
        <Section>
          <SectionTitle>주간 분석</SectionTitle>
          <GraphWrapper>
            <DailyGraph data={dailyData} />{" "}
            {/* DailyGraph 컴포넌트에 데이터 전달 */}
          </GraphWrapper>
        </Section>

        {/* 비용 내역 섹션 */}
        <Section>
          <SectionTitle2>비용 내역</SectionTitle2>
          <CardContainer>
            {expenseData.map((expense, index) => {
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
                  key={index}
                  hasDetails={expense.expendList.length > 0}
                >
                  <CardHeader>
                    <CategoryWrapper>
                      <IconWrapper>
                        <Icon src={icon} alt={expense.categoryName} />
                      </IconWrapper>

                      <Category>{expense.categoryName}</Category>
                    </CategoryWrapper>
                    <Change change={expense.upOrDown}>
                      {expense.percent}% {expense.upOrDown}
                      <ComparisonText>지난달 대비</ComparisonText>
                    </Change>
                  </CardHeader>
                  <TotalAmount>{expense.amount.toLocaleString()}원</TotalAmount>
                  {expense.expendList.length > 0 && (
                    <Details>
                      {expense.expendList.map((detail) => (
                        <DetailRow key={detail.expendID}>
                          {" "}
                          <DetailCategory>{detail.expendName}</DetailCategory>
                          <DetailRight>
                            <DetailAmount>
                              {detail.cost.toLocaleString()}원
                            </DetailAmount>
                            <DetailDate>
                              {detail.expendDate.split("T")[0]}
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
  width: 82px;
  height: 32px;
  top: 112px;
  left: 312px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  margin-left: 20px;
  margin-top: 10px;
  color: rgba(135, 135, 135, 1);
`;

const Container = styled.div`
  padding: 16px 32px;
  margin-top: -20px;
`;

const Section = styled.div`
  margin-bottom: 32px;
  padding: 16px;
`;

const SectionTitle = styled.h2`
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 700;
  line-height: 32px;
  text-align: left;
  margin-left: 20px;
  margin-top: -10px;
`;

const SectionTitle2 = styled.h2`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  margin-top: -25px;
  color: rgba(135, 135, 135, 1);
  padding: 10px;
`;

const GraphWrapper = styled.div`
  max-width: 1104px;
  height: 296px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  margin: -30px;
  padding: 24px 0;
  border-radius: 8px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

const ExpenseCard = styled.div`
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin: -2px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  width: 352px;
  height: 210px;
  ${({ hasDetails }) =>
    hasDetails &&
    `
      background: #f5f5f5;
      
      & > div:last-child {
        background: #fff; 
        flex-grow: 1; 
      }
    `}
`;

const CardHeader = styled.div`
  padding: 1rem;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: -12px;
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
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: rgba(102, 102, 102, 1);
  margin-left: 10px;
  margin-top: -20px;
`;

const TotalAmount = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-left: 65px;
  margin-top: -40px;
  margin-bottom: 10px;
`;

const Change = styled.div`
  color: ${({ change }) => {
    const normalizedChange = change?.toLowerCase().trim();
    if (normalizedChange === "up") return "red";
    if (normalizedChange === "down") return "blue";
    return "gray";
  }};
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
`;

const Details = styled.div`
  padding: 10px;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  height: 37px;
  &:nth-child(2) {
    border-bottom: none;
  }
`;

const DetailCategory = styled.div`
  color: #333;
  flex: 1;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const DetailRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DetailAmount = styled.div`
  margin-bottom: 0.2rem;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const DetailDate = styled.div`
  color: rgba(105, 105, 105, 1);
  font-family: Pretendard;
  font-size: 14px;
  text-align: right;
`;

const ComparisonText = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
  margin: 0px;
  padding: 0px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(210, 210, 210, 0.25);
  position: relative;
  margin-left: 10px;
  margin-top: 0;
`;
