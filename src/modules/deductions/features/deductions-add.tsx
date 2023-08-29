import { useEmployeeSource } from "../../employees/store";
import { useDeductionSource } from "../store/deduction";
import { useDeductionTypeSource } from "../store/deduction-type";
import { DeductionsForm } from "../ui/deductions-form";

export function DeductionsAdd() {
    console.log("DeductionsAdd");

  const { addDeduction } = useDeductionSource();
  const { employees } = useEmployeeSource();
  const { deduction_types } = useDeductionTypeSource();
  console.log("DeductionsAdd", employees, deduction_types);
  const onDeductionAdded = (data: any) => {
    addDeduction(data);
  };
  

  return( <DeductionsForm employees={employees} deduction_types={deduction_types} onSave={onDeductionAdded} />);
}
