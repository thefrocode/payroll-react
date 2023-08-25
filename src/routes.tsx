import { EmployeesEdit } from "./modules/employees/components/employees-edit";
import { EmployeesList } from "./modules/employees/components/employees-list";

export const routes = [
    {
      path: "/",
      element: (
        <>
          <EmployeesList/>
        </>
      ),
    },
    {
      path: "/employees/:id",
      element: <EmployeesEdit />,
    },
  ];