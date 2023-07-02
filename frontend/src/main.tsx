import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react"
import { productApi } from "./components/services/productsApi"
import store from "./app/store"
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={productApi}> */}
      <App />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>,
)
