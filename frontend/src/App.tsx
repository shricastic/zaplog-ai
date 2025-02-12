import { useState } from "react";
import { Hero } from "./feature/LandingPage";
import { RouterProvider, createBrowserRouter } from 'react-router'
import NavLayout from "./layouts/NavLayout";
import Signin from "./pages/Signin";
import AuthRoute from "./components/AuthRoute";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import ProtectedRoute from "./components/ProtectedRoute";
import Blogs from "./pages/Blogs";
import { ThemeProvider } from "./components/theme-provider";
import Publish from "./pages/Publish";
import OAuthCallback from "./components/OAuthCallback";


function App() {
  const [content, setContent] = useState(null);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <NavLayout />,
      children: [
        {
          // path: '/',
          element: <Hero/>,
          index: true
        },
        {
          path: 'login',
          element: (<AuthRoute>
                      <Signin/>
                    </AuthRoute>)
        },
        {
          path: 'signup',
          element: <AuthRoute><Signup/></AuthRoute>
        },
        {
          path: 'blogs',
          element : (<ProtectedRoute><Blogs/></ProtectedRoute>)
        },
        {
          path: 'blog/:id',
          element : (<ProtectedRoute><Blog/></ProtectedRoute>)
        },
        {
          path: 'publish',
          element : (<ProtectedRoute><Publish/></ProtectedRoute>)
        },
        {
          path:'/oauth',
          element: <OAuthCallback/> 
        },
      ]
    }
  ])
  return (
    <>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
       <RouterProvider router={router} />
    </ThemeProvider>
    </>
  );
}

export default App;
