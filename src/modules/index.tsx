import { useDeductionSource } from "./deductions/store/deduction";
import { useEmployee } from "./employees/store";
import { useIncomeSource } from "./income/store/income";
import { useShared } from "./shared/store/active";

export function Index() {
  const { closeMonth } = useShared();
  const { no_of_employees } = useEmployee();
  const { total_income } = useIncomeSource();
  const { total_deductions } = useDeductionSource();
  return (
    <div className="flex">
      <p>No of Employees: {no_of_employees}</p>
      <p>Total Income: {total_income}</p>
      <p>Total Deductions: {total_deductions}</p>
      <button onClick={() => closeMonth()}>Close</button>;
    </div>
  );
}
