import { Report } from "../../interfaces/report";
import axios from "axios";
import { ActiveMonth } from "../../interfaces/active-month";

axios.defaults.baseURL = "http://localhost:3001";
export async function fetchActiveMonth(): Promise<ActiveMonth> {
  try {
    const reports = await axios.get("/active_month");
    return reports.data;
  } catch (e) {
    throw e;
  }
}
export async function createActiveMonth(
  activeMonth: ActiveMonth
) {
  try {
    return await axios.post("/active_month", activeMonth);
  } catch (error) {}
}
