import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/:id',
        element: <PaymentPage />,
    },
    {
        path: '/success/:id',
        element: <SuccessPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

const App = () => (
    <>
        <Toaster />
        <RouterProvider router={router} />
    </>
);

export default App;
