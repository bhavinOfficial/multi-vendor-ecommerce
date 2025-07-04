import { lazy } from "react";

const SellerDashboard = lazy(() => import("../../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../../views/seller/AddProduct"));
const EditProduct = lazy(() => import("../../views/seller/EditProduct"));
const Products = lazy(() => import("../../views/seller/Products"));
const DiscountProducts = lazy(() => import("../../views/seller/DiscountProducts"));
const Orders = lazy(() => import("../../views/seller/Orders"));
const OrderDetails = lazy(() => import("../../views/seller/OrderDetails"));
const Payments = lazy(() => import("../../views/seller/Payments"));
const SellerToCustomerChat = lazy(() => import("../../views/seller/SellerToCustomerChat"));
const SellerToAdminChat = lazy(() => import("../../views/seller/SellerToAdminChat"));
const Profile = lazy(() => import("../../views/seller/Profile"));
const AccountPending = lazy(() => import("../../views/AccountPending"));
const AccountDeactive = lazy(() => import("../../views/AccountDeactive"));

export const sellerRoutes = [
    {
        path: '/seller/account-pending',
        element: <AccountPending />,
        ability: 'seller'
    },
    {
        path: '/seller/account-deactive',
        element: <AccountDeactive />,
        ability: 'seller'
    },
    {
        path: '/seller/dashboard',
        element: <SellerDashboard />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/add-product',
        element: <AddProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/edit-product/:productId',
        element: <EditProduct />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/products',
        element: <Products />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/discount-products',
        element: <DiscountProducts />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/orders',
        element: <Orders />,
        role: 'seller',
        visibility: ['active', 'deactive'] 
    },
    {
        path: '/seller/dashboard/order/details/:orderId',
        element: <OrderDetails />,
        role: 'seller',
        visibility: ['active', 'deactive'] 
    },
    {
        path: '/seller/dashboard/payments',
        element: <Payments />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-support',
        element: <SellerToAdminChat />,
        role: 'seller',
        visibility: ['active', 'deactive', 'pending'] 
    },
    {
        path: '/seller/dashboard/chat-customer/:customerId',
        element: <SellerToCustomerChat />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/chat-customer',
        element: <SellerToCustomerChat />,
        role: 'seller',
        status: 'active'
    },
    {
        path: '/seller/dashboard/profile',
        element: <Profile />,
        role: 'seller',
        status: 'active'
    },
]