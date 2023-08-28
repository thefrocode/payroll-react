import { EmployeesForm } from "../ui/employees-form";

export function EmployeesAdd() {
  const onEmployeeAdded = (data: any) => {
    console.log("Add",data);
  };

  return <EmployeesForm onSave={onEmployeeAdded}/>;
}
