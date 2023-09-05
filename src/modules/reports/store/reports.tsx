import { useCallback, useMemo, useReducer } from "react";
import { useCurrentReportsSource } from "./reports-current";
import { useSavedReportsSource } from "./reports-saved";

export function useReportsSource(){

   interface IFilterReport{
        employee_id?: number;
        month?: number;
        year?: number;
   }

    const [state, dispatch] = useReducer(
        (state:IFilterReport, action:any) => ({
          ...state,
          ...action,
        }),
        {
          employee_id: "",
          month: "",
          year: "",
        }
      );

    const { data: saved_reports } = useSavedReportsSource(state);
    const { data: current_reports} = useCurrentReportsSource();

    const reports = useMemo(()=>{
        if(state.employee_id || state.month || state.year){
            return saved_reports
        }else{
            return current_reports
        }
    },[state, saved_reports, current_reports])
    

    return { employeeIncomeDeduction: reports, dispatch };
}