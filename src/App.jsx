import Header from "./components/Header/Header.jsx";
import Cart from "./components/Section/Cart.jsx";
import AsideBar from "./components/Section/AsideBar.jsx";

function App() {
  return (
    <section className="main-section">
      <Header />
      <div className="main-wrapper"> {/* Now matches CSS */}
        <Cart />
        <AsideBar />
      </div>
    </section>
  );
}

export default App;