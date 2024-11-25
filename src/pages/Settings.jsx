import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <Layout>
      <SettingsContainer>
        <TabButtons>
          <TabButton
            isActive={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          >
            계정
          </TabButton>
          <TabButton
            isActive={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          >
            보안
          </TabButton>
        </TabButtons>

        <TabContent>
          {activeTab === "account" && <AccountSettings />}
          {activeTab === "security" && <SecuritySettings />}
        </TabContent>
      </SettingsContainer>
    </Layout>
  );
}

function AccountSettings() {
  return (
    <div>
      <ProfileInfo>
        <p>이름</p>
        <InfoBox>홍길동</InfoBox>

        <p>유저이름</p>
        <InfoBox className="info-box">홍길동</InfoBox>

        <p>전화 번호</p>
        <InfoBox className="info-box">010-1234-5678</InfoBox>
      </ProfileInfo>
      <UpdateButton>프로필 수정</UpdateButton>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div>
      <SecurityForm>
        <label>기존 비밀번호</label>
        <input type="password" placeholder="********" />

        <label>새 비밀번호</label>
        <input type="password" placeholder="********" />

        <label>비밀번호 확인</label>
        <input type="password" placeholder="********" />

        <UpdateButton>비밀번호 변경</UpdateButton>
      </SecurityForm>
    </div>
  );
}

// Styled-components
const SettingsContainer = styled.div`
  width: Fixed (1, 104px) px;
  height: Fixed (620px) px;
  top: 112px;
  left: 312px;
  padding: 24px 0px 0px 0px;
  gap: 16px;
  border-radius: 8px 0px 0px 0px;
  opacity: 0px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background: rgba(255, 255, 255, 1);
`;

const TabButtons = styled.div`
  width: Fixed (171px) px;
  height: Hug (42px) px;
  top: 130px;
  left: 352px;
  gap: 0px;
  justify: space-between;
  opacity: 0px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background: none;
  transition: all 0.3s ease;
  

  &:hover {
    color: blue;
    text-decoration: underline;
    text-decoration-color: blue;
  }

   &:active,
  &:focus {
    color: blue; /* 클릭 후 텍스트 색상 파란색 */
    text-decoration: underline; /* 클릭 후 밑줄 추가 */
    text-decoration-color: blue; /* 클릭 후 밑줄 파란색 */
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const ProfileInfo = styled.div`
  p {
    margin-bottom: 10px; /* 각 항목 간 간격을 줍니다 */
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    text-align: left;
    text-decoration-skip-ink: none;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const InfoBox = styled.p`
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  text-align: left;
  color: rgba(153, 157, 163, 1) !important;
  margin-bottom: 10px;
  opacity: 1;
`;

const SecurityForm = styled.form`
  label {
    display: block;
    margin: 10px 0 5px;
    color: #555;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

const UpdateButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;
