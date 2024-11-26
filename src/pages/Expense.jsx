import Layout from "../components/Layout";
import DailyGraph from "../components/DailyGraph";
import styled from "styled-components";

export default function Expense() {
  const dailyData = [
    { dayNum: 26, costNum: 12000 },
    { dayNum: 27, costNum: 15000 },
    { dayNum: 28, costNum: 13000 },
    { dayNum: 29, costNum: 10000 },
    { dayNum: 30, costNum: 11000 },
    { dayNum: 31, costNum: 14000 },
    { dayNum: 1, costNum: 16000 },
    { dayNum: 2, costNum: 9000 },
    { dayNum: 3, costNum: 12000 },
    { dayNum: 4, costNum: 17000 },
    { dayNum: 5, costNum: 13000 },
    { dayNum: 6, costNum: 10000 },
    { dayNum: 7, costNum: 100000 },
    { dayNum: 8, costNum: 115000 },
  ];

  const expenseData = [
    {
      category: "납부",
      thisMonth: 250000,
      lastMonth: 200000,
      details: [
        { subCategory: "월세", amount: 200000, date: "2024.11.24" },
        { subCategory: "수도세", amount: 50000, date: "2024.11.24" },
      ],
    },
    {
      category: "식비",
      thisMonth: 300000,
      lastMonth: 270000,
      details: [
        { subCategory: "외식", amount: 180000, date: "2024.11.24" },
        { subCategory: "마트", amount: 120000, date: "2024.11.24" },
      ],
    },
    {
      category: "교통",
      thisMonth: 200000,
      lastMonth: 220000,
      details: [
        { subCategory: "대중교통", amount: 100000, date: "2024.11.24" },
        { subCategory: "택시", amount: 100000, date: "2024.11.24" },
      ],
    },
    {
      category: "오락",
      thisMonth: 150000,
      lastMonth: 180000,
      details: [
        { subCategory: "영화", amount: 80000, date: "2024.11.24" },
        { subCategory: "게임", amount: 70000, date: "2024.11.24" },
      ],
    },
    {
      category: "쇼핑",
      thisMonth: 400000,
      lastMonth: 350000,
      details: [
        { subCategory: "의류", amount: 250000, date: "2024.11.24" },
        { subCategory: "가전", amount: 150000, date: "2024.11.24" },
      ],
    },
    {
      category: "기타",
      thisMonth: 100000,
      lastMonth: 100000,
      details: [
        { subCategory: "기부", amount: 50000, date: "2024.11.24" },
        { subCategory: "기타 비용", amount: 50000, date: "2024.11.24" },
      ],
    },
  ];

  const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0) return 100;
    const difference = thisMonth - lastMonth;
    return ((difference / lastMonth) * 100).toFixed(1);
  };

  const getChangeType = (thisMonth, lastMonth) => {
    if (thisMonth > lastMonth) return "Up";
    if (thisMonth < lastMonth) return "Down";
    return "Flat";
  };

  return (
    <Layout>
      <PageTitle>소비 분석</PageTitle>
      <Container>
        <Section>
          <GraphWrapper>
            <SectionTitle>주간 분석</SectionTitle>
            <DailyGraph data={dailyData} />
          </GraphWrapper>
        </Section>

        <Section>
          <SectionTitle2>비용 내역</SectionTitle2>
          <CardContainer>
            {expenseData.map((expense, index) => {
              const percentage = calculatePercentage(
                expense.thisMonth,
                expense.lastMonth
              );
              const changeType = getChangeType(
                expense.thisMonth,
                expense.lastMonth
              );

              return (
                <ExpenseCard key={index}>
                  <CardHeader>
                    <Category>{expense.category}</Category>
                    <Change change={changeType}>
                      {percentage}% {changeType}
                      <ComparisonText>지난달 대비</ComparisonText>
                    </Change>
                  </CardHeader>
                  <TotalAmount>
                    {expense.thisMonth.toLocaleString()}원
                  </TotalAmount>
                  <Details>
                    {expense.details.map((detail, idx) => (
                      <DetailRow key={idx}>
                        <DetailCategory>{detail.subCategory}</DetailCategory>
                        <DetailAmount>
                          {detail.amount.toLocaleString()}원
                        </DetailAmount>
                        <DetailDate>{detail.date}</DetailDate>
                      </DetailRow>
                    ))}
                  </Details>
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
  gap: 0px;
  opacity: 0px;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  align -item:center;
  margin-left:20px;
  margin-top:10px;
`;

const Container = styled.div`
  padding: 16px 32px;
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
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  width: 100px;
  height: 32px;
  top: 168px;
  left: 334px;
  gap: 0px;
  opacity: 0px;
  margin-left: 20px;
  margin-top: -10px;
`;

const SectionTitle2 = styled.h2`
  width: 102px;
  height: 32px;
  top: 453px;
  left: 312px;
  gap: 0px;
  opacity: 0px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 10px;
`;
const GraphWrapper = styled.div`
  max-width: 1104px;
  height: 296px;
  background: rgba(255, 255, 255, 1);
  align-items: center;
  justify-content: center;
  margin: -30px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  top: 161px;
  left: 312px;
  padding: 24px 0px 0px 0px;
  gap: 16px;
  border-radius: 8px 0px 0px 0px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  gap: 16px; /* 카드 간격 */
  max-width: 100%; /* 그리드가 컨테이너 크기를 넘지 않도록 설정 */
  overflow: hidden;
`;

const ExpenseCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  margin: -2px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
`;

const CardHeader = styled.div`
  padding: 1rem;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Category = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const TotalAmount = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
`;

const Change = styled.div`
  color: ${(props) =>
    props.change === "Up" ? "red" : props.change === "Down" ? "blue" : "gray"};
  font-weight: bold;
  font-size: 0.9rem;
  text-align: right;
`;

const Details = styled.div`
  padding: 1rem;
  background: #fff; /* 하얀 배경 */
  border-top: 1px solid #ddd; /* 상단과 구분선 */
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 세로 가운데 정렬 */
  margin-bottom: 0.5rem;
  padding: 0.5rem 0; /* 세로 패딩 추가 */
  border-bottom: 1px solid #eee; /* 항목 구분선 */
`;

const DetailCategory = styled.div`
  font-size: 0.9rem;
  color: #555;
  flex: 1; /* 왼쪽 정렬 유지 */
`;

const DetailAmount = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
  text-align: right;
  flex: 1; /* 가운데 정렬 */
`;

const DetailDate = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-align: right; /* 오른쪽 정렬 */
  margin-left: 1rem; /* 금액과의 간격 추가 */
  flex: 1; /* 오른쪽으로 공간 할당 */
`;

const ComparisonText = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-top: 0.5rem;
  margin: 0px;
  padding: 0px;
`;
