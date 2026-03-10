import { Route, Routes } from "react-router-dom";
import Layout from "./components/ui/Layout";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/blog" element={<Blog />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
