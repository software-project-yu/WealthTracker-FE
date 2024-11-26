import React from "react";
import styled from "styled-components";

const ScheduledModal = ({ closeModal }) => {
  return (
    <ModalBackground onClick={closeModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={closeModal}>✕</CloseButton>
        <form>
          <FormGroup>
            <Label>결제 예정일</Label>
            <Input
              type="text"
              name="date"
              placeholder="결제 예정일이 며칠인가요?"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </FormGroup>
          <FormGroup>
            <Label>상호</Label>
            <Input
              type="text"
              name="service"
              placeholder="브랜드 또는 회사명을 입력해 주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label>상세내역</Label>
            <Input
              type="text"
              name="details"
              placeholder="정기 구독 등과 같은 자세한 내용을 입력해 주세요."
            />
          </FormGroup>
          <FormGroup>
            <Label>마지막 결제</Label>
            <Input
              type="text"
              name="lastPayment"
              placeholder="가장 최근 결제일이 며칠인가요?"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </FormGroup>
          <FormGroup>
            <Label>금액</Label>
            <Input
              type="text"
              name="amount"
              placeholder="금액이 어느 정도 인가요?"
            />
          </FormGroup>
          <SaveButton type="button">저장</SaveButton>
        </form>
      </ModalContent>
    </ModalBackground>
  );
};

export default ScheduledModal;

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

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 10px;
  width: 420px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const SaveButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 12px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  width: 100%;
  text-align: center;
  &:hover {
    background-color: #2563eb;
  }
`;
