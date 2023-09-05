import { useQuery } from "@tanstack/react-query";
import { useCallback, useReducer } from "react";
import { fetchSavedReports } from "../../shared/data-access/api/reports";
import { IFilterReport } from "../../shared/interfaces/reports-filter";

export function useSavedReportsSource() {
  
  const [state, dispatch] = useReducer(
    (state: IFilterReport, action: any) => ({
      ...state,
      ...action,
    }),
    {
      employee_id: "",
      month: "",
      year: "",
    }
  );
  const filteredState = filterFalsy(state);
  const { data } = useQuery(
    ["reports", { ...filteredState }],
    fetchSavedReports,
    {
      initialData: [],
    }
  );

  const filterReports= useCallback((params: IFilterReport) => {
    dispatch(params)
  },[])
  

  console.log("Saved State", state);
  console.log("Saved Reports", data);
  return { data, filterReports };

  function filterFalsy(obj: { [x: string]: any }) {
    return Object.keys(obj).reduce((acc: any, key) => {
      if (obj[key]) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }
}
