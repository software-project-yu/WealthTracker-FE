//소비통계
import styled from "styled-components";
import Graph from "../../components/common/Graph";
import useFetchData from "../../hooks/useFetch";
import Error from "../common/Error";
import LoadingSpinners from "../common/LoadingSpinners";
export default function ConsumptionStatics() {
  const { data, error, isLoading } = useFetchData("/api/expend/graph");

  if (error) return <Error />;
  if (isLoading) return <LoadingSpinners />;

  return (
    <GraphContainer>
      <Graph data={data} />
    </GraphContainer>
  );
}
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
