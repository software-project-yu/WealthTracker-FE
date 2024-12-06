import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function GoalModal2({
  isOpen,
  onClose,
  targetAmount,
  setTargetAmount,
  onSave,
  selectedCategory,
  currentExpend,
}) {
  const [newTargetAmount, setNewTargetAmount] = useState(targetAmount);

  useEffect(() => {
    setNewTargetAmount(targetAmount);
  }, [targetAmount]);

  const handleSave = async () => {
    if (newTargetAmount !== null && !isNaN(newTargetAmount)) {
      const requestBody = JSON.stringify({
        category: selectedCategory,
        targetAmount: parseFloat(newTargetAmount), // 숫자로 변환하여 전달
      });

      console.log("API 요청 본문:", requestBody);

      // 목표가 이미 존재하는 경우는 업데이트 시도
      const updateTarget = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/category-target/update`,
            {
              method: "PUT",
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

          try {
            const result = JSON.parse(responseText);
            console.log("목표 금액 처리 성공:", result);
            setTargetAmount(result.targetAmount);
            onSave(result.targetAmount);
          } catch (error) {
            console.warn("응답이 JSON 형식이 아님:", responseText);
            console.log("응답 내용:", responseText);
            onSave(newTargetAmount);
          }

          onClose();
        } catch (error) {
          console.error("목표 금액 처리 실패:", error);
          alert("저축 금액 설정 중 오류가 발생했습니다.");
        }
      };

      // 목표가 없는 경우는 새로 생성
      const createTarget = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/api/category-target/create`,
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
            // 이미 존재하는 목표라는 응답이 온 경우 업데이트 시도
            if (
              response.status === 400 &&
              responseText.includes("이미 존재하는 목표")
            ) {
              console.log("목표가 이미 존재합니다. 업데이트를 시도합니다.");
              await updateTarget();
              return;
            }
            alert("저축 금액 설정에 실패했습니다.");
            return;
          }

          try {
            const result = JSON.parse(responseText);
            console.log("목표 금액 처리 성공:", result);
            setTargetAmount(result.targetAmount);
            onSave(result.targetAmount);
          } catch (error) {
            console.warn("응답이 JSON 형식이 아님:", responseText);
            console.log("응답 내용:", responseText);
            onSave(newTargetAmount);
          }

          onClose();
        } catch (error) {
          console.error("목표 금액 처리 실패:", error);
          alert("저축 금액 설정 중 오류가 발생했습니다.");
        }
      };

      // 새 목표 생성 시도
      if (targetAmount === 0) {
        await createTarget();
      } else {
        await updateTarget();
      }
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
  margin: 0 auto;
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
