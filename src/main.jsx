import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip/index.jsx'
import Header from './components/custom/Header.jsx'
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from '@react-oauth/google';
import View_trip from './view-trip/[tripId]/index.jsx'
import MyTrips from './my-trips/index.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {path:'/create-trip',
  element:<CreateTrip/>
  },
  {
    path:'/view-trip/:tripId',
    element:<View_trip/>
  },
  {
    path:'/my-trips',
    element:<MyTrips/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header/>
    <RouterProvider router={router}/>
    <Toaster />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
