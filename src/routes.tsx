import { Home } from "./home";
import { DeductionsAdd } from "./modules/deductions/features/deductions-add";
import { DeductionsEdit } from "./modules/deductions/features/deductions-edit";
import { DeductionsList } from "./modules/deductions/features/deductions-list";
import { EmployeesAdd } from "./modules/employees/features/employees-add";
import { EmployeesEdit } from "./modules/employees/features/employees-edit";
import { EmployeesList } from "./modules/employees/features/employees-list";
import { IncomesAdd } from "./modules/income/features/incomes-add";
import { IncomesEdit } from "./modules/income/features/incomes-edit";
import { IncomesList } from "./modules/income/features/incomes-list";

export const routes = [
  {
    path: "/employees",

    children: [
      {
        path: "/",
        element: (
          <>
            <EmployeesList />
          </>
        ),
      },
      {
        path: "/edit/:id",
        element: <EmployeesEdit />,
      },
      {
        path: "/add",
        element: <EmployeesAdd />,
      },
    ],
  },

  {
    path: "/incomes",
    element: <Home />,
    children: [
      {
        path: "/",
        element: (
          <>
            <IncomesList />
          </>
        ),
      },
      {
        path: "/edit/:id",
        element: <IncomesEdit />,
      },
      {
        path: "/add",
        element: <IncomesAdd />,
      },
    ],
  },
  {
    path: "/deductions",
    element: <Home />,
    children: [
      {
        path: "/",
        element: (
          <>
            <DeductionsList />
          </>
        ),
      },
      {
        path: "/edit/:id",
        element: <DeductionsEdit />,
      },
      {
        path: "/add",
        element: <DeductionsAdd />,
      },
    ],
  },
];
