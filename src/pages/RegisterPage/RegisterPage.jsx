import ErrorMessage from "@/components/Error/ErrorMessage";
import { signup } from "@/services/authService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (formData) => {
    const { email, password } = formData;

    setLoading(true);
    setErrorMessage("");
    try {
      await signup({ email, password });
      setLoading(false);
      navigate("/login");
      toast.success("Đăng ký thành công");
    } catch (error) {
      const errorCode = error.response?.data.errorCode;
      if (errorCode === 4001) {
        setErrorMessage("Email này đã được xử dụng");
        setFocus("email");
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
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
            className={`rounded-sm border border-gray-300 px-3 py-2 outline-none ${errors.email || (errorMessage && "border-red-500")}`}
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

        {(errors.email || errorMessage) && (
          <ErrorMessage message={errors?.email?.message || errorMessage} />
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

        {errors.password && <ErrorMessage message={errors.password.message} />}

        <div className="relative mt-5 flex flex-col gap-3">
          <label htmlFor="">Nhập lại mật khẩu</label>
          <input
            className={`rounded-sm border border-gray-300 px-3 py-2 outline-none ${errors.confirmPassword && "border-red-500"}`}
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="Nhập lại mật khẩu"
            {...register("confirmPassword", {
              validate: {
                match: (currentValue) =>
                  currentValue === watch("password") ||
                  "Mật khẩu nhập lại không đúng",
              },
            })}
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            type="button"
            className="absolute right-4 top-1/2 translate-y-1/2"
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="text-lg" />
            ) : (
              <IoEyeSharp className="text-lg" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}

        <div className="mt-10">
          <button
            className="w-full rounded-sm bg-primary py-2 text-white hover:opacity-90"
            type="submit"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Đăng ký"
            )}
          </button>
        </div>

        <div className="mt-8">
          <span>
            Bạn dã có tài khoản?{" "}
            <Link className="text-primary" to="/login">
              Đăng nhập
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
