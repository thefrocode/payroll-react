import { useReportsSource } from "../store";
export function ReportsList(){
    const { employeeIncomeDeduction } = useReportsSource();
    
    return <div>Reports List</div>
}