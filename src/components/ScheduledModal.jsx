import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ScheduledModal = ({ closeModal, editPayment, onSave }) => {
  const [formData, setFormData] = useState({
    date: "",
    service: "",
    details: "",
    lastPayment: "",
    amount: "",
  });

  useEffect(() => {
    if (editPayment) {
      setFormData({
        date: editPayment.dueDate || "",
        service: editPayment.tradeName || "",
        details: editPayment.paymentDetail || "",
        lastPayment: editPayment.lastPayment || "",
        amount: editPayment.cost ? editPayment.cost.toString() : "", // 쉼표 없는 숫자
      });
    } else {
      setFormData({
        date: "",
        service: "",
        details: "",
        lastPayment: "",
        amount: "",
      });
    }
  }, [editPayment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 날짜 형식 검증
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!formData.date.match(dateRegex) || !formData.lastPayment.match(dateRegex)) {
      alert("날짜 형식은 YYYY-MM-DD여야 합니다.");
      return;
    }

    // 금액 변환 및 검증
    const sanitizedAmount = formData.amount.replace(/[^0-9]/g, "");
    if (!sanitizedAmount || Number(sanitizedAmount) <= 0) {
      alert("유효한 금액을 입력하세요.");
      return;
    }

    // 제출 데이터 구성
    const submitData = {
      paymentDetail: formData.details,
      dueDate: formData.date,
      lastPayment: formData.lastPayment,
      cost: Number(sanitizedAmount),
      tradeName: formData.service,
    };

    onSave(submitData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <ModalOverlay onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>결제 예정일</ModalTitle>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>결제 예정일이 며칠인가요?</Label>
            <Input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
            />
          </FormGroup>
          <FormGroup>
            <Label>상호</Label>
            <Input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="브랜드 또는 회사명을 입력해 주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label>상세내역</Label>
            <Input
              type="text"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="정기 구독 등과 같은 자세한 내용을 입력해 주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label>마지막 결제</Label>
            <Input
              type="text"
              name="lastPayment"
              value={formData.lastPayment}
              onChange={handleChange}
              placeholder="YYYY-MM-DD"
            />
          </FormGroup>
          <FormGroup>
            <Label>금액</Label>
            <Input
              type="text"
              name="amount"
              value={formData.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              onChange={handleChange}
              placeholder="금액을 입력하세요."
            />
          </FormGroup>
          <SaveButton type="submit">저장</SaveButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 32px;
  border-radius: 12px;
  width: 420px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black02};
  margin-bottom: 32px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.gray03};
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black02};
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.gray00};
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray03};
    font-style: italic;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue};
  }
`;

const SaveButton = styled.button`
  width: 100%;
  height: 48px;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default ScheduledModal;