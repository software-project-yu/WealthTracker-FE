import React, { useState } from "react";
import Layout from "../components/common/Layout";
import CircleGraph from "../components/common/CircleGraph";
import styled from "styled-components";
import Calendar from "../components/Calendar";
import Housing from "../assets/images/categoryIMG/Housing.png";
import Food from "../assets/images/categoryIMG/Food.png";
import Transport from "../assets/images/categoryIMG/Transport.png";
import Game from "../assets/images/categoryIMG/Game.png";
import Shopping from "../assets/images/categoryIMG/Shopping.png";
import Housing2 from "../assets/images/categoryIMG/Housing2.png";
import GoalModal1 from "../components/GoalModal1";

export default function Goals() {
  const categories = [
    { name: "납부", goal: 250000, spent: 280000, icon: Housing },
    { name: "식비", goal: 250000, spent: 220000, icon: Food },
    { name: "교통", goal: 250000, spent: 250000, icon: Transport },
    { name: "오락", goal: 250000, spent: 270000, icon: Game },
    { name: "쇼핑", goal: 250000, spent: 240000, icon: Shopping },
    { name: "기타", goal: 250000, spent: 260000, icon: Housing2 },
  ];

  const monthlyData = {
    1: { goal: 200000, current: 80000 },
    2: { goal: 250000, current: 120000 },
    3: { goal: 300000, current: 180000 },
    4: { goal: 150000, current: 60000 },
    5: { goal: 220000, current: 200000 },
    6: { goal: 180000, current: 120000 },
    7: { goal: 240000, current: 150000 },
    8: { goal: 260000, current: 170000 },
    9: { goal: 300000, current: 270000 },
    10: { goal: 200000, current: 100000 },
    11: { goal: 280000, current: 250000 },
    12: { goal: 320000, current: 300000 },
  };

  const [selectedMonth, setSelectedMonth] = useState(1);
  const { goal, current } = monthlyData[selectedMonth];

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalAmount, setGoalAmount] = useState(200000);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    console.log("저장된 목표 금액:", goalAmount);
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <PageWrapper>
        <Section>
          <SectionTitle>저축 목표</SectionTitle>
          <SavingsGoal>
            <GoalCard>
              <GoalHeader>
                한달 저축 목표
                <Dropdown value={selectedMonth} onChange={handleMonthChange}>
                  {Object.keys(monthlyData).map((month) => (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  ))}
                </Dropdown>
              </GoalHeader>
              <GoalContent>
                <AmountInfo>
                  <AmountRow>
                    <Label>목표 금액</Label>
                    <Amount>{goal.toLocaleString()}원</Amount>
                  </AmountRow>
                  <AmountRow>
                    <Label>현재 금액</Label>
                    <Amount>{current.toLocaleString()}원</Amount>
                  </AmountRow>
                  <Button1 onClick={handleOpenModal}>목표 수정하기</Button1>{" "}
                </AmountInfo>
                <GraphWrapper>
                  <CircleGraph
                    goalAmount={goal}
                    currentAmount={current}
                    width={250}
                    height={110}
                  />
                </GraphWrapper>
              </GoalContent>
            </GoalCard>
            <CalendarWrapper>
              <Calendar />
            </CalendarWrapper>
          </SavingsGoal>
        </Section>

        <Section>
          <SectionTitle>이번 달 지출 목표</SectionTitle>
          <ExpenseGoals>
            {categories.map((category, index) => {
              const difference = category.spent - category.goal;
              const isOverBudget = difference > 0;

              return (
                <GoalCard2 key={index}>
                  <IconWrapper>
                    <Icon src={category.icon} alt={`${category.name} 아이콘`} />
                  </IconWrapper>
                  <CategoryName>{category.name}</CategoryName>
                  <ContentWrapper>
                    <GoalHeader>
                      <StatusText>목표 금액보다</StatusText>
                    </GoalHeader>
                    <GoalText isOverBudget={isOverBudget}>
                      {Math.abs(difference).toLocaleString()}원{" "}
                      {isOverBudget ? "더 썼습니다." : "덜 썼습니다."}
                    </GoalText>
                    <StatusText2>
                      목표 금액: {category.goal.toLocaleString()}원
                    </StatusText2>
                    <Button2 onClick={handleOpenModal}>수정하기</Button2>{" "}
                  </ContentWrapper>
                </GoalCard2>
              );
            })}
          </ExpenseGoals>
        </Section>
        <GoalModal1
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          goalAmount={goalAmount}
          setGoalAmount={setGoalAmount}
          onSave={handleSave}
        />
      </PageWrapper>
    </Layout>
  );
}

const PageWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  margin-bottom: 10px;
`;

const SavingsGoal = styled.div`
  display: flex;
  gap: 20px;
  align-items: stretch;
  flex-wrap: wrap;
`;

const GoalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  font-color: rgba(0, 0, 0, 1);
  margin-left: 15px;
`;

const Dropdown = styled.select`
  padding: 5px 10px;
  border: 1px solid #ccc;
  width: 143px;
  height: 32px;
  top: 176px;
  left: 486px;
  gap: 0px;
  border-radius: 8px;
`;

const GoalCard = styled.div`
  width: 380px;
  height: 296px;
  padding: 24px 16px;
  gap: 16px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const GoalContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 0 8px;
`;

const AmountInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  gap: 8px;
  margin-bottom: 50px;
`;

const GraphWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 150px;
  margin-top: 0;
  padding-right: 8px;
`;

const AmountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.span`
  color: rgba(159, 159, 159, 1);
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  padding: 5px;
`;

const Amount = styled.span`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Button1 = styled.button`
  background: white;
  color: rgba(0, 123, 255, 1);
  border: 1px solid rgba(0, 123, 255, 1);
  cursor: pointer;
  width: 120px;
  height: 32px;
  gap: 10px;
  border-radius: 5px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-top: 20px; /* 위쪽 여백 */
  align-self: center; /* 부모 컨테이너 기준으로 수평 중앙 정렬 */
  position: relative;
  margin-bottom: -20px; /* 아래로 조금 더 당김 */
`;

const Button2 = styled.button`
  background: white;
  cursor: pointer;
  margin-top: 20px;
  color: rgba(0, 123, 255, 1);
  border: 1px solid rgba(0, 123, 255, 1);
  cursor: pointer;
  width: 120px;
  height: 32px;
  gap: 10px;
  border-radius: 5px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const CalendarWrapper = styled.div`
  background: rgba(0, 0, 0, 0);
  width: 10px;
`;

const ExpenseGoals = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const GoalCard2 = styled.div`
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  width: 352px;
  height: 164px;
  background: rgba(255, 255, 255, 1);
  padding: 5px;
  gap: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(210, 210, 210, 0.25);
  margin-top: -110px;
  margin-left: 10px;
  flex-direction: column;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const CategoryName = styled.span`
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-top: -52px; /* 아이콘과의 간격 */
  margin-left: -42px;
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-left: 20px; /* 오른쪽으로 살짝 이동 */
`;

const StatusText2 = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-left: 20px; /* 오른쪽으로 살짝 이동 */
  margin-top: 20px; /* 아래로 살짝 이동 */
`;

const GoalText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isOverBudget ? "red" : "blue")};
  margin-left: 20px; /* 오른쪽으로 살짝 이동 */
`;
