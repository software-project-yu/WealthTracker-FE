import React, { useState } from "react";
import styled from "styled-components";

const GoalModal = ({ date, onClose, onSubmit }) => {
  const [goal, setGoal] = useState("");

  const handleSubmit = () => {
    if (goal) onSubmit(goal);
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>저축 금액</Title>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="저축 금액을 입력하세요"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <Button onClick={handleSubmit}>저장</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

// Styled Components
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

const Input = styled.input`
  margin: 10px auto;
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  width: 250px;
  border-radius: 8px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: #007bff;
  color: white;
  border-radius: 4px;
  width: 192px;
`;

const Title = styled.h3`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-left: -200px;
`;

export default GoalModal;
