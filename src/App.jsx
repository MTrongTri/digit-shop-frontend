import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@/pages/CartPage/CartPage";
import PrivateRoute from "@/components/PrivateRoute";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
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
    </>
  );
}

export default App;
