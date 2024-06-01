import { Button, useColorMode } from "@chakra-ui/react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ActiveOrders from "./pages/ActiveOrders";
import CompletedOrders from "./pages/CompletedOrders";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Login from "./pages/Login";
import AllProducts from "./pages/AllProducts";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div style={{ height: "100vh" }}>
      {isAuthenticated ? (
        <>
          <Button
            style={{ position: "fixed", bottom: "30px", right: "30px" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {!isLoginPage && <Header />}
          <Routes>
            <Route path="/" element={<ActiveOrders />} />
            <Route path="/completed" element={<CompletedOrders />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
            <Route path="/login" element={<Navigate to={"/"} replace />} />
          </Routes>
        </>
      ) : (
        <>
          <Button
            style={{ position: "fixed", bottom: "30px", right: "30px" }}
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Routes>
            <Route path="*" element={<Navigate to={"/login"} replace />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
