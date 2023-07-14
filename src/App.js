import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './pages/HomePage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
]);

const App = () => <RouterProvider router={router} />;

export default App;