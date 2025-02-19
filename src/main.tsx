import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/login';
import PrivateRoute from './util/PrivateRoute';
import ResourceList from './pages/resource-list';
import ResourceDetails from './pages/resource-details';

export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Login />
			},
			{
				path: "/launches",
				element: (
					<PrivateRoute>
						<ResourceList />
					</PrivateRoute>
				)
			},
			{
				path: "/launches/:id",
				element: (
					<PrivateRoute>
						<ResourceDetails />
					</PrivateRoute>
				)
			}
		],
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
