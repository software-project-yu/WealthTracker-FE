import React, { useState, useEffect } from "react";
import Layout from "../components/common/Layout";
import SavingsGoal from "../components/main/SavingsGoal";
import styled from "styled-components";
import Calendar from "../components/Calendar";
import Housing from "../assets/images/categoryIMG/Housing.png";
import Food from "../assets/images/categoryIMG/Food.png";
import Transport from "../assets/images/categoryIMG/Transport.png";
import Game from "../assets/images/categoryIMG/Game.png";
import Shopping from "../assets/images/categoryIMG/Shopping.png";
import Housing2 from "../assets/images/categoryIMG/Housing2.png";
import GoalModal2 from "../components/GoalModal2";
import GoalModal1 from "../components/GoalModal1";

export default function Goals() {
  const categories = [
    { name: "납부", apiCategory: "PAYMENT", icon: Housing },
    { name: "식비", apiCategory: "FOOD", icon: Food },
    { name: "교통", apiCategory: "TRANSPORTATION", icon: Transport },
    { name: "오락", apiCategory: "GAME", icon: Game },
    { name: "쇼핑", apiCategory: "SHOPPING", icon: Shopping },
    { name: "기타", apiCategory: "ETC", icon: Housing2 },
  ];

  const [isGoalModal1Open, setIsGoalModal1Open] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [savingsTargetAmount, setSavingsTargetAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0); // 현재 금액 상태 추가
  const [categoryTargets, setCategoryTargets] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    categories.forEach((category) => {
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/category-target/${
          category.apiCategory
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to fetch target for category ${category.apiCategory}`
            );
          }
          return response.json();
        })
        .then((data) => {
          setCategoryTargets((prevTargets) => ({
            ...prevTargets,
            [category.apiCategory]: data,
          }));
        })
        .catch((error) => {
          console.error(
            `Error fetching target for ${category.apiCategory}:`,
            error
          );
        });
    });

    // 저축 목표 가져오기
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/savings-target`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch savings target");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched savings target:", data); // 데이터 확인을 위한 로그 추가
        setSavingsTargetAmount(data.targetAmount);
        setCurrentAmount(data.currentAmount); // 현재 금액 설정
      })
      .catch((error) => {
        console.error("Error fetching savings target:", error);
      });
  }, []);

  const handleSaveTarget = (category, newTargetAmount) => {
    console.log(
      `새로운 목표 금액 저장: ${newTargetAmount} (카테고리: ${category})`
    );
    setCategoryTargets((prevTargets) => ({
      ...prevTargets,
      [category]: {
        ...prevTargets[category],
        targetAmount: newTargetAmount,
      },
    }));
  };

  const handleSaveSavingsTarget = (newTargetAmount) => {
    console.log("새로운 저축 목표 금액 저장:", newTargetAmount);
    setSavingsTargetAmount(newTargetAmount);
  };

  const handleUpdateCurrentAmount = (addedAmount) => {
    setCurrentAmount((prevAmount) => prevAmount + addedAmount);
  };

  const handleOpenGoalModal1 = () => {
    setIsGoalModal1Open(true);
  };

  const handleCloseGoalModal1 = () => {
    setIsGoalModal1Open(false);
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <PageWrapper>
        <Section>
          <SectionTitle>저축 목표</SectionTitle>
          <SavingGoal>
            <GoalCard>
              <GoalContent>
                <GraphWrapper>
                  <SavingsGoal
                    targetAmount={savingsTargetAmount}
                    setTargetAmount={handleSaveSavingsTarget}
                    currentAmount={currentAmount} // 현재 금액 전달
                    setCurrentAmount={handleUpdateCurrentAmount}
                    setTargetId={setTargetId}
                  />
                  <Button1 onClick={handleOpenGoalModal1}>
                    {savingsTargetAmount === 0
                      ? "목표 생성하기"
                      : "목표 수정하기"}
                  </Button1>
                </GraphWrapper>
              </GoalContent>
            </GoalCard>
            <CalendarWrapper>
              <Calendar
                targetId={targetId}
                onSave={handleUpdateCurrentAmount}
              />{" "}
              {/* 저축 금액 업데이트 함수 전달 */}
            </CalendarWrapper>
          </SavingGoal>
        </Section>
        <Section>
          <SectionTitle>이번 달 지출 목표</SectionTitle>
          <ExpenseGoals>
            {categories.map((category, index) => {
              const targetData = categoryTargets[category.apiCategory] || {
                targetAmount: 0,
                currentExpend: 0,
                message: "데이터를 불러오는 중입니다.",
              };
              const difference =
                targetData.currentExpend - targetData.targetAmount;
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
                      목표 금액: {targetData.targetAmount.toLocaleString()}원
                    </StatusText2>
                    <Button2
                      onClick={() => handleOpenModal(category.apiCategory)}
                    >
                      수정하기
                    </Button2>
                  </ContentWrapper>
                </GoalCard2>
              );
            })}
          </ExpenseGoals>
        </Section>
        <GoalModal1
          isOpen={isGoalModal1Open}
          onClose={handleCloseGoalModal1}
          targetAmount={savingsTargetAmount}
          setTargetAmount={handleSaveSavingsTarget}
          onSave={handleSaveSavingsTarget}
          targetId={targetId}
        />
        <GoalModal2
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          targetAmount={categoryTargets[selectedCategory]?.targetAmount || 0}
          setTargetAmount={(newTargetAmount) =>
            handleSaveTarget(selectedCategory, newTargetAmount)
          }
          onSave={(newTargetAmount) =>
            handleSaveTarget(selectedCategory, newTargetAmount)
          }
          selectedCategory={selectedCategory} // 선택된 카테고리 전달
          currentExpend={categoryTargets[selectedCategory]?.currentExpend || 0} // currentExpend 전달
        />
      </PageWrapper>
    </Layout>
  );
}

// Styled Components
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

const SavingGoal = styled.div`
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
  color: rgba(0, 0, 0, 1);
  margin-left: 15px;
`;

const GoalCard = styled.div`
  width: 380px;
  height: 296px;
  padding: 24px 16px;
  gap: 16px;
  border-radius: 8px;
  background: #fff
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

const GraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;
  gap: 10px;
  padding: : 0;
  
`;

const ParentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 버튼을 가로 중앙으로 정렬 */
  position: relative; /* 버튼 위치 지정 가능 */
`;

const Button1 = styled.button`
  background: white;
  color: rgba(0, 123, 255, 1);
  border: 1px solid rgba(0, 123, 255, 1);
  cursor: pointer;
  width: 120px;
  height: 32px;
  border-radius: 5px;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.71px;
  text-align: center;
`;

const Button2 = styled.button`
  background: white;

  cursor: pointer;
  margin-top: 20px;

  color: rgba(0, 123, 255, 1);
  border: 1px solid rgba(0, 123, 255, 1);
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
  line-height: 16
  text-align: left;
  margin-top: -52px;
  margin-left: -42px;
`;

const StatusText = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-left: 20px;
`;

const StatusText2 = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-left: 20px;
  margin-top 20px; /* 아래로 살짝 이동 */
`;

const GoalText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isOverBudget ? "red" : "blue")};
  margin-left: 20px; /* 오른쪽으로 살짝 이동 */
`;
