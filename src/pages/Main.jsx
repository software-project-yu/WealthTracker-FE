import styled from "styled-components";
import Graph from "../components/Graph";
import Layout from "../components/Layout";
import CircleGraph from "../components/CircleGraph";
import DailyGraph from "../components/DailyGraph";

export default function Main() {
  //예시 데이터
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
  //원형 그래프 데이터 예시
  const goalAmount = 100; // 목표 금액
  const currentAmount = 85; // 현재 금액
  const chartWidth = 260; // 원하는 가로 크기
  const chartHeight = 120; // 원하는 높이

  //지출 페이지 그래프 데이터 예시
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

  return (
    <Layout>
      <h1>Example</h1>
      <Container>
        <Graph data={data} />
      </Container>
      <CircleGraph
        goalAmount={goalAmount}
        currentAmount={currentAmount}
        width={chartWidth}
        height={chartHeight}
      />
      <Container>
        <DailyGraph data={dailyData} />
      </Container>
    </Layout>
  );
}
const Container = styled.div`
  height: 20rem;
  width: 60rem;
`;
