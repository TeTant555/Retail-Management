import DefaultLayout from '@/layouts/DefaultLayout';
import Login from '@/modules/login/Login';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Home from '@/modules/home/Home';
import About from '@/modules/about/About';
import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';
import OTP from './otp';
import Layout from '@/layouts/SideLayout';
import Product from '@/modules/product/Product';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Loader from './loader';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: 'login',
                element: <Login />,
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
                path: 'about',
                element: (
                    <Layout>
                        <About />
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
            }
        ]
    }
]);

const Wrapper = () => {
    const queryClient = new QueryClient();
    return (
        <>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Loader />
                <RouterProvider router={router}></RouterProvider>
                <Toaster />
            </QueryClientProvider>
        </Provider>
        </>
    );
};

export default Wrapper;
