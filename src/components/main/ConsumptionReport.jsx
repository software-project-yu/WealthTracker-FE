import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinners from "../common/LoadingSpinners";

export default function ConsumptionReport() {
  return (
    <div>
      <LoadingSpinners size={20} loading={true}/>
    </div>
  );
}
