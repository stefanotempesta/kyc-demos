import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import './form.css';
import axios from 'axios';

const Form = ({ setAccessToken, userId, setUserId, applicantEmail, setApplicantEmail, setApplicantPhone }) => {
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    setInitialValues({
      name: userId || "",
      email: applicantEmail || "",
      phoneNo: "",
    });
  }, [userId, applicantEmail]);

  const fetchAccessToken = async () => {
    try {
      setLoading(true);
      console.log('email', applicantEmail);
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/SumSubAccessToken`, {
        userName: userId,
        email: applicantEmail,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Access Token Response:", response.data);
      setAccessToken(response?.data?.token);
    } catch (error) {
      console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // Enable reinitialization of values when `initialValues` change
    onSubmit: (values, action) => {
      try {
        setApplicantEmail(values.email);
        setApplicantPhone(values.phoneNo);
        setUserId(values.name);
        fetchAccessToken();
      } catch (error) {
        console.error('Error in form submission:', error);
      }
    },
  });

  return (
    <div className="mainCon">
      <div className="wrapper">
        <h2>Enter details</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              required
              disabled="true"
            />
          </div>
          <div className="input-box">
            <input
              type="tel"
              name="phoneNo"
              value={formik.values.phoneNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="input-box button">
            <button type="submit">
              {loading ? <div className="spinner"></div> : 'Verifiy your identity'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
