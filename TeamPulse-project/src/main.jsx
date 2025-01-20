import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './Routes/router';
import AuthProvider from './AuthProvider';
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
