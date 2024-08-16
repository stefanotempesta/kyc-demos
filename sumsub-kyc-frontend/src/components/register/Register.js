import React, { useState } from "react";
import "./register.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().required("Required"),
});

function Register({ setApplicantEmail, setToken }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createUser = async function (values) {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration Response:", response.data);
      setToken(response.data.token);
      setApplicantEmail(response.data.email);
      navigate("/sdk");
    } catch (error) {
      console.error(
        "Error in registration:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, action) => {
      createUser(values);
      action.resetForm();
    },
  });

  return (
    <div className="mainCon">
      <div className="wrapper">
        <h2>Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter Password"
              required
              autoComplete="off"
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="input-box button">
            <button type="submit">
              {loading ? <div className="spinner"></div> : "Register/Sign-In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
