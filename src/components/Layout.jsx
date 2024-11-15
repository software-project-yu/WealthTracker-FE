import styled from "styled-components";
import BackGround from "../components/BackGround";
import SideMenu from "../components/SideMenu";

//공통 레이아웃
export default function Layout({ children }) {
  return (
    <Container>
      <SideMenu />
      <SubContainer>
        <BackGround />
        <Sub>{children}</Sub>
      </SubContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray00};
`;
const Sub = styled.div`
  display: flex;
  flex-direction: column;
`;
