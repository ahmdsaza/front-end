import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/Website/HomePage";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Users from "./Pages/Dashboard/Users";
import GoogleCallback from "./Pages/Auth/GoogleCallback";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/RequireAuth";
import User from "./Pages/Dashboard/User";
import AddUser from "./Pages/Dashboard/AddUser";
import Err403 from "./Pages/Auth/403";
import Writer from "./Pages/Auth/Writer";

function App() {
  return (
    <div className="App">
      {/* Public Routes */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Admin */}
          <Route element={<RequireAuth allowedRole={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>

          {/* Writer */}
          <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
            <Route path="writer" element={<Writer />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
