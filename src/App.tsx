import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import { Route, Routes } from "react-router-dom";

import { useQueryClient, QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
