import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Repo from './pages/Repo.tsx'
import FAQ from './pages/FAQ.tsx'
import Contact from './pages/Contact.tsx'
import { client } from './services/client.ts'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        loader: async () => {
          const result = await client.get('/repos');
          console.log(result.data)
          return result.data;
        }
      }
    ]
  },
  {
    path: '/repos/:id',
    element: <Repo />,
  },
  {
    path: 'FAQ',
    element: <FAQ />,
  },
  {
    path: 'Contact',
    element: <Contact />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
