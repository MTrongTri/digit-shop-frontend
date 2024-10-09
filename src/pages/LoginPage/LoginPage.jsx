import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";

import { BiError } from "react-icons/bi";
import { login } from "@/services/authService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "@/stores/userSlice";

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
      localStorage.setItem("userInfo", JSON.stringify(data));
      userDispatch(setUser(data));

      let redirectTo = "/";
      const { roles } = data.user;
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
        className="mx-auto mt-10 w-[400px] rounded-sm px-5 py-8 pb-20 shadow-[0_0px_8px_rgb(0,0,0,0.2)]"
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
        {errors.email && (
          <div className="mt-1">
            <span className="flex items-center gap-1 text-xs text-red-500">
              <BiError className="text-sm" /> {errors.email.message}
            </span>
          </div>
        )}
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

        {errors.password && (
          <div className="mt-1">
            <span className="flex items-center gap-1 text-xs text-red-500">
              <BiError className="text-sm" /> {errors.password.message}
            </span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-6">
            <span className="flex items-center gap-1 text-xs text-red-500">
              <BiError className="text-sm" /> {errorMessage}
            </span>
          </div>
        )}

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
