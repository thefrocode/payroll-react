import { useDeductionSource } from "../store/deduction";
import { useMatch } from "@tanstack/react-location";
import { DeductionsForm } from "../ui/deductions-form";

export function DeductionsEdit() {
  const {
    params: { id },
  } = useMatch();
  const { deductions, editDeduction } = useDeductionSource();

  const deduction = deductions.find((deduction) => deduction.id === +id);

  const onDeductionEdited = (data: any) => {
    editDeduction({ ...data, id: +id });
  };

  return <DeductionsForm deduction={deduction} onSave={onDeductionEdited} />;
}
