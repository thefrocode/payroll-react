import { AgGridReact } from "ag-grid-react";
import { useEmployeeSource } from "../../employees/store";
import { TReport } from "../../shared/interfaces/report";

import { useCurrentReportsSource } from "../store/reports-current";
export function ReportsList() {
  const { data: rowData } = useCurrentReportsSource();
  const columnDefs: {
    headerName: string;
    field: string;
    cellRenderer?: (params: any) => any;
  }[] = Object.keys(TReport).map((key) => ({
    headerName: key.replace("_", " ").toString().toLocaleUpperCase(),
    field: key,
  }));

  return (
    <>
      <h6 className="text-lg text-bold">Reports</h6>
      <div className="my-5 flex justify-between w-3/4 "></div>

      <div className="ag-theme-alpine" style={{ height: 500, width: 1000 }}>
        <AgGridReact
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
}
