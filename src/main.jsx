import { Provider } from "@/components/ui/provider"
import ReactDOM from "react-dom/client"
import App from "./App"

const rootElement = document.getElementById("root")

  ReactDOM.createRoot(rootElement).render(
      <Provider>
        <App />
      </Provider>
  )
