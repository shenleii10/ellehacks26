import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Responsive Container - full width on desktop, mobile-sized on small screens */}
        <div className="w-full min-h-screen bg-white dark:bg-gray-950">
          <RouterProvider router={router} />
        </div>
      </div>
    </ThemeProvider>
  );
}