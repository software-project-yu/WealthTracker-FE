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
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  SwipeableDrawer,
} from "@mui/material";

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
  //로그아웃
  const onClickLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      nav("/login");
      //토큰 삭제
      localStorage.removeItem("token");
    }
  };

  //햄버거 메뉴
  const [menu, setMenu] = useState({ top: false });

  const toggleDrawer = (anchor, open) => (e) => {
    if (e && e.type == "keydown" && (e.key == "Tab" || e.key == "Shift")) {
      return;
    }
    setMenu({ ...menu, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: "auto", maxWidth: "100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {pageName.map((item, idx) => (
          <MenuItemContainer
            key={idx}
            onClick={() => onClickMenuItem(item.page)}
          >
            <MenuItemImg
              src={item.imageSrc}
              data-white-src={item.imageSrcWhite}
              alt={`${item.imageSrc} icon`}
            />
            <MenuItemText>{item.name}</MenuItemText>
          </MenuItemContainer>
        ))}
      </List>
    </Box>
  );

  //브라우저 넓이 계산
  const [browserWidth, setBrowserWidth] = useState(0);
  const resizeTimer = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimer.current !== null) return;
      resizeTimer.current = setTimeout(() => {
        resizeTimer.current = null;
        setBrowserWidth(window.innerWidth);
      }, 200);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [browserWidth]);

  return browserWidth > 1024 ? (
    <Container>
      <Logo>WealthTracker</Logo>
      <Line />
      <ProfileContainer>
        <ProfileImage src={defaultProfile} />
        <ProfileUserName>홍길동</ProfileUserName>
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
        <LogoutText onClick={onClickLogout}>로그아웃</LogoutText>
      </LogoutContainer>
    </Container>
  ) : (
    <React.Fragment>
      <Button
        onClick={toggleDrawer("top", true)}
        sx={{ backgroundColor: "black", borderRadius: 0 }}
      >
        Menu
      </Button>
      <SwipeableDrawer
        anchor="top"
        open={menu["top"]}
        onClose={toggleDrawer("top", false)}
        onOpen={toggleDrawer("top", true)}
        PaperProps={{
          sx: {
            backgroundColor: "black",
            borderRadius: 0,
          },
        }}
      >
        {list("top")}
      </SwipeableDrawer>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 15rem;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.black02};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
  position: sticky;
  top: 0;
`;
const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  align-items: center;
  font-size: 1.8rem; 
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
  margin-bottom: 3rem;
`;
const ProfileImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;
const ProfileUserName = styled.a`
  align-self: center;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
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
