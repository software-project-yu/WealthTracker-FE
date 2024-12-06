import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GoalModal from "../components/GoalModal";

const Calendar = ({ targetId, onSave }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [goals, setGoals] = useState(() => {
    // 로컬 저장소에서 목표 데이터를 초기화
    const savedGoals = localStorage.getItem("savingsGoals");
    return savedGoals ? JSON.parse(savedGoals) : {};
  });

  useEffect(() => {
    // 목표 데이터를 로컬 저장소에 저장
    localStorage.setItem("savingsGoals", JSON.stringify(goals));
  }, [goals]);

  // 달력 날짜 계산
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );

  const firstDayOfCalendar = new Date(firstDayOfMonth);
  firstDayOfCalendar.setDate(
    firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
  );

  const lastDayOfCalendar = new Date(lastDayOfMonth);
  lastDayOfCalendar.setDate(
    lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay())
  );

  const days = [];
  let day = new Date(firstDayOfCalendar);
  while (day <= lastDayOfCalendar) {
    days.push(new Date(day));
    day.setDate(day.getDate() + 1);
  }

  // 달 이동
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // 날짜 클릭
  const handleDayClick = (date) => {
    const localDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    setSelectedDate(localDate);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  const handleGoalSubmit = (goal) => {
    const dateKey = selectedDate.toDateString();
    const updatedGoal = parseFloat(goal);

    setGoals((prevGoals) => {
      if (updatedGoal === 0) {
        // 값이 0일 경우 해당 날짜 데이터 삭제
        const { [dateKey]: _, ...restGoals } = prevGoals;
        return restGoals;
      }
      // 값이 0이 아닐 경우 덮어쓰기
      return {
        ...prevGoals,
        [dateKey]: updatedGoal,
      };
    });

    onSave(updatedGoal); // 부모 컴포넌트에 전달
    closeModal();
  };

  return (
    <CalendarWrapper>
      <Header>
        <Dropdown
          value={`${currentMonth.getFullYear()}-${String(
            currentMonth.getMonth() + 1
          ).padStart(2, "0")}`}
          onChange={(e) => {
            const [year, month] = e.target.value.split("-");
            setCurrentMonth(new Date(year, month - 1, 1));
          }}
        >
          {[...Array(12)].map((_, i) => (
            <option
              key={i}
              value={`${currentMonth.getFullYear()}-${String(i + 1).padStart(
                2,
                "0"
              )}`}
            >
              {currentMonth.getFullYear()}년 {i + 1}월
            </option>
          ))}
        </Dropdown>

        <ButtonWrapper>
          <ArrowButton onClick={prevMonth}>‹</ArrowButton>
          <ArrowButton onClick={nextMonth}>›</ArrowButton>
        </ButtonWrapper>
      </Header>

      <DaysOfWeek>
        {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
          <Day key={index}>{day}</Day>
        ))}
      </DaysOfWeek>
      <DaysGrid>
        {days.map((date, index) => {
          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

          return (
            <DayCell
              key={index}
              onClick={() => handleDayClick(date)}
              isCurrentMonth={isCurrentMonth}
              style={{ visibility: isCurrentMonth ? "visible" : "hidden" }}
            >
              {isToday && <TodayMarker />}
              <DayText isToday={isToday}>{date.getDate()}</DayText>
              {goals[date.toDateString()] && (
                <GoalText>{goals[date.toDateString()]}원</GoalText>
              )}
            </DayCell>
          );
        })}
      </DaysGrid>

      {modalOpen && (
        <GoalModal
          date={selectedDate}
          onClose={closeModal}
          onSubmit={handleGoalSubmit}
          targetId={targetId}
        />
      )}
    </CalendarWrapper>
  );
};

// Styled Components
const CalendarWrapper = styled.div`
  width: 640px;
  height: 296px;
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Dropdown = styled.select`
  padding: 5px;
  border: none;
  cursor: pointer;
  font-family: Pretendard;
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: #007bff;
  &:hover {
    color: #0056b3;
  }
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  margin-bottom: 8px;
  font-family: Pretendard;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  color: rgba(60, 60, 67, 0.3);
`;

const Day = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  flex-grow: 1;
`;

const DayCell = styled.div`
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  background: #fff;
  color: #000;
  position: relative;
`;

const TodayMarker = styled.div`
  width: 30px;
  height: 30px;
  background-color: rgba(0, 123, 255, 1);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const DayText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  color: ${({ isToday }) => (isToday ? "#fff" : "#000")};
  z-index: 1;
`;

const GoalText = styled.div`
  font-size: 12px;
  color: rgba(0, 123, 255, 1);
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(234, 243, 254, 1);
  padding: 3px 4px;
  border-radius: 4px;
  text-align: center;
  z-index: 1;
  white-space: nowrap; // 텍스트가 한 줄로 유지되도록 함
  max-width: 200px; // 최대 너비를 설정 (길어지면 옆으로 확장)
`;

export default Calendar;
