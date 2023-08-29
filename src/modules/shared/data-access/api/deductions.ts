import { Deduction } from "../../interfaces/deduction";
import axios from "axios";
//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchDeductions(): Promise<Deduction[]> {
  try {
    const deductions = await axios.get("/deductions");
    return deductions.data;
  } catch (e) {
    throw e;
  }
}

export async function createDeduction(data: Deduction) {
  try {
    await axios.post("/deductions", { ...data });
  } catch (e) {
    throw e;
  }
}
export async function updateDeduction(data: Deduction) {
  try {
    await axios.patch(`/deductions/${data.id}`, { ...data });
  } catch (e) {
    throw e;
  }
}

export async function deleteDeduction(id: number) {
  try {
    await axios.delete(`/deductions/${id}`);
  } catch (e) {
    throw e;
  }
}
