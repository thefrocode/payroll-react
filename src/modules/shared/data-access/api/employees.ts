import { Employee } from "../../interfaces/employee";
import axios from "axios";
//import axios from "../../config/axiosConfig";
axios.defaults.baseURL = "http://localhost:3001";
export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const employees = await axios.get("/employees");
    return employees.data;
  } catch (e) {
    throw e;
  }
}

export async function createEmployee(data: Employee) {
  try {
    await axios.post("/employees", { ...data });
  } catch (e) {
    throw e;
  }
}
export async function updateEmployee(data: Employee) {
  try {
    await axios.patch(`/employees/${data.id}`, { ...data });
  } catch (e) {
    throw e;
  }
}

export async function deleteEmployee(id: number) {
  try {
    await axios.delete(`/employees/${id}`);
  } catch (e) {
    throw e;
  }
}
