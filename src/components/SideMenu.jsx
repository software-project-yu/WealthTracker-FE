import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/images/profile.jpg";
import icon1 from "../assets/images/menu_Icon/icon1.png";
import icon1_white from "../assets/images/menu_Icon/icon1-white.png";
import icon2 from "../assets/images/menu_Icon/icon2.png";
import icon2_white from "../assets/images/menu_Icon/icon2-white.png";
import icon3 from "../assets/images/menu_Icon/icon3.png";
import icon3_white from "../assets/images/menu_Icon/icon3-white.png";
import icon4 from "../assets/images/menu_Icon/icon4.png";
import icon4_white from "../assets/images/menu_Icon/icon4-white.png";
import icon5 from "../assets/images/menu_Icon/icon5.png";
import icon5_white from "../assets/images/menu_Icon/icon5-white.png";
import icon6 from "../assets/images/menu_Icon/icon6.png";
import icon6_white from "../assets/images/menu_Icon/icon6-white.png";
import LogoutIcon from "../assets/images/menu_Icon/Logout.png";
import styled from "styled-components";

export default function SideMenu() {
  //경로 배열
  const pageName = [
    { name: "홈", imageSrc: icon1, imageSrcWhite: icon1_white, page: "/" },
    {
      name: "수입/지출 내역",
      imageSrc: icon2,
      imageSrcWhite: icon2_white,
      page: "/transactions",
    },
    {
      name: "결제예정",
      imageSrc: icon3,
      imageSrcWhite: icon3_white,
      page: "/scheduledpayments",
    },
    {
      name: "비용",
      imageSrc: icon4,
      imageSrcWhite: icon4_white,
      page: "/expenses",
    },
    {
      name: "목표",
      imageSrc: icon5,
      imageSrcWhite: icon5_white,
      page: "/goals",
    },
    {
      name: "설정",
      imageSrc: icon6,
      imageSrcWhite: icon6_white,
      page: "/settings",
    },
  ];
  const nav = useNavigate();
  //메뉴 버튼 클릭 시
  const onClickMenuItem = (src) => {
    nav(src);
  };

  return (
    <Container>
      <Logo>WealthTracker</Logo>
      <Line />
      <ProfileContainer>
        <ProfileImage src={defaultProfile} />
        <ProfileTextContainer>
          <ProfileUserName>홍길동</ProfileUserName>
          <ProfileToProfilePage onClick={() => nav("/settings")}>
            프로필 보기
          </ProfileToProfilePage>
        </ProfileTextContainer>
      </ProfileContainer>
      {/* 메뉴 아이템 */}
      {pageName.map((item, idx) => (
        <MenuItemContainer key={idx} onClick={() => onClickMenuItem(item.page)}>
          <MenuItemImg
            src={item.imageSrc}
            data-white-src={item.imageSrcWhite}
            alt={`${item.imageSrc} icon`}
          />
          <MenuItemText>{item.name}</MenuItemText>
        </MenuItemContainer>
      ))}
      <LogoutContainer>
        <LogoutImg src={LogoutIcon} />
        <LogoutText>로그아웃</LogoutText>
      </LogoutContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 15rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black02};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 2rem;
  gap: 1rem;
`;
const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  align-items: center;
  font-size: 2rem;
  font-weight: 800;
  padding: 2rem 0;
`;
const Line = styled.hr`
  background-color: ${({ theme }) => theme.colors.gray05};
  width: 100%;
  height: 2px;
  border: 0;
`;
const ProfileContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  margin-top: 2rem;
`;
const ProfileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 3rem;
`;
const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
`;
const ProfileUserName = styled.a`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;
const ProfileToProfilePage = styled.a`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.gray02};
  cursor: pointer;
`;
const MenuItemText = styled.a`
  color: ${({ theme }) => theme.colors.gray01};
  font-weight: 700;
  transition: color 0.3s;
`;
const MenuItemContainer = styled.div`
  cursor: pointer;
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0.5rem;
  transition: all 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue};
    border-radius: 4px;
  }
  &:hover ${MenuItemText} {
    color: ${({ theme }) => theme.colors.white};
  }
`;
const MenuItemImg = styled.img`
  width: 1rem;
  height: 1rem;

  /* hover일 때 이미지 변경 */
  ${MenuItemContainer}:hover& {
    content: url(${({ "data-white-src": dataWhiteSrc }) => dataWhiteSrc});
  }
`;
const LogoutText = styled.a`
  color: ${({ theme }) => theme.colors.red};
  font-weight: 700;
  transition: color 0.3s;
`;
const LogoutContainer = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray05};
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 1rem 0.5rem;
  border-radius: 4px;
  margin-top: 15vh;
`;
const LogoutImg = styled.img`
  width: 1rem;
  height: 1rem;
`;
