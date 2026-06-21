import React, { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext(null);

// ==============================================================================
// WEEK 7 - FIG 3: Global React Context Provider Storing Auth State Variables
// ==============================================================================
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        return token ? { token, role } : null;
    });

    // ==============================================================================
    // WEEK 7 - FIG 5: Application Navigation Control Processing Logout Workflows
    // ==============================================================================
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>;
}

// ==============================================================================
// WEEK 7 - FIG 4: Route Monitoring Guard Engine Enforcing Conditional Role Access
// ==============================================================================
export function RoleAccessGuard({ children, allowedRoles }) {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (!token) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(userRole)) return <div>⛔ Access Denied!</div>;
    return children;
}

// ==============================================================================
// WEEK 7 - FIG 2: Login Submission Form Component Validation
// ==============================================================================
export function LoginForm() {
    return <form></form>;
}
