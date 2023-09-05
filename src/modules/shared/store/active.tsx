import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect } from "react";
import { createActiveMonth, fetchActiveMonth } from "../data-access/api/shared";

export function useSharedSource() {
  const { data: active_month, error } = useQuery(
    ["active_month"],
    fetchActiveMonth,
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

  
  return { active_month };
  
}
const ActiveContext = createContext<ReturnType<typeof useSharedSource>>(
  {} as unknown as ReturnType<typeof useSharedSource>
);

export function useShared() {
  return useContext(ActiveContext);
}
export function ActiveProvider({ children }: { children: React.ReactNode }) {
  return (
    <ActiveContext.Provider value={useSharedSource()}>
      {children}
    </ActiveContext.Provider>
  );
}
