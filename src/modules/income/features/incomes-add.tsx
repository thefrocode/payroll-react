import { useEmployeeSource } from "../../employees/store";
import { Income } from "../../shared/interfaces/income";
import { useIncomeSource } from "../store/income";
import { useIncomeTypeSource } from "../store/income-type";
import { IncomesForm } from "../ui/incomes-form";

export function IncomesAdd() {
  const { addIncome } = useIncomeSource();
  const { employees } = useEmployeeSource();
  const { income_types } = useIncomeTypeSource();
  const onIncomeAdded = (data: Income) => {
    addIncome(data);
  };

  return (
    <IncomesForm
      employees={employees}
      income_types={income_types}
      onSave={onIncomeAdded}
    />
  );
}
