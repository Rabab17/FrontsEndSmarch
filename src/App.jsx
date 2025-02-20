import { RouterProvider } from "react-router-dom"
import { router } from "./utils/routes"
import NotificationContextProvider from "./context/Notification"


function App() {

  return (
    <>
<<<<<<< HEAD
      <NotificationContextProvider>
        <RouterProvider router={router} />
      </NotificationContextProvider>

=======
    <NotificationContextProvider>
    <RouterProvider router={router} />
    </NotificationContextProvider>
    
>>>>>>> 69c6a84 (solve Datepicker problem)
    </>
  )
}

export default App
