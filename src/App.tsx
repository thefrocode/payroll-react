import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { routes } from "./routes";
import { ActiveProvider } from "./modules/shared/store/active";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      refetchOnWindowFocus: false,
      //staleTime: 1000 * 60 * 5,
    },
    
  },
});
const location = new ReactLocation();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ActiveProvider>
          <Router location={location} routes={routes}>
            <div>
              <Outlet />
            </div>
          </Router>
        </ActiveProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
