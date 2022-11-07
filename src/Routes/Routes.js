import { createBrowserRouter } from "react-router-dom";
import DonateForm from "../components/Donation/DonateForm";
import Donates from "../components/Donation/Donates";
import EventDetails from "../components/Home/EventDetails";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login/Login";
import Register from "../components/Login/Register/Register";
import Main from "../layout/Main";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path:'/',
                element: <Home></Home>
            },
            {
                path: '/event/:id',
                element: <EventDetails></EventDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/event/${params.id}`)
            },
            {
                path: '/donate/:id',
                element: <DonateForm></DonateForm>,
                loader: ({params}) => fetch(`http://localhost:5000/event/${params.id}`)
            },
            {
                path: '/donates',
                element: <PrivateRoute><Donates></Donates></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    }
])