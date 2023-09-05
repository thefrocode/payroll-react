import { AgGridReact } from "ag-grid-react";
import { TReportNHIF } from "../../shared/interfaces/report";
import { useCurrentReportsSource } from "../store/reports-current";
export function ReportsNHIF() {
  const { data: rowData } = useCurrentReportsSource();
  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TReportNHIF).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
      <AgGridReact
        rowData={rowData} // Row Data for Rows
        columnDefs={columnDefs}
      />
    </div>
  );
}
