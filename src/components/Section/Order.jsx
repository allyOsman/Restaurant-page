import Modal from "../UI/Modal.jsx";

import { currencyFormatter } from "../../utils/formatting";

import { useContext } from "react";
import CartContext from "../../store/CartContext";
import UserProgressContext from "../store/UserProgressContext.jsx";

import confirmeOrderImg from "../../assets/images/icon-order-confirmed.svg";

import classes from "./Order.module.css";

function Order() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // Calculate total price of cart items
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    cartCtx.clearData();
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleFinish}
    >
      <button onClick={handleCloseCheckout}>
        {" "}
        <img src={confirmeOrderImg} />
      </button>

      <h2>Order Confirmed</h2>
      <p className={classes.text}>We hope you enjoy your food</p>

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
          </div>
        ))}
      </div>

      <p className={classes.total}>
        Order Total: <strong>{currencyFormatter.format(cartTotal)}</strong>
      </p>

      <div className={classes.txt_btn}>
        <button
          className={classes.btn}
          disabled={cartCtx.items.length === 0}
          aria-disabled={cartCtx.items.length === 0}
        >
          Start new Order
        </button>
      </div>
    </Modal>
  );
}

export default Order;
