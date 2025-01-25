import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './Routes/router';
import AuthProvider from './AuthProvider';
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient}>
     <ThemeProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
