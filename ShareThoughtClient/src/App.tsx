import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./routes/router.tsx";
import { useAuth } from "./providers/AuthProvider.tsx";

const App = () => {
  const { isAuthenticated } = useAuth();
  const router = createRouter(isAuthenticated);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
