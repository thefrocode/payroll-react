import { useEmployeeSource } from "../store";
import { useMatch } from "@tanstack/react-location";
import { EmployeesForm } from "../ui/employees-form";

export function EmployeesEdit(){
    const {
        params: { id },
      } = useMatch();
    const { employees } = useEmployeeSource();

    const employee = employees.find((employee) => employee.id === +id);

    const onEmployeeEdited = (data: any) => {
        console.log("Edit",data);
      };
    
    
    return(
        <EmployeesForm employee={employee} onSave={onEmployeeEdited}/>
    )
}