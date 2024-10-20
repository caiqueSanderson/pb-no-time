import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// import 'react-toastify/dist/ReactToastify.css';

import App from './App.jsx';
import Details from './pages/Details/index.jsx';
import NotFound from './pages/not-found/Not-found.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "*",
    element: <NotFound />,
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)