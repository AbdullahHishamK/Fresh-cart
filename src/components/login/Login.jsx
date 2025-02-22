import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { useAuth } from "../auth/AuthContext"; // Ensure this path is correct

const Login = () => {
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const user = {
    email: "",
    password: "",
  };

  async function handleLogin(values) {
    setisloading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      toast.success(data.message);
      setisloading(false);
      login();
      navigate("/home"); 
    } catch (error) {
      toast.error(error.response.data.message);
      setisloading(false);
    }
  }

  const validyup = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: handleLogin,
    validationSchema: validyup,
  });

  return (
    <div className="py-7 mt-32">
      <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">
          {" "}
          Login
        </h1>

        <div className="w-[60%] mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="py-2.5 px-5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Login
              </button>
              <button
                type="button"
                className="py-2.5 px-5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
              >
                Forget My Password
              </button>
            </div>
            {isloading ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : ""}
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;