import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import ScheduledModal from "../components/ScheduledModal";

export default function ScheduledPayments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payments] = useState([
    {
      id: 1,
      date: "2024-05-15",
      service: "넷플릭스",
      details: "스탠다드 멤버십",
      lastPayment: "2024-05-15",
      amount: "13,500원",
    },
    {
      id: 2,
      date: "2024-06-20",
      service: "유튜브 프리미엄",
      details: "프리미엄 멤버십",
      lastPayment: "2024-06-20",
      amount: "11,000원",
    },
  ]);

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

  const dateFormat = (date) => {
    const paymentDate = new Date(date);
    const convertMonth = monthName[paymentDate.getMonth()];
    const convertDay = paymentDate.getDate();
    return { convertMonth, convertDay };
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <ScheduledTitle>결제 예정</ScheduledTitle>
      <ScheduledPaymentsContainer>
        <PaymentHeader>
          <div>결제 예정일</div>
          <div>상호</div>
          <div>상세내역</div>
          <div>마지막 결제</div>
          <div>금액</div>
          <div>편집</div>
        </PaymentHeader>

        {payments.map((payment) => {
          const { id, date, service, details, lastPayment, amount } = payment;
          const { convertMonth, convertDay } = dateFormat(date);

          return (
            <PaymentItem key={id}>
              <LeftBox>
                <MonthText>{convertMonth}</MonthText>
                <DayText>{convertDay}</DayText>
              </LeftBox>
              <div>{service}</div>
              <div>{details}</div>
              <div>{lastPayment}</div>
              <div>{amount}</div>
              <ActionButtons>
                <button onClick={() => {}}>수정</button>
                <button onClick={() => {}}>삭제</button>
              </ActionButtons>
            </PaymentItem>
          );
        })}

        <AddPaymentButton onClick={openModal}>작성하기</AddPaymentButton>

        {isModalOpen && <ScheduledModal closeModal={closeModal} />}
      </ScheduledPaymentsContainer>
    </Layout>
  );
}

const ScheduledPaymentsContainer = styled.div`
  width: 1104px;
  height: 800px;
  margin-left: 15px;
  margin-top: 15px;
  top: 164px;
  left: 304px;
  padding: 24px 0px 0px 0px;
  gap: 16px;
  border-radius: 8px;
  opacity: 0px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
`;

const ScheduledTitle = styled.h3`
  margin-left: 15px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const PaymentHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  color: #666666;
  text-align: center;
`;

const PaymentItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: #f3f4f6;
  margin: 0 auto;
`;

const MonthText = styled.div`
  font-size: 14px;
  color: #666666;
`;

const DayText = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;

  button {
    padding: 5px 10px;
    cursor: pointer;
    background-color: #f3f4f6;
    border: none;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #ddd;
  }
`;

const AddPaymentButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 20px;
  width: 96px;
  height: 40px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  position: absolute;
  bottom: -100px; /* 아래쪽 여백 */
  right: 70px; /* 오른쪽 여백 */
`;
