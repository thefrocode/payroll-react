import { Report } from "../../interfaces/report";
import axios from "axios";
import { ActiveMonth } from "../../interfaces/active-month";

axios.defaults.baseURL = "http://localhost:3001";
export async function fetchActiveMonth() {
  try {
    const reports = await axios.get("/active_month");
    return reports.data;
  } catch (e) {
    throw e;
  }
}
export async function createActiveMonth(activeMonth: ActiveMonth) {
  try {
    return await axios.post("/active_month", activeMonth);
  } catch (error) {}
}
export async function updateActiveMonth() {
  try {
    const active_month = await axios.get("/active_month");

    active_month.data.month += 1;
    if (active_month.data.month === 13) {
      active_month.data.month = 1;
      active_month.data.year++;
    }
    return await axios.put("/active_month", active_month.data);
  } catch (error) {}
}
