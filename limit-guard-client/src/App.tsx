import { Toaster } from "sonner"
import AppRouter from "./routes/AppRouter"


const App = () => {
  return (
    <div>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#111827",
            border: "1px solid #E0E7FF",
          },
        }}
      />
    </div>
  )
}

export default App