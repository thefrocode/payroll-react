import { useEmployeeSource } from "../store";
import { useMatch } from "@tanstack/react-location";

export function EmployeesEdit(){
    const {
        params: { id },
      } = useMatch();
    const { employees } = useEmployeeSource();

    const employee = employees.find((employee) => employee.id === +id);
    return(
        <div>
            {JSON.stringify(employee)}
        </div>
    )
}