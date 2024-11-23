import { MdError } from "react-icons/md";
import styled, { useTheme } from "styled-components";
export default function Error({ size }) {
  const errorSize = size || 70;
  const theme = useTheme();
  return (
    <Container>
      <MdError size={errorSize} color={theme.colors.red} />
      <strong>잠시 후 다시 시도하세요.</strong>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;
