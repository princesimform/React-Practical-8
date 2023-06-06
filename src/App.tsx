import "./App.css";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider } from "react-router-dom";
import router from "./Route/router";
import { Provider } from "react-redux";
import store from "./redux/store";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
