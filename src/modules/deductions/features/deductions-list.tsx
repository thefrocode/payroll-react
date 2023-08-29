import { AgGridReact } from "ag-grid-react";
import { Link } from "@tanstack/react-location";
import { useDeductionSource } from "../store/deduction";
import { TDetailedDeduction } from "../../shared/interfaces/deduction";

export function DeductionsList() {
  const { detailed_deductions, removeDeduction } = useDeductionSource();

  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TDetailedDeduction).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));
  columnDefs.push({
    field: "id",
    headerName: "Delete",
    cellRenderer: (params: any) => {
      return (
        <Link key={params.value} to={`/deductions/edit/${params.value}`}>
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
        <button key={params.value} onClick={() => removeDeduction(params.value)}>
          Edit
        </button>
      );
    },
  });

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
      <Link to="/deductions/add">Add</Link>

      <AgGridReact
        rowData={detailed_deductions} // Row Data for Rows
        columnDefs={columnDefs}
      />
    </div>
  );
}
