import Header from "./components/Header/Header.jsx";
import Cart from "./components/Section/Cart.jsx";
import AsideBar from "./components/Section/AsideBar.jsx";

import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Order from "./components/Section/Order.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <section className="main-section">
          <Header />
          <Order />
          <div className="main-wrapper">
            {" "}
            {/* Now matches CSS */}
            <Cart />
            <AsideBar />
          </div>
        </section>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
