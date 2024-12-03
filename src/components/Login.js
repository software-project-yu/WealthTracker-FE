import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({theme})=>theme.colors.gray00}; , /* 회색 배경 */
  width: 100%;
`;

export const Title = styled.h1`
  color:${({theme})=>theme.colors.blue}; /* WealthTracker 파란색 */
  margin-bottom: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px; /* 고정된 너비 유지 */
  padding: 20px;
  background-color: ${({theme})=>theme.colors.gray00};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
`;
export const Button = styled.button`
  width: 100%; /* 너비를 100%로 설정하여 버튼을 입력 필드와 같게 만듦 */
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) =>
    props.className === "login"
      ? "#007bff"
      : props.className === "kakao"
      ? "#ffcc00"
      : "transparent"};
  color: ${(props) =>
    props.className === "login"
      ? "white"
      : props.className === "kakao"
      ? "black" // 카카오 버튼의 글자색을 검정색으로 변경
      : "#007bff"};
`;
export const InputWrapper = styled.div`
position: relative;
width: 100%; /* 부모의 너비에 맞추어 100% 설정 */
margin-bottom: 15px;
`;
