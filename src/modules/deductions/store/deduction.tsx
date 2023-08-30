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
import { useEmployeeSource } from "../../employees/store";
import { useDeductionTypeSource } from "./deduction-type";
import { useMemo } from "react";

export function useDeductionSource(): {
  deductions: Deduction[];
  addDeduction: UseMutateFunction<void, unknown, Deduction, unknown>;
  editDeduction: UseMutateFunction<void, unknown, Deduction, unknown>;
  removeDeduction: UseMutateFunction<void, unknown, number, unknown>;
  error: any;
  detailed_deductions: DetailedDeduction[];
} {
  const queryClient = useQueryClient();
  const { data: deductions, error } = useQuery(
    ["deductions"],
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
  const { employees } = useEmployeeSource();
  const { deduction_types } = useDeductionTypeSource();
  
  const { detailed_deductions } = useMemo(() => {
    const detailed_deductions = deductions.map((deduction) => {
      const employee = employees.find(
        (employee) => employee.id === deduction.employee_id
      );
      const deduction_type = deduction_types.find(
        (deduction_type) => deduction_type.id === deduction.deduction_type_id
      );
      return {
        ...deduction,
        employee_name: employee?.first_name + " " + employee?.last_name,
        deduction_type_name: (deduction_type?.name)!,
        deduction_type_code: (deduction_type?.code)!,
      };
    });

    return { detailed_deductions };
  }, [deductions, employees, deduction_types]);
  return { deductions, addDeduction, editDeduction, removeDeduction, error, detailed_deductions };
}
