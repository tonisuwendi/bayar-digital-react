import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/:id',
        element: <PaymentPage />,
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;
