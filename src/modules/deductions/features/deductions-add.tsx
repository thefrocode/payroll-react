import { useEmployeeSource } from "../../employees/store";
import { useDeductionSource } from "../store/deduction";
import { useDeductionTypeSource } from "../store/deduction-type";
import { DeductionsForm } from "../ui/deductions-form";

export function DeductionsAdd() {
   

  const { addDeduction } = useDeductionSource();
  const { employees } = useEmployeeSource();
  const { deduction_types } = useDeductionTypeSource();
  const onDeductionAdded = (data: any) => {
    addDeduction(data);
  };
  

  return( <DeductionsForm employees={employees} deduction_types={deduction_types} onSave={onDeductionAdded} />);
}
