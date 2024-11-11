import React, { useState } from "react";
import Layout from "../components/Layout";
import "./ScheduledPayments.css";

export default function ScheduledPayments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [payments, setPayments] = useState([
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
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrentPayment(null);
  };

  const addOrEditPayment = (newPayment) => {
    if (isEditing && currentPayment) {
      // 수정 모드일 때, 해당 항목 업데이트
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === currentPayment.id
            ? { ...payment, ...newPayment }
            : payment
        )
      );
    } else {
      // 새 항목 추가 모드일 때, 새로운 항목 추가
      setPayments([...payments, { id: payments.length + 1, ...newPayment }]);
    }
    closeModal();
  };

  const editPayment = (payment) => {
    setCurrentPayment(payment);
    setIsEditing(true);
    openModal();
  };

  const deletePayment = (paymentId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      setPayments((prevPayments) =>
        prevPayments.filter((p) => p.id !== paymentId)
      );
    }
  };

  return (
    <Layout>
      <h3 className="scheduled-title">결제 예정</h3>
      <div className="scheduled-payments-container">
        <div className="payment-list">
          <div className="payment-header">
            <div>결제 예정일</div>
            <div>상호</div>
            <div>상세내역</div>
            <div>마지막 결제</div>
            <div>금액</div>
          </div>
          {payments.map(
            ({ id, date, service, details, lastPayment, amount }) => (
              <div key={id} className="payment-item">
                <div>{date}</div>
                <div>{service}</div>
                <div>{details}</div>
                <div>{lastPayment}</div>
                <div>{amount}</div>
                <div className="action-buttons">
                  <button
                    onClick={() =>
                      editPayment({
                        id,
                        date,
                        service,
                        details,
                        lastPayment,
                        amount,
                      })
                    }
                  >
                    수정
                  </button>
                  <button onClick={() => deletePayment(id)}>삭제</button>
                </div>
              </div>
            )
          )}
          <button onClick={openModal} className="add-payment-button">
            작성하기
          </button>
        </div>
        {isModalOpen && (
          <PaymentModal
            closeModal={closeModal}
            addOrEditPayment={addOrEditPayment}
            isEditing={isEditing}
            currentPayment={currentPayment}
          />
        )}
      </div>
    </Layout>
  );
}

const PaymentModal = ({
  closeModal,
  addOrEditPayment,
  isEditing,
  currentPayment,
}) => {
  const [formData, setFormData] = useState(
    currentPayment || {
      date: "",
      service: "",
      details: "",
      lastPayment: "",
      amount: "",
    }
  );

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditPayment(formData);
  };

  return (
    <div className="modal-background">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>
          ✕
        </button>
        <h3>{isEditing ? "결제 예정일 수정" : "결제 예정일"}</h3>
        <form onSubmit={handleSubmit}>
          <label>결제 예정일</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <label>상호</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            placeholder="브랜드 또는 회사명을 입력해 주세요."
            onChange={handleChange}
          />
          <label>상세내역</label>
          <input
            type="text"
            name="details"
            value={formData.details}
            placeholder="정기 구독 등과 같은 자세한 내용을 입력해 주세요."
            onChange={handleChange}
          />
          <label>마지막 결제</label>
          <input
            type="date"
            name="lastPayment"
            value={formData.lastPayment}
            onChange={handleChange}
          />
          <label>금액</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            placeholder="금액이 어느 정도 인가요?"
            onChange={handleChange}
          />
          <button type="submit" className="save-button">
            저장
          </button>
        </form>
      </div>
    </div>
  );
};
