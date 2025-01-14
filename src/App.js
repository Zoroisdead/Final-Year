import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import ExploreBikes from './pages/User/ExploreBikes';
import Rent from './pages/User/Rent';
import './App.css';
import './Admin.css';
import CheckOut from './pages/User/CheckOut';
import Events from './pages/User/Events';
import EventInfo from './pages/User/EventsInfo';
import About from './pages/User/About';
import Contact from './pages/User/Contact';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/SignUp';
import Footer from './components/Footer';
import Layout from "./pages/Admin/theme/Layout";
import UserManagement from "./pages/Admin/BikeManagement/UserManagement";
// import AddUser from "./pages/Admin/UserManagement/AddUser";
// import Faq from "./pages/Faq";
// import Contact from "./pages/Contact";
// import UserDetail from "./pages/Admin/UserManagement/UserDetail";
// import Login from "./pages/Auth/Login";
// import PrivateRoute from "./routes/PrivateRoute";
// import UserDelete from "./pages/Admin/UserManagement/UserDelete";

// Bike Management
import AddBike from "./pages/Admin/BikeManagement/AddBike";
import EditBike from "./pages/Admin/BikeManagement/EditBike";
import ViewBikes from "./pages/Admin/BikeManagement/ViewBikes";
import AvailableBikes from "./pages/Admin/BikeManagement/AvailableBikes";
import RentedBikes from "./pages/Admin/BikeManagement/RentedBikes";
import AdminDashboard from './pages/Admin/BikeManagement/AdminDahboard';
import UserProfile from './pages/User/UserProfile';
import Payment from './pages/User/Payment';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/explore-bikes" element={<ExploreBikes />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/eventsinfo" element={<EventInfo />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/footer" element={<Footer />} />

        <Route path="/admin" element={<Layout />}>
          {/* <Route path="user-management" element={<UserManagement />} /> */}
          <Route path="bike-management/add" element={<AddBike />} />
          <Route path="bike-management/edit/:id" element={<EditBike />} />
          <Route path="bike-management/view" element={<ViewBikes />} />
          <Route path="bike-management/available" element={<AvailableBikes />} />
          <Route path="rented-bikes" element={<RentedBikes />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
