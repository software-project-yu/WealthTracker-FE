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
  background-color: ${({ theme }) => theme.colors.gray00};
  min-height: 100vh;
  width: 100%;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.gray00};
  min-width: 0;
  flex: 1;
`;
const Sub = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;
  padding: 1rem;
`;
