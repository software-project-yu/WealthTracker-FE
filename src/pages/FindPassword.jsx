import React, { useState } from "react";
import {
  Wrapper,
  Title,
  Form,
  Button,
} from "../components/Login";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Input = styled.input`
  width: 85%;
  padding: 10px;
  padding-right: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px 0 30px 0;
  background: transparent;
  color: #000;
  outline: none;

  ::placeholder {
    color: #aaa;
  }

  &:focus {
    border: 1px solid black;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
`;
const Findtext = styled.div`
  font-size: 14px;
  color: #919eab;
`;


export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Popup = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

export const PopupButton = styled(Button)`
  margin:20px;
  width:20%;
  padding:20px;
  border: 1px solid #007BFF;
`;
const LoginLink = styled.span`
  font-size: 12px;
  color: #007bff;
  cursor: pointer;
`;

export default function FindPassword() {
const [email, setEmail] = useState("");
const [showCodePopup, setShowCodePopup] = useState(false);
const [showResetPopup, setShowResetPopup] = useState(false);
const [code, setResetCode] = useState("");
const [newPassword, setNewPassword] = useState("");
const [loading, setLoading] = useState(false); // 로딩 상태 추가
const navigate = useNavigate();
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 재설정 코드 요청 API 호출
  const handleRequestCode = async () => {
    if (!email || !validateEmail(email)) {
      alert("유효한 이메일 주소를 입력해주세요!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://3.37.214.150:8080/api/reset-password", {
        email,
      });
      if (response.status === 200) {
        alert("재설정 코드가 이메일로 발송되었습니다.");
        setShowCodePopup(true);
      }
    } catch (error) {
      console.error(error);
      alert("재설정 코드 요청 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 재설정 코드 확인 API 호출
  const handleVerifyCode = async () => {
    if (!code) {
      alert("재설정 코드를 입력해주세요!");
      return;
    }
    console.log("이메일:", email);
  console.log("재설정 코드:", code);
    try {
      setLoading(true);
  
      // axios.get에서 쿼리 파라미터를 전달하는 방식
      const response = await axios.get("http://3.37.214.150:8080/api/verify", {
        params: {
          email,
          code,
        },
      });
  
      if (response.status === 200) {
        alert("코드가 확인되었습니다. 새 비밀번호를 입력하세요.");
        setShowCodePopup(false);
        setShowResetPopup(true);
      }
    } catch (error) {
      console.error("Error during code verification:", error);
      alert("재설정 코드 확인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };
  

  // 비밀번호 재설정 API 호출
  const handleResetPassword = async () => {
    if (!newPassword) {
      alert("새 비밀번호를 입력해주세요!");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("http://3.37.214.150:8080/api/confirm-reset-password", {
        code,
        newPassword,
      });
      if (response.status === 200) {
        alert("비밀번호가 재설정되었습니다!");
        setShowResetPopup(false);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert("비밀번호 재설정 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>WealthTracker</Title>
        <h2>비밀번호를 잊으셨나요?</h2>
        <Findtext>비밀번호 재설정 코드를 받으려면</Findtext>
        <Findtext>이메일 주소를 입력하세요.</Findtext>
        <Form>
          <div>
            <label>이메일 주소</label>
            <Input
              type="email"
              placeholder="yeungnam@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="login"
            type="button"
            onClick={handleRequestCode}
            disabled={loading}
          >
            {loading ? "처리 중..." : "비밀번호 재설정"}
          </Button>
        </Form>
        <LoginLink onClick={() => navigate("/login")}>로그인으로 돌아가기</LoginLink>
      </Wrapper>

      {/* 재설정 코드 팝업 */}
      {showCodePopup && (
        <PopupOverlay>
          <Popup>
            <h3>재설정 코드 입력</h3>
            <Input
              type="text"
              placeholder="재설정 코드를 입력하세요"
              value={code}
              onChange={(e) => setResetCode(e.target.value)}
            />
            <PopupButton onClick={handleVerifyCode} disabled={loading}>
              {loading ? "처리 중..." : "확인"}
            </PopupButton>
            <PopupButton onClick={()=> setShowCodePopup(false)}>취소</PopupButton>
          </Popup>
        </PopupOverlay>
      )}

      {/* 비밀번호 재설정 팝업 */}
      {showResetPopup && (
        <PopupOverlay>
          <Popup>
            <h3>새 비밀번호 입력</h3>
            <Input
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <PopupButton onClick={handleResetPassword} disabled={loading}>
              {loading ? "처리 중..." : "재설정"}
            </PopupButton>
            <PopupButton onClick={()=> setShowResetPopup(false)}>취소</PopupButton>
          </Popup>
        </PopupOverlay>
      )}
    </>
  );
}
export function FindApi(){}