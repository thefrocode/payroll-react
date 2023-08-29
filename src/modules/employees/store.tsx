import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Employee } from "../shared/interfaces/employee";
import fs from "fs";
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee,
} from "../shared/data-access/api/employees";

export function useEmployeeSource(): {
  employees: Employee[];
  addEmployee: UseMutateFunction<void, unknown, Employee, unknown>;
  editEmployee: UseMutateFunction<void, unknown, Employee, unknown>;
  removeEmployee: UseMutateFunction<void, unknown, number, unknown>;
  error: any;
} {

  //Fetch all employees
  const queryClient = useQueryClient();
  const { data: employees, error } = useQuery(["employees"], fetchEmployees, {
    initialData: [],
  });


  //Generate mutations for updating the employee list
  const { mutate: addEmployee } = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      alert("Employee Added");
    },
  });
  const { mutate: editEmployee } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      alert("Employee Updated");
    },
  });
  const { mutate: removeEmployee } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      alert("Employee Deleted");
    },
  });

  



  return { employees, addEmployee, editEmployee, removeEmployee, error };
}
