import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function GoalModal2({
  isOpen,
  onClose,
  targetAmount,
  setTargetAmount,
  onSave,
  selectedCategory,
  currentExpend, // currentExpend 추가
}) {
  const [newTargetAmount, setNewTargetAmount] = useState(targetAmount);

  useEffect(() => {
    setNewTargetAmount(targetAmount);
  }, [targetAmount]);

  const handleSave = () => {
    if (newTargetAmount && !isNaN(newTargetAmount)) {
      const isCreating = targetAmount === 0; // targetAmount가 0이면 생성, 0이 아니면 수정
      const url = isCreating
        ? `${import.meta.env.VITE_SERVER_URL}/api/category-target/create`
        : `${import.meta.env.VITE_SERVER_URL}/api/category-target/update`;
      const method = isCreating ? "POST" : "PUT";

      const requestBody = JSON.stringify({
        category: selectedCategory,
        targetAmount: parseFloat(newTargetAmount), // 숫자로 변환하여 전달
      });

      console.log("API 요청 URL:", url);
      console.log("API 요청 메소드:", method);
      console.log("API 요청 본문:", requestBody);

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: requestBody,
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              console.error(
                `서버 응답 실패: ${response.status} ${response.statusText}`
              );
              console.error("서버 응답 내용:", text);
              throw new Error(
                `서버 응답 실패: ${response.status} ${response.statusText}`
              );
            });
          }
          return response.json();
        })
        .then((result) => {
          console.log("목표 금액이 성공적으로 저장되었습니다.", result);
          setTargetAmount(result.targetAmount);
          onSave(result.targetAmount);
          onClose();
        })
        .catch((error) => {
          console.error("목표 금액 저장 실패:", error);
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
            <Title>목표 금액</Title>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="목표 금액을 입력하세요"
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
