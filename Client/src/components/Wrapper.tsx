import DefaultLayout from '@/layouts/DefaultLayout';
import Login from '@/modules/login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Home from '@/modules/home/Home';
import { LoginForm } from '@/modules/login/chunks/LoginForm';
import { RegisterForm } from '@/modules/login/chunks/RegisterForm';
import OTP from '@/modules/login/chunks/otp';
import Layout from '@/layouts/SideLayout';
import Product from '@/modules/product/Product';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import Loader from './loader';
import Cart from '@/modules/cart/Cart';
import { PersistGate } from 'redux-persist/integration/react';
import History from '@/modules/history/History';
import AuthRedirect from './AuthRedirect';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: 'login',
                element: (
                <AuthRedirect>
                    <Login />
                </AuthRedirect>
                ),
                children: [
                    {
                        path: '',
                        element: <LoginForm />
                    },
                    {
                        path: 'register',
                        element: <RegisterForm />
                    },
                    {
                        path: 'otp',
                        element: <OTP />
                    }
                ]
            },
            {
                path: '',
                element: (
                    <Layout>
                        <Home />
                    </Layout>
                )
            },
            {
                path: 'product',
                element: (
                    <Layout>
                        <Product />
                    </Layout>
                )
            },
            {
                path: 'cart',
                element: (
                    <Layout>
                        <Cart />
                    </Layout>
                )
            },
            {
                path: 'history',
                element: (
                    <Layout>
                        <History />
                    </Layout>
                )
            }
        ]
    }
]);

const Wrapper = () => {
    const queryClient = new QueryClient();
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <QueryClientProvider client={queryClient}>
                        <Loader />
                        <RouterProvider router={router}></RouterProvider>
                        <Toaster />
                    </QueryClientProvider>
                </PersistGate>
            </Provider>
        </>
    );
};

export default Wrapper;