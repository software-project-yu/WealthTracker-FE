import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Wrapper,
  Title,
  Form,
  Button,
  InputWrapper
} from "../components/Login.js";
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios";

const Input = styled.input`
  width: 85%;
  padding: 10px;
  padding-right: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 10px 0;
  background: transparent;
  color: #000;
  outline: none;
  position: relative; /* position relative 추가 */

  ::placeholder {
    color: #aaa;
  }

  &:focus {
    border: 1px solid black;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
`;
const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(0%); /* 버튼이 정확히 중앙에 위치하도록 설정 */
  background: none;
  border: none;
  color: #919eab;
  cursor: pointer;
`;

const ForgotPasswordLink = styled(Link)`
  position: absolute;
  right: 0px;
  top: 5px;
  font-size: 10px;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const CheckboxLabel = styled.label`
  font-size: 12px;
  margin-left: 5px;
`;


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe");
    const savedEmail = localStorage.getItem("email");
    if (savedRememberMe) {
      setRememberMe(true);
      if (savedEmail) {
        setEmail(savedEmail); // 저장된 이메일 복원
      }
    }
  }, []);
  const handleLogin = async () => {
    console.log(`${API_URL}`);
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token); // JWT 토큰 저장
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
          localStorage.setItem("email", email); // 이메일 저장
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
        }
        alert("로그인 성공!");
        navigate("/main"); // 로그인 성공 후 홈 페이지로 이동
      } else {
        alert("로그인 실패: 잘못된 이메일 또는 비밀번호입니다.");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Wrapper>
      <Title>WealthTracker</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputWrapper>
          <label>이메일 주소</label>
          <Input
            type="email"
            placeholder="yeungnam@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper>
          <label>비밀번호</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="비밀번호를 입력해 주세요."
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </PasswordToggle>
          <ForgotPasswordLink to="/findpw">비밀번호를 잊으셨나요?</ForgotPasswordLink>
        </InputWrapper>

        <CheckboxWrapper>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <CheckboxLabel>로그인 정보 저장</CheckboxLabel>
        </CheckboxWrapper>

        <Button className="login" type="button" onClick={handleLogin}>
          로그인
        </Button>
        <Button className="signup" type="button" onClick={() => navigate("/signup")}>
          회원가입 하기
        </Button>
      </Form>
    </Wrapper>
  );
}

export default Login;