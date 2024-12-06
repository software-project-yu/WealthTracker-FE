import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api/api"; // api.js에서 default로 export 했으므로 default import 사용

const GoalModal = ({ date, onClose, onSubmit }) => {
  const [goal, setGoal] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const fixedTargetId = 1; // targetId를 1로 고정

  useEffect(() => {
    if (date) {
      // 날짜를 YYYY-MM-DD 형식으로 포맷팅
      const offsetDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      setFormattedDate(offsetDate.toISOString().split("T")[0]);
    }
  }, [date]);

  const handleSubmit = async () => {
    const goalAmount = parseFloat(goal);

    // goalAmount가 유효한 숫자인지 확인, 0도 유효하게 처리
    if (isNaN(goalAmount) || goalAmount < 0) {
      alert("유효한 금액을 입력해주세요.");
      return;
    }

    const requestBody = {
      date: formattedDate,
      amount: Number(goalAmount),
    };

    try {
      const response = await api.post(
        `/api/target/savings/${fixedTargetId}`,
        requestBody
      );

      // 응답 본문 처리 (결과 출력)
      const result = response.data; // 서버에서 응답 받은 데이터
      console.log("저축 금액 설정 성공:", result);

      onSubmit(goalAmount); // goalAmount가 0일 때도 호출하여 상태를 갱신

      onClose();
    } catch (error) {
      alert("저축 금액 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>저축 금액</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <DateText>{formattedDate}</DateText> {/* 날짜 표시 */}
        <Input
          type="text"
          inputMode="numeric"
          placeholder="저축 금액을 입력하세요"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <ButtonWrapper>
          <Button onClick={handleSubmit}>저장</Button>
        </ButtonWrapper>
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
  justify-content: center; // 수평, 수직 중앙 정렬
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center; /* Title을 가운데 정렬 */
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin-left: 25px;
  text-align: center; /* 제목을 가운데 정렬 */
  flex-grow: 1; /* Title이 가능한 공간을 차지하도록 설정 */
`;

const CloseButton = styled.button`
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
  text-align: center; // 날짜 텍스트를 가운데 정렬
`;

const Input = styled.input`
  margin: 10px auto;
  display: block;
  padding: 10px;
  border: 1px solid #ccc;
  width: 250px;
  border-radius: 8px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

export default GoalModal;
