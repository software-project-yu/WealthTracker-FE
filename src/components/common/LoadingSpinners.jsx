import { GridLoader } from "react-spinners";
import { useTheme } from "styled-components";
export default function LoadingSpinners({ size }) {
    //원하는 사이즈 입력
  const theme = useTheme();
  return <GridLoader size={size} color={theme.colors.blue} />;
}
