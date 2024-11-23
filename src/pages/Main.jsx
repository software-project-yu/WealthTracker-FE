import styled from "styled-components";
import Layout from "../components/common/Layout";
import Logo from "../assets/images/Logo.png";
import SavingsGoal from "../components/main/SavingsGoal";
import ConsumptionReport from "../components/main/ConsumptionReport";
import CurrentConsumptionList from "../components/main/CurrentConsumptionList";
import PaymentScheduled from "../components/main/PaymentScheduled";
import ConsumptionStatics from "../components/main/ConsumptionStatics";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function Main() {
  const nav = useNavigate();
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
          <TopContainer>
            <Title>결제 예정</Title>
            <PlusContainer onClick={() => nav("/ScheduledPayments")}>
              <PlusText>더 보기</PlusText>
              <MdArrowForwardIos size={12.8} color="#878787" />
            </PlusContainer>
          </TopContainer>
          <Content>
            <PaymentScheduled />
          </Content>
        </div>
        <ConsumptionContainer>
          <Title>소비 통계</Title>
          <Content>
            <ConsumptionStatics />
          </Content>
        </ConsumptionContainer>
        <ConsumptionReportContainer>
          <Title>소비 분석 리포트</Title>
          <Content>
            <ConsumptionReport></ConsumptionReport>
          </Content>
        </ConsumptionReportContainer>
        <RecentTransactionReportContainer>
          <TopContainer>
            <Title>최근 거래 내역</Title>
            <PlusContainer onClick={() => nav("/Transactions")}>
              <PlusText>더 보기</PlusText>
              <MdArrowForwardIos size={12.8} color="#878787" />
            </PlusContainer>
          </TopContainer>
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
  height: 100%;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray06};
  padding: 0.5rem;
  flex-direction: start;
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
  @media (max-width: 1350px) {
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

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const PlusContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  gap: 0 0.5rem;
`;
const PlusText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray06};
`;
