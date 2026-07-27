import DashboardIcon from "@mui/icons-material/Dashboard";
import { Task } from "@mui/icons-material";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import MyTasks from "../pages/MyTasks";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Signup from "../pages/Signup"
export const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path = "/app" element = {<Layout />}>
            <Route index element= {<Dashboard/>} />
            <Route path = 'tasks' element= {<MyTasks/>} />
            <Route path='settings' element= {<Settings/>} />
            <Route path = '*' element= {<NotFound/>} />
        </Route>
      </>
    )
)

