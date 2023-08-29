import { useMemo } from "react";
import { useDeductionSource } from "../deductions/store/deduction";
import { useEmployeeSource } from "../employees/store";
import { useIncomeSource } from "../income/store/income";
import { DetailedDeduction } from "../shared/interfaces/deduction";
import { DetailedIncome, Income } from "../shared/interfaces/income";

export function useReportsSource() {
  const { detailed_incomes:incomes } = useIncomeSource();
  const { detailed_deductions:deductions } = useDeductionSource();
  const { employees } = useEmployeeSource();

  //Return array of employees with their income and deduction

  const employeeIncomeDeduction = useMemo(() => {
    return employees.map((employee) => {
        //Each incomes to have its own column
      const employeeIncomes = incomes.filter(
        (income) => income.employee_id === employee.id
      ).reduce((accumulator: { [key: string]: number }, currentValue: DetailedIncome) => {
        accumulator[currentValue.income_type_name] = currentValue.amount;
        return accumulator;
      }, {});


      const employeeDeductions = deductions.filter(
        (deduction) => deduction.employee_id === employee.id
      ).reduce((accumulator: { [key: string]: number }, currentValue: DetailedDeduction) => {
        accumulator[currentValue.deduction_type_name] = currentValue.amount;
        return accumulator;
      }, {});
      return {
        ...employee,
        ...employeeIncomes,
        ...employeeDeductions,
      };
    });
  }, [incomes, deductions, employees]);

  console.log(employeeIncomeDeduction);
  return { employeeIncomeDeduction}
}


