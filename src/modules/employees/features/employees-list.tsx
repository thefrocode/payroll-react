import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { useEmployeeSource } from "../store";
import { TEmployee } from "../../shared/interfaces/employee";



export function EmployeesList() {
  const { employees } = useEmployeeSource();

  const columnDefs:{
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TEmployee).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key
  }));
  columnDefs.push({
    field: "id",
    headerName: "Edit",
    cellRenderer: (params: any) => {
      return (
        <Link key={params.value} to={`/employees/edit/${params.value}`}>
          Edit
        </Link>
      );
    },
  });



  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
      <Link to="/employees/add">Add</Link>

      <AgGridReact
        rowData={employees} // Row Data for Rows
        columnDefs={columnDefs}
      />
    </div>
  );
}
