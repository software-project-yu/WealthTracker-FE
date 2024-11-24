import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinners from "../common/LoadingSpinners";
import Error from "../common/Error";

export default function ConsumptionReport() {
  return (
    <div>
      <LoadingSpinners />
      <Error />
    </div>
  );
}
