import LoadingSpinners from "../common/LoadingSpinners";
import Error from "../common/Error";
import useFetchData from "../../hooks/useFetch";
import styled from "styled-components";
//소비 분석 리포트
export default function ConsumptionReport() {
  const { data, isLoading, error } = useFetchData("/api/feedback");

  //로딩 상태일 때
  if (isLoading) return <LoadingSpinners />;
  //에러 상태 일 때
  if (error) return <Error />;

  const message = data?.message || "";
  const textWithHighlights = message
    .split(/(\d{1,3}(?:,\d{3})*(?:\.\d+)?%?|\d{1,3}(?:,\d{3})*(?:\.\d+)?원)/)
    .filter(Boolean);

  return (
    <TextContainer>
      {textWithHighlights.map((part, index) =>
        part.match(
          /(\d{1,3}(?:,\d{3})*(?:\.\d+)?%?|\d{1,3}(?:,\d{3})*(?:\.\d+)?원)/
        ) ? (
          <HighlightedText key={index}>{part}</HighlightedText>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </TextContainer>
  );
}
const TextContainer = styled.div`
  padding: 1rem;
  line-height: 2;
`;
const HighlightedText = styled.span`
  color: ${({ theme }) => theme.colors.blue};
  font-weight: bold;
`;
