import { createBrowserRouter } from "react-router-dom";
import EventDetails from "../components/Home/EventDetails";
import Home from "../components/Home/Home";
import Main from "../layout/Main";

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
            }
        ]
    }
])