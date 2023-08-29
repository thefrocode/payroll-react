import { useQuery} from "@tanstack/react-query";
import { fetchDeductionTypes } from "../../shared/data-access/api/deduction-types";
import { DeductionType } from "../../shared/interfaces/deduction-type";

export function useDeductionTypeSource(): {
  deduction_types: DeductionType[];
  error: any;
} {
  const { data: deduction_types, error } = useQuery(
    ["deduction_types"],
    fetchDeductionTypes,
    {
      initialData: [],
    }
  );

  return { deduction_types, error };
}
