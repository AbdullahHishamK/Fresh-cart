import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";

const Register = () => {

  const [isloading , setisloading] = useState(false);
  const navigate = useNavigate();

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  }

  async function Signup(values){
    setisloading(true)
    try{
      const {data} =  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
      toast.success(data.message);
      setisloading(false);
      navigate('/login'); // Navigate to login page after successful registration
    }catch(error){
      toast.error(error.response.data.message);
      setisloading(false);
    }
  }

  const validyup = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    rePassword: Yup.string()
      .required("Re-Password is required")
      .oneOf([Yup.ref('password'), null], "Passwords must match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits"),
  });

  const formik = useFormik({
    initialValues: user,
    onSubmit: Signup,
    validationSchema: validyup,
  })

  return (
    <div className="py-7 mt-32">
      <div className="container mx-auto">
        <h1 className="text-green-700 text-6xl font-bold text-center mb-12">
          {" "}
          Register Now
        </h1>
        
        <div className="w-[60%] mx-auto">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
              Name :
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
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
            <div className="mb-5">
              <label
                htmlFor="re-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
              Re-Password :
              </label>
              <input
                type="password"
                id="re-password"
                name="rePassword"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
              />
              {formik.touched.rePassword && formik.errors.rePassword ? (
                <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
              ) : null}
            </div>
            <div className="mb-5">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
              Phone :
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              ) : null}
            </div>
            <button type="submit" className="py-2.5 px-5 me-2 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Register Now</button>
            {isloading ? <i className=" fa-solid fa-spin fa-spinner text-white"></i> : ""}
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;