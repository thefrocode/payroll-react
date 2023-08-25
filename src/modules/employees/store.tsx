import { useQuery } from "@tanstack/react-query";
import { Employee } from "../shared/interfaces/employee";
export function useEmployeeSource():{
    employees: Employee[],
    error: any
} {

  
    const { data: employees, error  } = useQuery(
        ["employees"],
        () => fetch("./employees.json").then((res) => res.json()),
        {
            initialData: [],
        }

    );
    return { employees, error}
}