import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Deduction, DetailedDeduction } from "../../shared/interfaces/deduction";
import fs from "fs";
import {
  createDeduction,
  deleteDeduction,
  fetchDeductions,
  updateDeduction,
} from "../../shared/data-access/api/deductions";
import { useEmployee } from "../../employees/store";
import { useDeductionTypeSource } from "./deduction-type";
import { useMemo } from "react";
import { useShared } from "../../shared/store/active";

export function useDeductionSource(): {
  deductions: Deduction[];
  total_deductions: number;
  addDeduction: UseMutateFunction<void, unknown, Deduction, unknown>;
  editDeduction: UseMutateFunction<void, unknown, Deduction, unknown>;
  removeDeduction: UseMutateFunction<void, unknown, number, unknown>;
  error: any;
  detailed_deductions: DetailedDeduction[];
} {
  const queryClient = useQueryClient();
  const { active_month } = useShared();

  const { data: deductions, error } = useQuery(
    ["deductions",{...active_month}],
    fetchDeductions,
    {
      initialData: [],
    }
  );
  const { mutate: addDeduction } = useMutation({
    mutationFn: createDeduction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deductions"] });
      alert("Deduction Added");
    },
  });
  const { mutate: editDeduction } = useMutation({
    mutationFn: updateDeduction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deductions"] });
      alert("Deduction Updated");
    },
  });
  const { mutate: removeDeduction } = useMutation({
    mutationFn: deleteDeduction,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["deductions"] });
      alert("Deduction Deleted");
    },
  });
  const { employees } = useEmployee();
  const { deduction_types } = useDeductionTypeSource();

  const  total_deductions = useMemo(()=>{
    return deductions.reduce((total, deduction)=>{
      return deduction.amount+total
    },0)
  },[deductions])
  
  const { detailed_deductions } = useMemo(() => {
    const detailed_deductions = deductions.map((deduction) => {
      const employee = employees?.find(
        (employee) => employee.id === deduction.employee_id
      );
      const deduction_type = deduction_types.find(
        (deduction_type) => deduction_type.id === deduction.deduction_type_id
      );
      return {
        ...deduction,
        employee_name: employee?(employee?.first_name + " " + employee?.last_name): undefined,
        deduction_type_name: (deduction_type?.name)!,
        deduction_type_code: (deduction_type?.code)!,
      };
    }).filter((employee)=>employee.employee_name);

    return { detailed_deductions };
  }, [deductions, employees, deduction_types]);
  return { deductions, total_deductions,addDeduction, editDeduction, removeDeduction, error, detailed_deductions };
}
