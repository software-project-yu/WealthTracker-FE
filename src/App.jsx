import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Transactions from "./pages/Transactions";
import ScheduledPayments from "./pages/ScheduledPayments";
import Expense from "./pages/Expense";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindPassword from "./pages/FindPassword";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/scheduledpayments" element={<ScheduledPayments />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/findpw" element={<FindPassword />} />
      {/* 404 페이지 */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
