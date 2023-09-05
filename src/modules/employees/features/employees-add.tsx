import { useEmployee } from "../store";
import { EmployeesForm } from "../ui/employees-form";

export function EmployeesAdd() {

  const { addEmployee } = useEmployee();
  const onEmployeeAdded = (data: any) => {
    addEmployee(data);
  };

  return (<EmployeesForm onSave={onEmployeeAdded}/>);
}
