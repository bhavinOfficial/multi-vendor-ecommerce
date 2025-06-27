import MainLayout from "../../layout/MainLayout";
import { privateRoutes } from "./privateRoutes.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

export const getRoutes = () => {
    const allRoutes = [];
    privateRoutes.map((r) => {
        r.element = <ProtectedRoutes route={r}>{r.element}</ProtectedRoutes>
    });

    return {
        path: '/',
        element: <MainLayout />,
        children: privateRoutes
    }
}