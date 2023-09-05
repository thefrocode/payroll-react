import { useQuery } from "@tanstack/react-query";
import { fetchSavedReports } from "../../shared/data-access/api/reports";

export function useSavedReportsSource(state: any) {
  const filteredState = filterFalsy(state);
  const { data } = useQuery(
    ["reports", { ...filteredState }],
    fetchSavedReports,
    {
      initialData: [],
    }
  );

  console.log("Saved State", state);
  console.log("Saved Reports", data);
  return { data };
  function filterFalsy(obj: { [x: string]: any }) {
    return Object.keys(obj).reduce((acc: any, key) => {
      if (obj[key]) {
        acc[key] = obj[key];
      }

      return acc;
    }, {});
  }
}
