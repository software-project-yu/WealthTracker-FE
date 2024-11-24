import { PieChart, Pie, Cell } from "recharts";
import styled from "styled-components";
import { useEffect, useState } from "react";

const RADIAN = Math.PI / 180;

// 바늘 컴포넌트 함수
const needle = (value, total, cx, cy, iR, oR, color) => {
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 4;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 10;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin + 5;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin - 5;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle
      key="needle-circle"
      cx={x0}
      cy={y0}
      r={r}
      fill={color}
      stroke="none"
    />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      fill={color}
    />,
  ];
};

export default function CircleGraph({
  goalAmount,
  currentAmount,
  width,
  height,
}) {
  const total = goalAmount;
  const [currentValue, setCurrentValue] = useState(0);
  const finalValue = currentAmount;
  const cx = width / 2;
  const cy = height - 15;
  const iR = width * 0.4;
  const oR = height * 0.8;
  // 바늘 애니메이션 효과
  useEffect(() => {
    if (currentValue < finalValue) {
      const increment = finalValue / 50; // 애니메이션 단계별 증가치
      const timeout = setTimeout(() => {
        setCurrentValue((prev) => Math.min(prev + increment, finalValue));
      }, 20); // 20ms 간격으로 증가
      return () => clearTimeout(timeout);
    }
  }, [currentValue, finalValue]);

  return (
    <Container>
      <PieChart width={width} height={height}>
        {/* 회색 배경 레이어 */}
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={[{ value: goalAmount, color: "#E8E8E8" }]}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          stroke="none"
          cornerRadius={10}
        >
          <Cell fill="#E8E8E8" />
        </Pie>

        {/* 파란색 현재 금액 레이어 */}
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={180 - 180 * (currentAmount / goalAmount)}
          data={[{ value: currentAmount, color: "#007BFF" }]}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          stroke="none"
          cornerRadius={10}
        >
          <Cell fill="#007BFF" />
        </Pie>

        {/* 애니메이션 적용된 바늘 */}
        {needle(currentValue, total, cx, cy, iR, oR, "#007BFF")}
      </PieChart>
      <TextContainer>
        <Text>0원</Text>
        <Text>{goalAmount}만원</Text>
      </TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray03};
`;
