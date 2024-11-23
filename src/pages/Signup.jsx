import React, { useState, useEffect } from "react";
import {
  Wrapper,
  Title,
  Form,
  Button,
  OrText,
  InputWrapper
} from "../components/Login";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
  transform: translateY(0%);
  background: none;
  border: none;
  color: #919eab;
  cursor: pointer;
`;

const Timerbutton = styled.button`
width: 100%; /* 너비를 100%로 설정하여 버튼을 입력 필드와 같게 만듦 */  
  padding:10px;
  border: 1px solid #007BFF;
  border-radius: 4px;
  cursor: pointer;
  background-color:transparent;
  color:#007BFF;
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InputWithTimerWrapper = styled.div`
  position: relative; /* Timer 위치를 Input 안으로 이동 */
  display: flex;
  align-items: center;
`;

const Timer = styled.span`
  font-size: 12px;
  color: #E92C2C;
  position: absolute;
  right: 10px; /* Input 내부 우측에 위치 */
  top: 50%;
  transform: translateY(-50%);
`;

const LoginLink = styled.span`
  font-size: 12px;
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
`;

const Alreadacc = styled.h5`
  font-size: 12px;
  color: #919eab;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [certification, setCertification] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(300); // 5분 타이머
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 활성화 상태
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태
  const [buttonLabel, setButtonLabel] = useState("인증번호 받기"); // 버튼 텍스트
  const [isResend, setIsResend] = useState(false); // 인증번호 재발급 여부

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.get("http://3.37.214.150:8080/api/verify", {
        params: { email }, // GET 요청의 쿼리 파라미터
      });
      if (response.status === 200) {
        alert("인증번호가 발송되었습니다.");
      }
    } catch (error) {
      alert("인증번호 요청 중 오류가 발생했습니다.");
    }
  };
  
  const resendVerificationCode = async () => {
    try {
      const response = await axios.post("http://3.37.214.150:8080/api/resend-code", { email });
      if (response.status === 200) {
        alert("인증번호가 재발급되었습니다.");
      }
    } catch (error) {
      alert("인증번호 재발급 요청 중 오류가 발생했습니다.");
    }
  };
  
  const startTimer = async () => {
    if (!validateEmail(email)) {
      alert("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
  
    // 버튼 상태에 따라 API 호출
    if (!isResend) {
      await sendVerificationCode(); // GET 요청
    } else {
      await resendVerificationCode(); // POST 요청
    }
  
    setIsTimerActive(true);
    setTimer(300); // 5분 타이머 설정
    setIsButtonDisabled(true); // 버튼 비활성화
    setButtonLabel("인증번호 재발급"); // 버튼 텍스트 변경
    setIsResend(true); // 인증번호 재발급 상태로 변경
  
    // 5분 후 버튼 활성화
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 300000); // 5분 = 300,000ms
  };
  

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}s`;
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000); // 1초마다 감소
    } else if (timer === 0) {
      setIsTimerActive(false); // 타이머 종료
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleSignup = async () => {
  
    const nicknameRegex = /[a-zA-Z0-9]{6,15}$/;
  
    // 이메일: 일반적인 이메일 형식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // 비밀번호: 최소 8자, 대문자/소문자/숫자/특수문자 각각 최소 1개
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,15}$/;
  
    // 닉네임 검증
    if (!nicknameRegex.test(nickname)) {
      alert("닉네임은 6~15자의 영문, 숫자만 입력 가능합니다.");
      return;
    }
  
    // 이메일 검증
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
  
    // 비밀번호 검증
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 8~15자 영문자/숫자/특수문자를 각각 최소 1개 포함해야 합니다.");
      return;
    }
  
    
  
    try {
      const response = await axios.post("/api/signup", {
        name,
        nickname,
        email,
        password,
      });
  
      if (response.status === 200) {
        alert("회원가입 성공!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        alert(`회원가입 실패: ${error.response.data.message}`);
      } else {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    }
  };
  

  return (
    <Wrapper>
      <Title>WealthTracker</Title>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>이름</label>
          <Input
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>닉네임</label>
          <Input
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <label>이메일 주소</label>
          <ButtonWrapper>
            <Input
              type="email"
              placeholder="yeungnam@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Timerbutton
              type="button"
              onClick={startTimer}
              disabled={isButtonDisabled} // 버튼 비활성화 상태에 따라 변경
            >
              {buttonLabel} {/* 버튼 텍스트 */}
            </Timerbutton>
          </ButtonWrapper>

          <label>인증코드</label>
          <InputWithTimerWrapper>
            <Input
              type="text"
              placeholder="인증코드를 입력해 주세요."
              value={certification}
              onChange={(e) => setCertification(e.target.value)}
            />
            {isTimerActive && <Timer>{formatTime(timer)}</Timer>} {/* 타이머 표시 */}
          </InputWithTimerWrapper>
        </div>

        <InputWrapper>
          <label>비밀번호</label>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordToggle type="button" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </PasswordToggle>
        </InputWrapper>

        <Button className="login" type="button" onClick={handleSignup}>
          회원가입
        </Button>

        <OrText>or sign up with</OrText>

        <Button className="kakao" type="button">
          <BsChatFill /> 카카오 계정으로 로그인
        </Button>

        <Row>
          <Alreadacc>이미 계정이 있으신가요?</Alreadacc>
          <LoginLink onClick={() => navigate("/login")}>로그인하기</LoginLink>
        </Row>
      </Form>
    </Wrapper>
  );
}

export default Signup;
