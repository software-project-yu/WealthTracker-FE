import React from "react";
import styled from "styled-components";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <TabContainer>
      <Tab
        $isActive={activeTab === "전체"}
        onClick={() => setActiveTab("전체")}
        $color="black02"
      >
        전체
      </Tab>
      <Tab
        $isActive={activeTab === "수입"}
        onClick={() => setActiveTab("수입")}
        $color="blue"
      >
        수입
      </Tab>
      <Tab
        $isActive={activeTab === "지출"}
        onClick={() => setActiveTab("지출")}
        $color="red"
      >
        지출
      </Tab>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 36px;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  color: ${({ $isActive, $color, theme }) =>
    $isActive ? theme.colors[$color] : theme.colors.gray03};
  border-bottom: ${({ $isActive, $color, theme }) =>
    $isActive ? `3px solid ${theme.colors[$color]}` : `3px solid transparent`};
  cursor: pointer;

  &:hover {
    color: ${({ $color, theme }) => theme.colors[$color]};
  }
`;