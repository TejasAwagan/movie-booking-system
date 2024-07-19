import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// import Admin from "./components/Auth/Admin";
// import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AddMovie from "./components/Movies/AddMovie";
import Movies from "./components/Movies/Movies";
import AdminProfile from "./profile/AdminProfile";
import UserProfile from "./profile/UserProfile";
import { adminActions, userActions } from "./store/index";
import ResetPasswordForm from "./profile/ResetPasswordForm";
import Signup from "./components/Signup";
import Login from "../src/components/Login/index"
// import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminLogin from "./components/AdminLogin/adminLogin.jsx";
import AllUsersData from "./components/GetAllUsersData/AllUsersData.js";
// import ErrorBoundary from "./components/ErrorBoundary.js"

function App() {
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);
  
  return (
    <div>
      {/* <ErrorBoundary> */}
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          {!isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {isUserLoggedIn && !isAdminLoggedIn && (
            <>
              {" "}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/reset-password/" element={<ResetPasswordForm />} />
            </>
          )}
          {isAdminLoggedIn && !isUserLoggedIn && (
            <>
              {" "}
              <Route path="/add" element={<AddMovie />} />
              <Route path="/user-admin" element={<AdminProfile />} />{" "}
              <Route path="/user-bookings" element={<AllUsersData />} />
            </>
          )}
        </Routes>
      </section>
      {/* </ErrorBoundary> */}
    </div>
  );
}

export default App;
