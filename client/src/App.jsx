import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import AddDocument from "./pages/AddDocument";
import Renewals from "./pages/Renewals";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Help from "./pages/Help";
import EditDocument from "./pages/EditDocument";
import ViewDocument from "./pages/ViewDocument";


import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/add" element={<AddDocument />} />
          <Route path="/renewals" element={<Renewals />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
       <Route path="/documents/:id/edit" element={<EditDocument />}/>
       <Route path="/documents/:id" element={<ViewDocument />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;