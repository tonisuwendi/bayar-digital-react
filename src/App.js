import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';

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
]);

const App = () => (
    <>
        <Toaster />
        <RouterProvider router={router} />
    </>
);

export default App;
