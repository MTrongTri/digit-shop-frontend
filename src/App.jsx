import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import RegisterPage from "@/pages/RegisterPage/RegisterPage";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import NotFoundPage from "@/pages/ErrorPage/NotFoundPage";
import ProductDetailPage from "@/pages/ProductDetailPage/ProductDetailPage";
import CartPage from "@/pages/CartPage/CartPage";
import PrivateRoute from "@/components/Routes/PrivateRoute";
import AuthLayout from "@/components/layouts/AuthLayout/AuthLayout";
import { Toaster } from "react-hot-toast";
import AdminLayout from "@/components/layouts/AdminLayout/AdminLayout";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import CategoriesPage from "@/pages/Admin/Category/CategoriesPage";
import CreateCategoryPage from "@/pages/Admin/Category/CreateCategoryPage";
import PrivateAdminRoute from "./components/Routes/PrivateAdminRoute";
import ForbiddenPage from "./pages/ErrorPage/ForbiddenPage";
import ServerErrorPage from "./pages/ErrorPage/ServerErrorPage";
import ProductPage from "./pages/Admin/Product/ProductPage";
import CreateProductPage from "./pages/Admin/Product/CreateProductPage";

function App() {
  return (
    <div className="bg-[#F5F5FA]">
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
            <Route path="/forbidden" element={<ForbiddenPage />}></Route>
            <Route path="/server-error" element={<ServerErrorPage />}></Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Route>

          <Route
            path="/admin"
            element={
              <PrivateAdminRoute>
                <AdminLayout />
              </PrivateAdminRoute>
            }
          >
            <Route path="" element={<AdminDashboard />}></Route>
            <Route path="dashboard" element={<AdminDashboard />}></Route>
            <Route path="categories" element={<CategoriesPage />}></Route>
            <Route
              path="categories/create"
              element={<CreateCategoryPage />}
            ></Route>
            <Route path="products" element={<ProductPage />}></Route>
            <Route
              path="products/create"
              element={<CreateProductPage />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
