import { useEmployeeSource } from "../store";
import { EmployeesForm } from "../ui/employees-form";

export function EmployeesAdd() {

  const { addEmployee } = useEmployeeSource();
  const onEmployeeAdded = (data: any) => {
    addEmployee(data);
  };

  return (<EmployeesForm onSave={onEmployeeAdded}/>);
}
