import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GoalModal = ({ date, onClose, onSubmit }) => {
  const [goal, setGoal] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const fixedTargetId = 1; // targetId를 1로 고정

  useEffect(() => {
    if (date) {
      try {
        setFormattedDate(date.toISOString().split("T")[0]);
      } catch (error) {
        console.error("날짜 변환 오류:", error);
        setFormattedDate("날짜 오류");
      }
    }
  }, [date]);

  const handleSubmit = async () => {
    if (!goal || isNaN(parseFloat(goal)) || parseFloat(goal) <= 0) {
      alert("유효한 금액을 입력해주세요.");
      return;
    }

    const requestBody = JSON.stringify({
      date: formattedDate,
      amount: parseFloat(goal),
    });

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/target/savings/${fixedTargetId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
          body: requestBody,
        }
      );

      const responseText = await response.text();

      if (!response.ok) {
        console.error(
          `서버 응답 실패: ${response.status} ${response.statusText}`
        );
        console.error("서버 응답 내용:", responseText);
        alert("저축 금액 설정에 실패했습니다.");
        return;
      }

      console.log("서버 응답 내용:", responseText);

      if (responseText) {
        const result = JSON.parse(responseText);
        console.log("저축 금액이 성공적으로 설정되었습니다.", result);
        onSubmit(goal);
        onClose();
      } else {
        console.warn("응답 본문이 비어 있습니다.");
        onSubmit(goal);
        onClose();
      }
    } catch (error) {
      console.error("저축 금액 설정 실패:", error);
      alert("저축 금액 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>저축 금액</Title>
        <DateText>{formattedDate}</DateText> {/* 날짜 표시 */}
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

const DateText = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
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
`;

export default GoalModal;
