import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EmployeesList } from "./modules/employees/features/employees-list";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  useMatch,
} from "@tanstack/react-location";
import { routes } from "./routes";
import { useShared } from "./modules/shared/store/active";

const queryClient = new QueryClient();
const location = new ReactLocation();
function App() {
  
  return (
    <div style={{ height: 500, width: 500 }}>
      <QueryClientProvider client={queryClient}>
        <Router location={location} routes={routes}>
          <div className="mx-auto max-w-3xl">
            <Outlet />
          </div>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
