import Task from "../components/Task/Task";
import LayoutComponent from "../Layout/Layout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const routes = [
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <LayoutComponent />,
        children: [
            {
                path: 'task',
                element: <Task />
            }
        ]
    },
    {   
        path: '/register',
        element: <Register />
    },
]

export default routes;