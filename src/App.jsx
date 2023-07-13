import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../src/app/store";
import AccountPage from "./pages/account.page";
import TopbarComp from "./components/topbar.comp";
import ProductPage from "./pages/product.page";
import CartPage from "./pages/cart.page";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import CheckoutPage from "./pages/checkout.page";
import ConfirmPage from "./pages/confirm.page";
import InvoicePage from "./pages/invoices.page";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TopbarComp />}>
              <Route index element={<ProductPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="confirm" element={<ConfirmPage />} />
              <Route path="invoice/:order_id" element={<InvoicePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
