import styled from "styled-components";
import Graph from "../components/Graph";
import Layout from "../components/Layout";
import CircleGraph from "../components/CircleGraph";

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
    </Layout>
  );
}
const Container = styled.div`
  height: 20rem;
  width: 60rem;
`;
