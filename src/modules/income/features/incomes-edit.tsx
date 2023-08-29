import { useIncomeSource } from "../store/income";
import { useMatch } from "@tanstack/react-location";
import { IncomesForm } from "../ui/incomes-form";

export function IncomesEdit() {
  const {
    params: { id },
  } = useMatch();
  const { incomes, editIncome } = useIncomeSource();

  const income = incomes.find((income) => income.id === +id);

  const onIncomeEdited = (data: any) => {
    editIncome({ ...data, id: +id });
  };

  return <IncomesForm income={income} onSave={onIncomeEdited} />;
}
