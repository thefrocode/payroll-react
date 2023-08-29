import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { useIncomeSource } from "../store/income";
import { TDetailedIncome } from "../../shared/interfaces/income";

export function IncomesList() {
  const { detailed_incomes, removeIncome } = useIncomeSource();

  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TDetailedIncome).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));
  columnDefs.push({
    field: "id",
    headerName: "Delete",
    cellRenderer: (params: any) => {
      return (
        <Link key={params.value} to={`/incomes/edit/${params.value}`}>
          Edit
        </Link>
      );
    },
  });
  columnDefs.push({
    field: "id",
    headerName: "Delete",
    cellRenderer: (params: any) => {
      return (
        <button key={params.value} onClick={() => removeIncome(params.value)}>
          Edit
        </button>
      );
    },
  });

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
      <Link to="/incomes/add">Add</Link>

      <AgGridReact
        rowData={detailed_incomes} // Row Data for Rows
        columnDefs={columnDefs}
      />
    </div>
  );
}
