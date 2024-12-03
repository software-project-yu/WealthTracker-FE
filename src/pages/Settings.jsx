import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

export default function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setName] = useState(""); // 이름 상태
  const [nickName, setNickName] = useState(""); // 닉네임 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const fetchUserInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setName(response.data.name || "이름 없음");
      setNickName(response.data.nickName || "닉네임 없음");
    } catch (err) {
      setError("사용자 정보를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (newName, newNickName) => {
    const nicknameRegex = /[a-zA-Z0-9]{6,15}$/;
    if (!nicknameRegex.test(newNickName)) {
      alert("닉네임은 6~15자의 영문, 숫자만 입력 가능합니다.");
      return;
    }
    try {
      const response = await axios.put(
        `${API_URL}/api/profile-update`,
        { name: newName, nickName: newNickName },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setName(response.data.name);
      setNickName(response.data.nickName);
      alert("프로필이 성공적으로 수정되었습니다.");
      window.location.reload();
    } catch (err) {
      alert("프로필 수정에 실패했습니다.");
    }
  };

  useEffect(() => {
    if (activeTab === "account") {
      fetchUserInfo();
    }
  }, [activeTab]);

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
          {activeTab === "account" && (
            <AccountSettings
              name={name}
              nickName={nickName}
              loading={loading}
              error={error}
              onEdit={() => setIsModalOpen(true)} // 모달 열기
            />
          )}
          {activeTab === "security" && <SecuritySettings />}
        </TabContent>

        {isModalOpen && (
          <EditProfileModal
            currentName={name}
            currentNickName={nickName}
            onClose={() => setIsModalOpen(false)}
            onSave={updateUserInfo}
          />
        )}
      </SettingsContainer>
    </Layout>
  );
}

function AccountSettings({ name, nickName, loading, error, onEdit }) {
  if (loading) return <p>로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <ProfileInfo>
        <p>이름</p>
        <InfoBox>{name}</InfoBox>

        <p>유저이름</p>
        <InfoBox className="info-box">홍길동</InfoBox>
        <p>유저 이름</p>
        <InfoBox>{nickName}</InfoBox>
      </ProfileInfo>
      <UpdateButton onClick={onEdit}>프로필 수정</UpdateButton>
    </div>
  );
}

function EditProfileModal({ currentName, currentNickName, onClose, onSave }) {
  const [newName, setNewName] = useState(currentName);
  const [newNickName, setNewNickName] = useState(currentNickName);

  const handleSave = () => {
    onSave(newName, newNickName);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>프로필 수정</h3>
        <label>이름</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <label>닉네임</label>
        <input
          type="text"
          value={newNickName}
          onChange={(e) => setNewNickName(e.target.value)}
        />
        <ModalActions>
          <button onClick={onClose}>취소</button>
          <button onClick={handleSave}>수정</button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
}

function SecuritySettings() {
  const [confirmPassword, setConfirmPassword] = useState(""); // 기존 비밀번호 상태
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호 상태
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // 새 비밀번호 확인 상태
  const [showEmailPopup, setShowEmailPopup] = useState(false); // 이메일 입력 팝업 상태
  const [showCodePopup, setShowCodePopup] = useState(false); // 재설정 코드 팝업 상태
  const [email, setEmail] = useState(""); // 이메일 입력값 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [code, setCode] = useState(""); // 재설정 코드 상태

  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,15}$/;

  // 비밀번호 변경 처리
  const handlePasswordChange = async () => {
    if (!passwordRegex.test(newPassword)) {
      alert(
        "비밀번호는 8~15자 영문자/숫자/특수문자를 각각 최소 1개 포함해야 합니다."
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const validateResponse = await axios.post(
        `${API_URL}/api/confirm-password`,
        { confirmPassword },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (validateResponse.status === 200) {
        setShowEmailPopup(true); // 이메일 팝업 열기
      }
    } catch (error) {
      alert("현재 비밀번호가 일치하지 않습니다.");
    }
  };

  // 이메일 제출 처리
  const handleSubmitEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 주소를 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/api/reset-password`, {
        email,
      });

      if (response.status === 200) {
        alert("재설정 코드가 이메일로 발송되었습니다.");
        setShowEmailPopup(false); // 이메일 팝업 닫기
        setShowCodePopup(true); // 재설정 코드 팝업 열기
      } else {
        throw new Error("재설정 코드 요청 실패");
      }
    } catch (error) {
      alert("재설정 코드 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 재설정 코드 확인 및 비밀번호 변경
  const handleSubmitResetCodeAndPassword = async () => {
    try {
      const verifyResponse = await axios.get(`${API_URL}/api/verify`, {
        params: { email, code },
      });

      if (verifyResponse.status === 200) {
        alert("코드가 확인되었습니다. 비밀번호를 변경합니다.");

        const resetPasswordResponse = await axios.post(
          `${API_URL}/api/confirm-reset-password`,
          { code, newPassword }
        );

        if (resetPasswordResponse.status === 200) {
          alert("비밀번호가 성공적으로 변경되었습니다.");
          setShowCodePopup(false); // 코드 팝업 닫기
        } else {
          throw new Error("비밀번호 변경 실패");
        }
      } else {
        throw new Error("코드 확인 실패");
      }
    } catch (error) {
      alert("재설정 코드 확인 실패. 다시 시도 해 주세요");
      setShowCodePopup(false); // 코드 팝업 닫기
    }
  };

  return (
    <div>
      <SecurityForm>
        <label>기존 비밀번호</label>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label>새 비밀번호</label>
        <input
          type="password"
          placeholder="********"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

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
