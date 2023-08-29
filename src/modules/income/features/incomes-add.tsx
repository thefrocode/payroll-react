import { useEmployeeSource } from "../../employees/store";
import { useIncomeSource } from "../store/income";
import { useIncomeTypeSource } from "../store/income-type";
import { IncomesForm } from "../ui/incomes-form";

export function IncomesAdd() {
    console.log("IncomesAdd");

  const { addIncome } = useIncomeSource();
  const { employees } = useEmployeeSource();
  const { income_types } = useIncomeTypeSource();
  console.log("IncomesAdd", employees, income_types);
  const onIncomeAdded = (data: any) => {
    addIncome(data);
  };
  

  return( <IncomesForm employees={employees} income_types={income_types} onSave={onIncomeAdded} />);
}
