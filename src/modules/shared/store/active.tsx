import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { createActiveMonth, fetchActiveMonth } from "../data-access/api/shared";

export function useShared() {
  const { data: active_month, error } = useQuery(
    ["active_month"],
    fetchActiveMonth
  );

  const { mutate: addActiveMonth } = useMutation({
    mutationFn: createActiveMonth,
    onError: (error) => {},
  });

  const currentDate = new Date();
  useEffect(() => {
    if (!active_month) {
      addActiveMonth({
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
      });
    }
  }, [active_month]);
  
  console.log(active_month);
  return { active_month };
}
