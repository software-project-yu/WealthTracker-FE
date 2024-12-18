import styled from "styled-components";
import useFetchData from "../../hooks/useFetch";
import Error from "../common/Error";
import LoadingSpinners from "../common/LoadingSpinners";

export default function PaymentScheduled() {
  //월 리스트
  const monthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { data, isLoading, error } = useFetchData("/api/payment/recent");
  //데이터 날짜 포맷
  const dateFormat = (date) => {
    //string -> date Format
    const paymentDate = new Date(date);

    const convertMonth = monthName[paymentDate.getMonth()];
    const convertDay = paymentDate.getDate();
    return { convertMonth, convertDay };
  };
  const isValidData = Array.isArray(data) && data.length > 0;
  if (error) return <Error />;
  if (isLoading) return <LoadingSpinners />;
  return (
    <Container>
      {!isValidData ? (
        <NullText>결제예정 내역이 없습니다.</NullText>
      ) : (
        data.map((item) => {

          const { convertMonth, convertDay } = dateFormat(item?.dueDate);
          return (
            <ContentContainer key={item.paymentId}>
              <LeftBox>
                <MonthText>{convertMonth}</MonthText>
                <DayText>{convertDay}</DayText>
              </LeftBox>
              <CenterBox>
                <Text>{item.tradeName}</Text>
                <Text>{item.paymentDetail}</Text>
                <DateText>{item.lastPayment.replaceAll("-", ".")}</DateText>
              </CenterBox>
              <RightBox>{item.cost.toLocaleString("ko-KR")}원</RightBox>
            </ContentContainer>
          );
        })
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const ContentContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray00};
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;

  &:last-child {
    border-bottom: none;
  }
`;
const LeftBox = styled.div`
  border-radius: 0.5rem;
  width: 2rem;
  background-color: ${({ theme }) => theme.colors.gray10};
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MonthText = styled.a`
  color: ${({ theme }) => theme.colors.gray06};
  font-size: 1rem;
`;
const DayText = styled.a`
  font-size: 2rem;
  font-weight: 800;
`;
const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 1rem 0;
  gap: 0.5rem;
`;
const Text = styled.a`
  font-size: 1rem;
`;
const DateText = styled.a`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray06};
`;
const RightBox = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray00};
  border-radius: 0.5rem;
  height: fit-content;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NullText = styled.a`
  font-size: 1.5rem;
  font-weight: 700;
`;
