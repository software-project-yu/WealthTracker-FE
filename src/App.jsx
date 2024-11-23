
import { Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import Transactions from "./pages/Transactions";
import ScheduledPayments from "./pages/ScheduledPayments";
import Expense from "./pages/Expense";
import Goals from "./pages/Goals";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/scheduledpayments" element={<ScheduledPayments />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
