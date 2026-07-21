import DashboardIcon from "@mui/icons-material/Dashboard";
import { Settings, Task } from "@mui/icons-material";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import MyTasks from "../pages/MyTasks";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path = "/" element = {<Layout />}>
            <Route index element= {<Dashboard/>} />
            <Route path = '/tasks' element= {<MyTasks/>} />
            <Route path='/settings' element= {<Settings/>} />
            <Route path = '*' element= {<NotFound/>} />
        </Route>
    )
)

