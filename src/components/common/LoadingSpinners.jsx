import { GridLoader } from "react-spinners";
import { useTheme } from "styled-components";
export default function LoadingSpinners({ size }) {
  //원하는 사이즈 입력
  const theme = useTheme();
  const loadingSize = size || 15;
  return <GridLoader size={loadingSize} color={theme.colors.blue} />;
}
