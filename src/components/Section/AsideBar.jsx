// Import assets and utilities
import carbonNeutralImg from "../../assets/images/icon-carbon-neutral.svg";
import emptyCartImg from "../../assets/images/illustration-empty-cart.svg";
import classes from "./AsideBar.module.css";
import { currencyFormatter } from "../../utils/formatting";

// Import React hooks and context
import { useContext } from "react";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../../store/UserProgressContext.jsx";

// Import Modal Component
import Modal from "../UI/Modal.jsx";

/**
 * AsideBar Component - Displays cart summary inside a modal
 * @returns {JSX.Element} The sidebar component containing cart details
 */
function AsideBar() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate total price of cart items
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // function handleCloseCart() {
  //   userProgressCtx.hideCart();
  // }

  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <aside className={classes.aside} aria-label="Cart summary">
      <h2 className={classes.title}>Your Cart : ({cartCtx.items.length})</h2>

      {cartCtx.items.length > 0 ? (
        <>
          <p className={classes.text}>Selected items</p>

          <div className={classes.itemsList}>
            {cartCtx.items.map((item) => (
              <div key={item.id} className={classes.item}>
                <div className={classes.itemInfo}>
                  <h4 className={classes.itemName}>{item.name}</h4>
                  <div className={classes.itemDetails}>
                    <span>{currencyFormatter.format(item.price)}</span>
                    <span> × {item.quantity}</span>
                  </div>
                </div>

                <button
                  className={classes.removeBtn}
                  onClick={() => cartCtx.removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <p className={classes.total}>
            Order Total: <strong>{currencyFormatter.format(cartTotal)}</strong>
          </p>

          <div className={classes.environment}>
            <p className={classes.txt_carbon}>
              <img
                src={carbonNeutralImg}
                className={classes.txt_carbon_img}
                alt=""
                aria-hidden="true"
              />
              This is <strong>carbon-neutral</strong> delivery
            </p>
          </div>

          <div className={classes.txt_btn}>
            {cartCtx.items.length > 0 && 
            <button
              className={classes.btn}
              onClick={handleGoToCheckout}
              // disabled={cartCtx.items.length === 0}
              // aria-disabled={cartCtx.items.length === 0}
            >
              Confirm Order
            </button>
            }
          </div>
        </>
      ) : (
        <div className={classes.imgText}>
          <img src={emptyCartImg} alt="Empty cart illustration" />
          <p>Your added items will appear here</p>
        </div>
      )}
    </aside>
  );
}

export default AsideBar;
