import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider } from "react-router-dom";
import router from "./Routing/BrowserRouter.jsx";
import './mainplus.css'
import {ContextProvider} from "./Authentication/ContextProvider.jsx";
import {AuthProvider} from "./Authentication/AuthProvider.jsx";

createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <RouterProvider router={router} />
    </ContextProvider>
    
)
