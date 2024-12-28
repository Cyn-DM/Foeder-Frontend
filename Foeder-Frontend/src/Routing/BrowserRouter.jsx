import {createBrowserRouter,} from "react-router-dom";
import Root from "../Components/LayoutComponents.jsx"
import IndexPage from "../Components/Index.jsx"
import Recipes from "../Components/Recipes.jsx"
import {Unauthorized} from "../Components/Unauthorized.jsx";
import {CreateHousehold} from "../Components/CreateHousehold.jsx";
import Household from "../Components/Household.jsx";
import InviteUser from "../Components/InviteUser.jsx";
import Invites from "../Components/Invites.jsx";
import AddRecipe from "../Components/AddRecipe.jsx";
import {Recipe} from "../Components/Recipe.jsx";
import EditRecipe from "../Components/EditRecipe.jsx";

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
                path: "household",
                element: <Household />
            },
            {
                path: "create-household",
                element: <CreateHousehold />
            },
            {
                path: "invite-user",
                element: <InviteUser />
            },
            {
                path: "invites",
                element: <Invites />
            },
            {
                path: "add-recipe",
                element: <AddRecipe />
            },
            {
                path: "recipe/:id",
                element: <Recipe />
            },
            {
                path: "recipe",
                element: <Recipe />
            },
            {
                path: "edit-recipe/:id",
                element: <EditRecipe />
            }
        ]
    }

])

export default router;