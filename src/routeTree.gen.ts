/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthLayoutImport } from './routes/_authLayout'
import { Route as DashboardRouteImport } from './routes/dashboard/route'
import { Route as DashboardTransactionsImport } from './routes/dashboard/transactions'
import { Route as DashboardSettingsImport } from './routes/dashboard/settings'
import { Route as DashboardOverviewImport } from './routes/dashboard/overview'
import { Route as AuthLayoutRegisterImport } from './routes/_authLayout/register'
import { Route as AuthLayoutLoginImport } from './routes/_authLayout/login'

// Create/Update Routes

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/_authLayout',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRouteRoute = DashboardRouteImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const DashboardTransactionsRoute = DashboardTransactionsImport.update({
  id: '/transactions',
  path: '/transactions',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardSettingsRoute = DashboardSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const DashboardOverviewRoute = DashboardOverviewImport.update({
  id: '/overview',
  path: '/overview',
  getParentRoute: () => DashboardRouteRoute,
} as any)

const AuthLayoutRegisterRoute = AuthLayoutRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthLayoutRoute,
} as any)

const AuthLayoutLoginRoute = AuthLayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardRouteImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout': {
      id: '/_authLayout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_authLayout/login': {
      id: '/_authLayout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLayoutLoginImport
      parentRoute: typeof AuthLayoutImport
    }
    '/_authLayout/register': {
      id: '/_authLayout/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthLayoutRegisterImport
      parentRoute: typeof AuthLayoutImport
    }
    '/dashboard/overview': {
      id: '/dashboard/overview'
      path: '/overview'
      fullPath: '/dashboard/overview'
      preLoaderRoute: typeof DashboardOverviewImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/settings': {
      id: '/dashboard/settings'
      path: '/settings'
      fullPath: '/dashboard/settings'
      preLoaderRoute: typeof DashboardSettingsImport
      parentRoute: typeof DashboardRouteImport
    }
    '/dashboard/transactions': {
      id: '/dashboard/transactions'
      path: '/transactions'
      fullPath: '/dashboard/transactions'
      preLoaderRoute: typeof DashboardTransactionsImport
      parentRoute: typeof DashboardRouteImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteRouteChildren {
  DashboardOverviewRoute: typeof DashboardOverviewRoute
  DashboardSettingsRoute: typeof DashboardSettingsRoute
  DashboardTransactionsRoute: typeof DashboardTransactionsRoute
}

const DashboardRouteRouteChildren: DashboardRouteRouteChildren = {
  DashboardOverviewRoute: DashboardOverviewRoute,
  DashboardSettingsRoute: DashboardSettingsRoute,
  DashboardTransactionsRoute: DashboardTransactionsRoute,
}

const DashboardRouteRouteWithChildren = DashboardRouteRoute._addFileChildren(
  DashboardRouteRouteChildren,
)

interface AuthLayoutRouteChildren {
  AuthLayoutLoginRoute: typeof AuthLayoutLoginRoute
  AuthLayoutRegisterRoute: typeof AuthLayoutRegisterRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthLayoutLoginRoute: AuthLayoutLoginRoute,
  AuthLayoutRegisterRoute: AuthLayoutRegisterRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '': typeof AuthLayoutRouteWithChildren
  '/login': typeof AuthLayoutLoginRoute
  '/register': typeof AuthLayoutRegisterRoute
  '/dashboard/overview': typeof DashboardOverviewRoute
  '/dashboard/settings': typeof DashboardSettingsRoute
  '/dashboard/transactions': typeof DashboardTransactionsRoute
}

export interface FileRoutesByTo {
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '': typeof AuthLayoutRouteWithChildren
  '/login': typeof AuthLayoutLoginRoute
  '/register': typeof AuthLayoutRegisterRoute
  '/dashboard/overview': typeof DashboardOverviewRoute
  '/dashboard/settings': typeof DashboardSettingsRoute
  '/dashboard/transactions': typeof DashboardTransactionsRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/dashboard': typeof DashboardRouteRouteWithChildren
  '/_authLayout': typeof AuthLayoutRouteWithChildren
  '/_authLayout/login': typeof AuthLayoutLoginRoute
  '/_authLayout/register': typeof AuthLayoutRegisterRoute
  '/dashboard/overview': typeof DashboardOverviewRoute
  '/dashboard/settings': typeof DashboardSettingsRoute
  '/dashboard/transactions': typeof DashboardTransactionsRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/dashboard'
    | ''
    | '/login'
    | '/register'
    | '/dashboard/overview'
    | '/dashboard/settings'
    | '/dashboard/transactions'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/dashboard'
    | ''
    | '/login'
    | '/register'
    | '/dashboard/overview'
    | '/dashboard/settings'
    | '/dashboard/transactions'
  id:
    | '__root__'
    | '/dashboard'
    | '/_authLayout'
    | '/_authLayout/login'
    | '/_authLayout/register'
    | '/dashboard/overview'
    | '/dashboard/settings'
    | '/dashboard/transactions'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  DashboardRouteRoute: typeof DashboardRouteRouteWithChildren
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  DashboardRouteRoute: DashboardRouteRouteWithChildren,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/dashboard",
        "/_authLayout"
      ]
    },
    "/dashboard": {
      "filePath": "dashboard/route.tsx",
      "children": [
        "/dashboard/overview",
        "/dashboard/settings",
        "/dashboard/transactions"
      ]
    },
    "/_authLayout": {
      "filePath": "_authLayout.tsx",
      "children": [
        "/_authLayout/login",
        "/_authLayout/register"
      ]
    },
    "/_authLayout/login": {
      "filePath": "_authLayout/login.tsx",
      "parent": "/_authLayout"
    },
    "/_authLayout/register": {
      "filePath": "_authLayout/register.tsx",
      "parent": "/_authLayout"
    },
    "/dashboard/overview": {
      "filePath": "dashboard/overview.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/settings": {
      "filePath": "dashboard/settings.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/transactions": {
      "filePath": "dashboard/transactions.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
