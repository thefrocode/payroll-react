import {
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Income } from "../../shared/interfaces/income";
import fs from "fs";
import {
  createIncome,
  deleteIncome,
  fetchIncomes,
  updateIncome,
} from "../../shared/data-access/api/incomes";
import { useEmployeeSource } from "../../employees/store";
import { useIncomeTypeSource } from "./income-type";
import { useCallback, useMemo } from "react";
import { DetailedIncome } from "../../shared/interfaces/income";

export function useIncomeSource(): {
  incomes: Income[];
  addIncome: UseMutateFunction<void, unknown, Income, unknown>;
  editIncome: UseMutateFunction<void, unknown, Income, unknown>;
  removeIncome: UseMutateFunction<void, unknown, number, unknown>;
  error: any;
  detailed_incomes: DetailedIncome[];
} {
  const queryClient = useQueryClient();
  const { data: incomes, error } = useQuery(["incomes"], fetchIncomes, {
    initialData: [],
  });
  const { mutate: addIncome } = useMutation({
    mutationFn: createIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      alert("Income Added");
    },
    onError: (error) => {
      alert(error);
    }
  });
  
  const { mutate: editIncome } = useMutation({
    mutationFn: updateIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      alert("Income Updated");
    },
  });
  const { mutate: removeIncome } = useMutation({
    mutationFn: deleteIncome,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      alert("Income Deleted");
    },
  });

  const { employees } = useEmployeeSource();
  const { income_types } = useIncomeTypeSource();
  
  const { detailed_incomes } = useMemo(() => {
    const detailed_incomes = incomes.map((income) => {
      const employee = employees.find(
        (employee) => employee.id === income.employee_id
      );
      const income_type = income_types.find(
        (income_type) => income_type.id === income.income_type_id
      );
      return {
        ...income,
        employee_name: employee?.first_name + " " + employee?.last_name,
        income_type_name: (income_type?.name)!,
        income_type_code: (income_type?.code)!,
      };
    });

    return { detailed_incomes };
  }, [incomes, employees, income_types]);


  return {
    incomes,
    addIncome,
    editIncome,
    removeIncome,
    error,
    detailed_incomes,
  };
}
