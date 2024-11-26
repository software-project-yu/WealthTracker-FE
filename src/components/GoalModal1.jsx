import React from "react";
import styled from "styled-components";

const GoalModal1 = ({ isOpen, onClose, goalAmount, setGoalAmount, onSave }) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setGoalAmount(e.target.value);
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>목표 금액</Title>
        </ModalHeader>
        <ModalBody>
          <Input
            type="text"
            inputMode="numeric"
            placeholder="목표 금액을 입력하세요"
            onChange={(e) => setGoalAmount(e.target.value)}
          />
          <SaveButton onClick={onSave}>저장</SaveButton>
        </ModalBody>
      </ModalContent>
    </ModalWrapper>
  );
};

export default GoalModal1;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 32px;
  cursor: pointer;
  color: #333;
  background: none;
  border: none;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  margin: 10px auto;
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  width: 250px;
  border-radius: 8px;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: #007bff;
  color: white;
  border-radius: 4px;
  width: 192px;
  margin-left: 40px;
`;

const Title = styled.h3`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: -20px;
  margin-left: -135px;
`;
