import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Employee } from "../shared/interfaces/employee";
import fs from "fs";
export function useEmployeeSource(): {
  employees: Employee[];
  error: any;
} {
  const queryClient = useQueryClient();
  const { data: employees, error } = useQuery(
    ["employees"],
    () => fetch("http://localhost:3001/employees").then((res) => res.json()),
    {
      initialData: [],
    }
  );
//   const mutation = useMutation({
//     mutationFn: () => ,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });
  return { employees, error };
}
