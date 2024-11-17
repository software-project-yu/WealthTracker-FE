import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";

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
  ]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Layout>
      <ScheduledTitle>결제 예정</ScheduledTitle>
      <ScheduledPaymentsContainer>
        <PaymentList>
          <PaymentHeader>
            <div>결제 예정일</div>
            <div>상호</div>
            <div>상세내역</div>
            <div>마지막 결제</div>
            <div>금액</div>
          </PaymentHeader>
          {payments.map(
            ({ id, date, service, details, lastPayment, amount }) => (
              <PaymentItem key={id}>
                <div>{date}</div>
                <div>{service}</div>
                <div>{details}</div>
                <div>{lastPayment}</div>
                <div>{amount}</div>
                <ActionButtons>
                  <button onClick={() => {}}>수정</button>
                  <button onClick={() => {}}>삭제</button>
                </ActionButtons>
              </PaymentItem>
            )
          )}
          <AddPaymentButton onClick={openModal}>작성하기</AddPaymentButton>
        </PaymentList>
        {isModalOpen && <PaymentModal closeModal={closeModal} />}
      </ScheduledPaymentsContainer>
    </Layout>
  );
}

const ScheduledPaymentsContainer = styled.div`
  width: 1104px
  height: 880px
  margin: 20px auto;
  top: 164px;
  left: 304px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 20px 25px rgba(76, 103, 100, 0.1);
  background-color: #fff;
  gap: 16px;
  opacity: 0px;
`;

const ScheduledTitle = styled.h3`
  width: 100px;
  height: 32px;
  top: 104px;
  left: 304px;
  gap: 0px;
  opacity: 0px;
  font-family: Pretendard;
  font-size: 22px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const PaymentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaymentHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  color: #666666;
  text-align: center;
`;

const PaymentItem = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  color: #333333;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-around;
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
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
  &:hover {
    background-color: #2563eb;
  }
`;

const PaymentModal = ({ closeModal }) => {
  return (
    <ModalBackground onClick={closeModal}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        <h3>결제 예정일</h3>
        <form>
          <label>결제 예정일</label>
          <input type="date" name="date" />
          <label>상호</label>
          <input
            type="text"
            name="service"
            placeholder="브랜드 또는 회사명을 입력해 주세요."
          />
          <label>상세내역</label>
          <input
            type="text"
            name="details"
            placeholder="정기 구독 등과 같은 자세한 내용을 입력해 주세요."
          />
          <label>마지막 결제</label>
          <input type="date" name="lastPayment" />
          <label>금액</label>
          <input
            type="text"
            name="amount"
            placeholder="금액이 어느 정도 인가요?"
          />
          <SaveButton type="button">저장</SaveButton>
        </form>
      </Modal>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  width: 100%;
`;
