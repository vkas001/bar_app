import React, { ReactNode } from "react";
import { useAuth } from "./AuthContext";

interface GuardProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/** Renders children only if user has ALL of the given roles */
export function RoleGuard({
    roles,
    children,
    fallback = null,
}: GuardProps & { roles: string[] }) {
    const auth = useAuth();
    console.log('[RoleGuard] Rendering', { roles, hasRole: !!auth?.hasRole });
    
    if (!auth?.hasRole) {
        console.warn('[RoleGuard] hasRole function is undefined');
        return <>{fallback}</>;
    }
    
    return auth.hasRole(...roles) ? <>{children}</> : <>{fallback}</>;
}

/** Renders children if user has ANY of the given roles */
export function AnyRoleGuard({
    roles,
    children,
    fallback = null,
}: GuardProps & { roles: string[] }) {
    const auth = useAuth();
    console.log('[AnyRoleGuard] Rendering', { roles, hasAnyRole: !!auth?.hasAnyRole });
    
    if (!auth?.hasAnyRole) {
        console.warn('[AnyRoleGuard] hasAnyRole function is undefined');
        return <>{fallback}</>;
    }
    
    return auth.hasAnyRole(...roles) ? <>{children}</> : <>{fallback}</>;
}

/** Renders children only if user has ALL of the given permissions */
export function PermissionGuard({
    permissions,
    children,
    fallback = null,
}: GuardProps & { permissions: string[] }) {
    const auth = useAuth();
    console.log('[PermissionGuard] Rendering', { permissions, hasPermission: !!auth?.hasPermission });
    
    if (!auth?.hasPermission) {
        console.warn('[PermissionGuard] hasPermission function is undefined');
        return <>{fallback}</>;
    }
    
    return auth.hasPermission(...permissions) ? <>{children}</> : <>{fallback}</>;
}

/** Renders children if user has ANY of the given permissions */
export function AnyPermissionGuard({
    permissions,
    children,
    fallback = null,
}: GuardProps & { permissions: string[] }) {
    const auth = useAuth();
    console.log('[AnyPermissionGuard] Rendering', { permissions, hasAnyPermission: !!auth?.hasAnyPermission });
    
    if (!auth?.hasAnyPermission) {
        console.warn('[AnyPermissionGuard] hasAnyPermission function is undefined');
        return <>{fallback}</>;
    }
    
    return auth.hasAnyPermission(...permissions) ? <>{children}</> : <>{fallback}</>;
}