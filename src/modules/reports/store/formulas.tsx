import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchFormulas } from "../../shared/data-access/api/formulas";

export function useFormulasSource() {
  const queryClient = useQueryClient();
  const { data: formulas, error } = useQuery(["formulas"], fetchFormulas, {
    initialData: [],
  });

  const formattedFormulas = useMemo(() => {
    return formulas.map((formula) => {
      return {
        ...formula,
        name: formula.name.replace(/\s+/g, '_').toLocaleLowerCase(),
      };
    });
  }, [formulas]);
 

  return { formulas:formattedFormulas, error };
}
