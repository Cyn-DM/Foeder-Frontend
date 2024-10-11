import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../Components/LayoutComponents.jsx"
import IndexPage from "../Components/Index.jsx"
import Recipes from "../Components/Recipes.jsx"

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
            }
        ]
    }

])

export default router;