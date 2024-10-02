import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "@/components/layouts/MainLayout";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import HomePage from "@/pages/HomePage/HomePage";
import AuthLayout from "@/components/layouts/AuthLayout";
import LoginPage from "@/pages/LoginPage/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@/pages/CartPage/CartPage";
import PrivateRoute from "@/components/Routes/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="product/:id" element={<ProductDetailPage />}></Route>
          <Route
            path="cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
