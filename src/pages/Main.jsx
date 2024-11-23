import styled from "styled-components";
import Graph from "../components/common/Graph";
import Layout from "../components/common/Layout";
import Logo from "../assets/images/Logo.png";
import SavingsGoal from "../components/main/SavingsGoal";
import ConsumptionReport from "../components/main/ConsumptionReport";
import CurrentConsumptionList from "../components/main/CurrentConsumptionList";
export default function Main() {
  //   //예시 데이터
  //실제 구현 시 서버API 통신으로 데이터를 받아옵니다.
  const data = [
    {
      month: 11,
      weekNum: 1,
      thisWeekTotalCost: 20046,
      lastWeekTotalCost: 2120,
    },
    {
      month: 11,
      weekNum: 2,
      thisWeekTotalCost: 11110,
      lastWeekTotalCost: 1120,
    },
    {
      month: 11,
      weekNum: 3,
      thisWeekTotalCost: 12000,
      lastWeekTotalCost: 30069,
    },
    {
      month: 11,
      weekNum: 4,
      thisWeekTotalCost: 22212,
      lastWeekTotalCost: 10022,
    },
    {
      month: 11,
      weekNum: 5,
      thisWeekTotalCost: 12100,
      lastWeekTotalCost: 10000,
    },
  ];

  //   //지출 페이지 그래프 데이터 예시
  //   const dailyData = [
  //     { dayNum: 26, costNum: 12000 },
  //     { dayNum: 27, costNum: 15000 },
  //     { dayNum: 28, costNum: 13000 },
  //     { dayNum: 29, costNum: 10000 },
  //     { dayNum: 30, costNum: 11000 },
  //     { dayNum: 31, costNum: 14000 },
  //     { dayNum: 1, costNum: 16000 },
  //     { dayNum: 2, costNum: 9000 },
  //     { dayNum: 3, costNum: 12000 },
  //     { dayNum: 4, costNum: 17000 },
  //     { dayNum: 5, costNum: 13000 },
  //     { dayNum: 6, costNum: 10000 },
  //     { dayNum: 7, costNum: 100000 },
  //     { dayNum: 8, costNum: 115000 },
  //   ];
  //   return (
  //     <Layout>
  //       <h1>Example</h1>
  //       <Container>
  //         <Graph data={data} />
  //       </Container>
  //       <CircleGraph
  //         goalAmount={goalAmount}
  //         currentAmount={currentAmount}
  //         width={chartWidth}
  //         height={chartHeight}
  //       />
  //       <Container>
  //         <DailyGraph data={dailyData} />
  //       </Container>
  //     </Layout>
  //   );
  // }
  // const Container = styled.div`
  //   height: 20rem;
  //   width: 60rem;
  // `;

  return (
    <Layout>
      <GridContainer>
        <LogoContainer>
          <Title style={{ visibility: "hidden" }}>hidden</Title>
          <Content>
            <Img src={Logo} />
          </Content>
        </LogoContainer>
        <div>
          <Title>저축 목표</Title>
          <Content>
            <SavingsGoal />
          </Content>
        </div>
        <div>
          <Title>결제 예정</Title>
          <Content></Content>
        </div>
        <ConsumptionContainer>
          <Title>소비 통계</Title>
          <Content>
            <GraphContainer>
              <Graph data={data} />
            </GraphContainer>
          </Content>
        </ConsumptionContainer>
        <ConsumptionReportContainer>
          <Title>소비 분석 리포트</Title>
          <Content>
            <ConsumptionReport></ConsumptionReport>
          </Content>
        </ConsumptionReportContainer>
        <RecentTransactionReportContainer>
          <Title>최근 거래 내역</Title>
          <Content>
            <CurrentConsumptionList />
          </Content>
        </RecentTransactionReportContainer>
      </GridContainer>
    </Layout>
  );
}

// 소비통계
const ConsumptionContainer = styled.div`
  grid-area: 2/1/3/3;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// 소비 분석 리포트
const ConsumptionReportContainer = styled.div`
  grid-area: 3/1/3/3;
  display: flex;
  margin-top: 0;
  height: 100%;
`;

// 최근 거래 내역
const RecentTransactionReportContainer = styled.div`
  grid-area: 2/3/4/3;
  display: flex;
  margin-bottom: 0rem;
  height: 100%;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray06};
`;
const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.5rem;
  padding: 0.8rem;
  align-items: center;
  height: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
`;
const Img = styled.img`
  width: auto;
  height: auto;
`;

const LogoContainer = styled.div``;
const GridContainer = styled.div`
  display: grid;
  position: relative;
  z-index: 10;
  width: 100%;
  height: calc(100vh - 10rem);
  margin: 0;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
  > div {
    border-radius: 0.5rem;
    padding: 0 0.8rem;
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
  }
  //반응형 1024px 기준
  @media (max-width: 1024px) {
    height: auto;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1.5rem;
    ${LogoContainer} {
      display: none;
      height: 0;
      padding: 0;
      margin: 0;
    }
    ${ConsumptionContainer},
    ${ConsumptionReportContainer}, 
    ${RecentTransactionReportContainer} {
      grid-area: auto;
    }
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 45rem;
  height: 100%;
  max-height: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
