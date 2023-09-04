import { useEffect, useMemo } from "react";
import { useDeductionSource } from "../../deductions/store/deduction";
import { useEmployeeSource } from "../../employees/store";
import { useIncomeSource } from "../../income/store/income";
import { DetailedDeduction } from "../../shared/interfaces/deduction";
import { DetailedIncome, Income } from "../../shared/interfaces/income";
import { useFormulasSource } from "./formulas";
import * as math from "mathjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createReport,
  fetchSavedReports,
  updateBatchReports,
  updateReport,
} from "../../shared/data-access/api/reports";
import { useShared } from "../../shared/store/active";

export function useReportsSource() {
  const { detailed_incomes: incomes } = useIncomeSource();
  const { detailed_deductions: deductions } = useDeductionSource();
  const { employees } = useEmployeeSource();
  const { formulas } = useFormulasSource();
  const { active_month } = useShared();

  const queryClient = useQueryClient();
  const { data: saved_reports, error } = useQuery(
    ["reports"],
    fetchSavedReports,
    {
      initialData: [],
    }
  );
  

  const { mutate: editBatchReports } = useMutation({
    mutationFn: updateBatchReports,
    onError: (error) => {
      alert(error);
    },
  });

  /**Return array of employees with their income and deduction
   *  This is to simulate a pivot table
   **/

  const employeeIncomeDeduction = useMemo(() => {
    const employeeInfo = employees.map((employee) => {
      //Each income to have its own column
      const employeeIncomes = incomes
        .filter((income) => income.employee_id === employee.id)
        .reduce(
          (
            accumulator: { [key: string]: number },
            currentValue: DetailedIncome
          ) => {
            accumulator[currentValue.income_type_code] = currentValue.amount;
            return accumulator;
          },
          {}
        );

      const employeeDeductions = deductions
        .filter((deduction) => deduction.employee_id === employee.id)
        .reduce(
          (
            accumulator: { [key: string]: number },
            currentValue: DetailedDeduction
          ) => {
            accumulator[currentValue.deduction_type_code] = currentValue.amount;
            return accumulator;
          },
          {}
        );

      
      return {
        ...employee,
        ...employeeIncomes,
        ...employeeDeductions,
        month: active_month?.month,
        year: active_month?.year,
      };
    });

    
    employeeInfo.forEach((employee_income: any) => {
      formulas.forEach((formula:any) => {
        employee_income[formula.name] = safeEvaluate(formula.formula, employee_income).toFixed(2);
      });
    });
    return employeeInfo;
    
  }, [incomes, deductions, employees, formulas]);

  //wrap forEach in a promise and await it

 
  useEffect(() => {
    editBatchReports(employeeIncomeDeduction);
  }, [employeeIncomeDeduction]);

  console.log(employeeIncomeDeduction);

  return { employeeIncomeDeduction };
}
function safeEvaluate(expression: any, scope: any) {
  const definedSymbols = Object.keys(scope);

  // Replace undefined symbols in the expression with 0
  const modifiedExpression = expression.replace(
    /[a-zA-Z_][a-zA-Z0-9_]*/g,
    (symbol: any) => {
      if (!definedSymbols.includes(symbol)) {
        return "0";
      }
      return symbol;
    }
  );

  return math.evaluate(modifiedExpression, scope);
}
