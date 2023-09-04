import { useIncomeSource } from "../store/income";
import { useMatch } from "@tanstack/react-location";
import { IncomesForm } from "../ui/incomes-form";
import { useEmployeeSource } from "../../employees/store";
import { useIncomeTypeSource } from "../store/income-type";

export function IncomesEdit() {
  const {
    params: { id },
  } = useMatch();
  const { incomes, editIncome } = useIncomeSource();
  const { employees } = useEmployeeSource();
  const { income_types } = useIncomeTypeSource();

  const income = incomes.find((income) => income.id === +id);

  const onIncomeEdited = (data: any) => {
    editIncome({ ...data, id: +id });
  };

  return (
    <IncomesForm
      income={income}
      onSave={onIncomeEdited}
      employees={employees}
      income_types={income_types}
    />
  );
}
