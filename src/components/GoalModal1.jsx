import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api/api"; 

export default function GoalModal1({
  isOpen,
  onClose,
  targetAmount,
  setTargetAmount,
  onSave,
  targetId,
}) {
  const [newTargetAmount, setNewTargetAmount] = useState(targetAmount);

  useEffect(() => {
    setNewTargetAmount(targetAmount);
  }, [targetAmount]);

  // 현재 월의 첫날과 마지막 날 구하는 함수
  const getFirstAndLastDayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1).toISOString().split("T")[0];
    const lastDay = new Date(year, month + 1, 0).toISOString().split("T")[0];
    return { firstDay, lastDay };
  };

  // 저장 버튼 클릭 시 실행되는 함수
  const handleSave = () => {
    if (newTargetAmount && !isNaN(newTargetAmount)) {
      const today = new Date();
      const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
        today.getFullYear(),
        today.getMonth()
      );

      const requestBody = {
        targetAmount: Number(newTargetAmount, 10), // 숫자형으로 변환
        startDate: firstDay,
        endDate: lastDay,
      };

      console.log("API 요청 본문:", requestBody);

      // api 인스턴스를 사용하여 POST 요청 보내기
      api
        .post("/api/target/create", requestBody)
        .then((response) => {
          console.log(
            "저축 목표 금액이 성공적으로 저장되었습니다.",
            response.data
          );
          setTargetAmount(response.data.targetAmount);
          onSave(response.data.targetAmount); // onSave 콜백 호출
          onClose(); // 저장 성공 시 모달 닫기
        })
        .catch(() => {
          alert("저축 목표 저장에 실패했습니다. 서버 관리자에게 문의해주세요.");
        });
    } else {
      alert("유효한 금액을 입력해주세요.");
    }
  };

  return (
    isOpen && (
      <ModalWrapper>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <Title>저축 목표 금액</Title>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="저축 목표 금액을 입력하세요"
              value={newTargetAmount}
              onChange={(e) => setNewTargetAmount(e.target.value)}
            />
            <SaveButtonWrapper>
              <SaveButton onClick={handleSave}>저장</SaveButton>
            </SaveButtonWrapper>
          </ModalBody>
        </ModalContent>
      </ModalWrapper>
    )
  );
}

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

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CloseButton = styled.button`
  font-size: 32px;
  cursor: pointer;
  color: #333;
  background: none;
  border: none;
`;

const Title = styled.h3`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 600;
  margin: 0 auto; // 중앙 정렬을 위해 변경
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

const SaveButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SaveButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: #007bff;
  color: white;
  border-radius: 4px;
  width: 192px;
`;
