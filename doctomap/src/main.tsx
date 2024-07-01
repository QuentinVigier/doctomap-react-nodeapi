import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Doctors from './views/Doctors.tsx';
import Show from './views/Show.tsx';
import Edit from './views/Edit.tsx';
import Delete from './views/Delete.tsx';
import App from './App.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/doctors",
    element: <Doctors />,
  },
  {
    path: "/show/:id",
    element: <Show />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/delete/:id",
    element: <Delete />,
  },
  
  
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
);


