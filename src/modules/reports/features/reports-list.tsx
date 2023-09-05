import { AgGridReact } from "ag-grid-react";
import { useEmployeeSource } from "../../employees/store";
import { TReport } from "../../shared/interfaces/report";
import { useReportsSource } from "../store/reports";
import { months } from "../../shared/interfaces/months";
import { years } from "../../shared/interfaces/years";
import { ChangeEvent } from "react";
export function ReportsList() {
  const { employeeIncomeDeduction: rowData, dispatch } = useReportsSource();
  const { employees } = useEmployeeSource();
  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TReport).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));

  const handleChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = target;
    dispatch({ [name]: value });
  };

  return (
    <>
      <select onChange={handleChange} name="employee_id">
        <option value=""></option>
        {employees &&
          employees.map((employee: any) => {
            return (
              <option key={employee.id} value={employee.id}>
                {employee.first_name} {employee.second_name}
              </option>
            );
          })}
      </select>
      
      <select onChange={handleChange} name="month">
        <option value="">Select Month</option>
        {months.map((month: any) => {
          return (
            <option key={month.id} value={month.id}>
              {month.name}
            </option>
          );
        })}
      </select>
      <select
      onChange={handleChange} name="year">
        <option value="">Select Year</option>
        {years.map((year: any) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>

      <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}
