import { RouterProvider } from "react-router-dom"
import { router } from "./utils/routes"
import NotificationContextProvider from "./context/Notification"


function App() {

  return (
    <>
      <NotificationContextProvider>
        <RouterProvider router={router} />
      </NotificationContextProvider>

    </>
  )
}

export default App
