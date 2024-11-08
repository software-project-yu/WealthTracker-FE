import { ResponsiveBar } from "@nivo/bar";

const DailyGraph = ({ data }) => {
  // 데이터에서 최고 금액을 찾고 5개 구간으로 나누기
  const maxNum = Math.max(...data.map((num) => num.costNum));

  return (
    <ResponsiveBar
      data={data.map((d) => ({
        day: `${d.dayNum}일`, // X축에 표시될 주차 정보
        cost: d.costNum,
      }))}
      keys={["cost"]}
      indexBy="day"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.5}
      innerPadding={10}
      groupMode="grouped"
      indexScale={{ type: "band", round: false }}
      colors="#007BFF"
      borderRadius={5}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
        format: (value) => `${value / 10000} 만원`, // 만원 단위로 표시
        tickValues: 5, // Y축에 5개의 구간 표시
        maxValue: Math.ceil(maxNum / 5) * 5, // 최고 값 기준으로 5단위로 나누기
      }}
      enableLabel={false}
      labelSkipWidth={0}
      labelSkipHeight={0}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      tooltip={({ id, value, indexValue }) => (
        <div
          style={{
            padding: "5px 10px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <strong>
             {indexValue}
          </strong>
          :{value.toLocaleString()} 원
        </div>
      )}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top-right",
          direction: "row",
          justify: false,
          translateX: 100,
          translateY: -40,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      motionConfig="molasses"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        `${e.id}: ${e.formattedValue} in week: ${e.indexValue}`
      }
    />
  );
};

export default DailyGraph;
