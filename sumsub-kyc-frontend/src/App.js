import { useState, useEffect } from "react";
import "./App.css";
import SumSubSDK from "./components/SumSubSDK/SumSubSDK";
import Form from "./components/form/Form";
import Register from "./components/register/Register";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [userId, setUserId] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/sdk" && !token) {
      navigate("/");
    }
  }, [location.pathname, accessToken, navigate, token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Register setApplicantEmail={setApplicantEmail} setToken={setToken}/>} />
  
        <Route
          path="/sdk"
          element={
            <div className="app-container">
              {accessToken ? (
                <SumSubSDK
                  accessToken={accessToken}
                  applicantEmail={applicantEmail}
                  applicantPhone={applicantPhone}
                />
              ) : (
                <Form
                  setAccessToken={setAccessToken}
                  setUserId={setUserId}
                  userId={userId}
                  setApplicantEmail={setApplicantEmail}
                  setApplicantPhone={setApplicantPhone}
                  applicantEmail={applicantEmail}
                />
              )}
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
