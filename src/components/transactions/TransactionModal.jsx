import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function TransactionModal({ isOpen, onClose, onSubmit, type, editData }) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    asset: "",
    date: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        description: editData[type === "income" ? "incomeName" : "expendName"] || "",
        amount: editData.cost?.toString() || "",
        category: editData.category || "",
        asset: editData.asset || "",
        date: editData[type === "income" ? "incomeDate" : "expendDate"] || "",
      });
    }
  }, [editData, type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const expenseCategories = [
    { name: "납부", icon: "💰" },
    { name: "식비", icon: "🍕" },
    { name: "교통", icon: "🚌" },
    { name: "오락", icon: "🎮" },
    { name: "쇼핑", icon: "🛍️" },
    { name: "기타", icon: "" },
  ];

  const incomeCategories = [
    { name: "월급", icon: "💰" },
    { name: "용돈", icon: "💵" },
    { name: "기타", icon: "" },
  ];

  const assets = ["현금", "은행", "카드"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({
      ...prev,
      category,
    }));
  };

  const handleAssetSelect = (asset) => {
    setFormData((prev) => ({
      ...prev,
      asset,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.amount || !formData.category || !formData.asset) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.date)) {
      alert("날짜는 YYYY-MM-DD 형식이어야 합니다. 예: 2024-11-28");
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert("금액은 0보다 커야 합니다.");
      return;
    }

    const validCategories = type === "income" ? incomeCategories.map((c) => c.name) : expenseCategories.map((c) => c.name);
    const validAssets = assets;

    if (!validCategories.includes(formData.category)) {
      alert("올바른 카테고리를 선택해주세요.");
      return;
    }

    if (!validAssets.includes(formData.asset)) {
      alert("올바른 자산을 선택해주세요.");
      return;
    }

    const submitData = {
      [type === "income" ? "incomeDate" : "expendDate"]: formData.date,
      cost: Number(formData.amount),
      category: formData.category,
      [type === "income" ? "incomeName" : "expendName"]: formData.description,
      asset: formData.asset,
    };

    if (editData) {
      onSubmit(editData[type === "income" ? "incomeId" : "expendId"], submitData);
    } else {
      onSubmit(submitData);
    }

    setFormData({
      description: "",
      amount: "",
      category: "",
      asset: "",
      date: "",
    });
    onClose();
  };

  const categories = type === "income" ? incomeCategories : expenseCategories;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} type={type}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label>날짜</Label>
            <Input
              name="date"
              type="text"
              placeholder="YYYY-MM-DD"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>금액</Label>
            <Input
              name="amount"
              type="number"
              placeholder="금액을 입력하세요"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label>{type === "income" ? "분류" : "지출 유형"}</Label>
            <ButtonGrid>
              {categories.map((category) => (
                <CategoryButton
                  key={category.name}
                  type="button"
                  $active={formData.category === category.name}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {category.icon} {category.name}
                </CategoryButton>
              ))}
            </ButtonGrid>
          </div>
          <div>
            <Label>자산</Label>
            <ButtonGrid>
              {assets.map((asset) => (
                <CategoryButton
                  key={asset}
                  type="button"
                  $active={formData.asset === asset}
                  onClick={() => handleAssetSelect(asset)}
                >
                  {asset}
                </CategoryButton>
              ))}
            </ButtonGrid>
          </div>
          <div>
            <Label>내용</Label>
            <Input
              name="description"
              placeholder="상세 내용을 작성해 주세요"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <SaveButton type="submit">
            {editData ? "수정하기" : "저장하기"}
          </SaveButton>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
}

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
  z-index: 10;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 60px;
  width: 350px;
  height: ${({ type }) => (type === "income" ? "550px" : "620px")};
  position: relative;
  z-index: 11;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  font-size: 38px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray05};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const Label = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.gray02};
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray02};
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const CategoryButton = styled.button`
  padding: 12px;
  height: 48px;
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.gray02};
  border-radius: 8px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.white};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.gray02};
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gray04};
  }
`;

const SaveButton = styled.button`
  width: 180px;
  height: 45px;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;