import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/LayoutComponents.jsx"
import IndexPage from "../Components/Index.jsx"
import Recipes from "../Components/Recipes.jsx"
import {Unauthorized} from "../Components/Unauthorized.jsx";
import {CreateHousehold} from "../Components/CreateHousehold.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <IndexPage />
            },
            {
                path: "recipes",
                element: <Recipes />
            },
            {
                path: "unauthorized",
                element: <Unauthorized />
            },
            {
                path: "create-household",
                element: <CreateHousehold />
            }
        ]
    }

])

export default router;