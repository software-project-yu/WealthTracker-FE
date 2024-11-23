import { MoonLoader } from "react-spinners";
import styled, { useTheme } from "styled-components";
export default function LoadingSpinners({ size }) {
  //원하는 사이즈 입력
  const theme = useTheme();
  const loadingSize = size || 50;
  return (
    <Container>
      <MoonLoader size={loadingSize} color={theme.colors.blue} />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
