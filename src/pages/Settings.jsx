import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";

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
      </SecurityForm>
      <div>
        <UpdateButton>비밀번호 변경</UpdateButton>
      </div>
    </div>
  );
}

const SettingsContainer = styled.div`
  width: 1104px;
  height: 620 px;
  top: 112px;
  left: 312px;
  padding: 24px 0 0 0;
  gap: 16px;
  border-radius: 8px;
  opacity: 0px;
  box-shadow: 0px 20px 25px 0px rgba(76, 103, 100, 0.1);
  background: rgba(255, 255, 255, 1);
  margin-left: 10px;
  margin-top: 10px;
`;

const TabButtons = styled.div`
  width: 171px;
  height: 42px;
  top: 130px;
  left: 352px;
  gap: 0px;
  justify: space-between;
  opacity: 0px;
  margin-left: 20px;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  background: none;
  transition: all 0.3s ease;
 font-family: Pretendard;
font-size: 20px;
font-weight: 600;
line-height: 32px;
text-align: left;
text-underline-position: from-font;
text-decoration-skip-ink: none;


  

  &:hover {
    color:rgba(0, 123, 255, 1);
    text-decoration: underline;
    text-decoration-color: rgba(0, 123, 255, 1);
        text-decoration-thickness: 2px; /* 클릭 시 밑줄 두께 */
    text-underline-offset: 5px; /* 클릭 시 밑줄 간격 */
    
  }

   &:active,
  &:focus {
    color: rgba(0, 123, 255, 1); /* 클릭 후 텍스트 색상 파란색 */
    text-decoration: underline; /* 클릭 후 밑줄 추가 */
    text-decoration-color: rgba(0, 123, 255, 1); /* 클릭 후 밑줄 파란색 */
        text-decoration-thickness: 2px; /* 클릭 시 밑줄 두께 */
    text-underline-offset: 5px; /* 클릭 시 밑줄 간격 */
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
    margin-left: 20px;
    padding: 10px;
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
    font-family: Pretendard;
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
    margin-left: 45px;
  }
  input {
    width: 100px;
    padding: 8px;
    margin-bottom: 20px;
    margin-left: 40px;
    border: none;
  }
`;

const UpdateButton = styled.button`
  margin-left: 30px;
  margin-bottom: 30px;
  padding: 10px 20px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;
