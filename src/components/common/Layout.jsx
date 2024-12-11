import styled from "styled-components";
import BackGround from "../BackGround";
import SideMenu from "../common/SideMenu";
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
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray00};
  min-height: 100vh;
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.gray00};
`;

const Sub = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
`;
