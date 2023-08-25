import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { useEmployeeSource } from "../store";

export function EmployeesList() {
  const { employees } = useEmployeeSource();

  const columnDefs = [
    {
      headerName: "ID",
      field: "id",
    },
    {
      headerName: "First Name",
      field: "first_name",
    },
    {
      headerName: "Last Name",
      field: "last_name",
    },
    {
      headerName: "First Id Number",
      field: "id_number",
    },
    {
      headerName: "Email",
      field: "email",
    },
    {
      headerName: "Phone",
      field: "phone",
    },
    {
      field: "id",
      headerName: "Edit",
      cellRenderer: (params: any) => {
        return <Link key={params.value} to={`/employees/${params.value}`}>Edit</Link>
      },
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
      <AgGridReact
        rowData={employees} // Row Data for Rows
        columnDefs={columnDefs}
      />
    </div>
  );
}
