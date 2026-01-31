import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Container */}
      <div className="mx-auto max-w-md min-h-screen bg-white shadow-xl">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
