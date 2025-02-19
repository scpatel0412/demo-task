import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';
import { ReactNode } from 'react'

interface PrivateRouteProps {
    children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }
    return children;
};

export default PrivateRoute;
