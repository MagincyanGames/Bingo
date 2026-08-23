import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import '@fontsource-variable/material-symbols-outlined';
import Page from './components/Page'

const router = createHashRouter([
  { path: '/', element: <Page><Home /></Page> },
])

export function App() {
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')!).render(
  <App />
)
