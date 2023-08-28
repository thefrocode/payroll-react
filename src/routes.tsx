import { EmployeesAdd } from "./modules/employees/features/employees-add";
import { EmployeesEdit } from "./modules/employees/features/employees-edit";
import { EmployeesList } from "./modules/employees/features/employees-list";

export const routes = [
  {
    path: "/",
    element: (
      <>
        <EmployeesList />
      </>
    ),
  },
  {
    path: "/employees/edit/:id",
    element: <EmployeesEdit />,
  },
  {
    path: "/employees/add",
    element: <EmployeesAdd />,
  },
];
