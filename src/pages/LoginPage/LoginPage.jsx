import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { login } from "@/services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/userSlice";
import ErrorMessage from "@/components/Error/ErrorMessage";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const userDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    const { email, password } = formData;

    setErrorMessage("");
    setLoading(true);

    const { statusCode, code, data } = await login({ email, password });

    setLoading(false);

    if (statusCode === 200) {
      const { accessToken, refreshToken, user } = data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      localStorage.setItem("userInfo", JSON.stringify(user));
      userDispatch(setUser(user));

      let redirectTo = "/";
      const { roles } = user;
      if (roles.includes("ADMIN")) {
        redirectTo = "/products/1";
      }

      if (location.state?.from?.pathname) {
        redirectTo = location.state.from.pathname;
      }

      navigate(redirectTo, { replace: true });
      toast.success("Đăng nhập thành công");
    } else if (code === 2000) {
      setErrorMessage("Email hoặc mật khẩu không đúng");
    } else {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mt-10 w-[400px] rounded-sm bg-white px-5 py-8 pb-20 shadow-[0_0px_8px_rgb(0,0,0,0.2)]"
      >
        <h2 className="text-center text-3xl font-bold">Đăng nhập</h2>
        <div className="mt-5 flex flex-col gap-3">
          <label htmlFor="">Email</label>
          <input
            className={`rounded-sm border border-gray-300 px-3 py-2 outline-none ${errors.email && "border-red-500"}`}
            type="text"
            placeholder="ex: email@gmail.com"
            {...register("email", {
              required: "Email không được bỏ trống",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email không đúng định dạng",
              },
            })}
          />
        </div>
        {errors.email && <ErrorMessage message={errors.email.message} />}
        <div className="relative mt-5 flex flex-col gap-3">
          <label htmlFor="">Mật khẩu</label>
          <input
            className={`rounded-sm border border-gray-300 px-3 py-2 outline-none ${errors.password && "border-red-500"}`}
            type={!showPassword ? "password" : "text"}
            placeholder="Mật khẩu"
            {...register("password", {
              required: "Mật khẩu không được bỏ trống",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 kí tự",
              },
            })}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-4 top-1/2 translate-y-1/2"
          >
            {showPassword ? (
              <FaEyeSlash className="text-lg" />
            ) : (
              <IoEyeSharp className="text-lg" />
            )}
          </button>
        </div>

        {errors.password && <ErrorMessage message={errors.password.message} />}

        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div className="mt-10 flex items-center">
          <button
            className={`w-full rounded-sm bg-primary py-2 text-white hover:opacity-90 ${loading && "cursor-not-allowed"}`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </div>

        <div className="mt-8">
          <span>
            Bạn chưa có tài khoản?{" "}
            <Link className="text-primary" to="/register">
              Đăng ký
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
