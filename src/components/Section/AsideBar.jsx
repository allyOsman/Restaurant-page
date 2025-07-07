import carbonNeutralImg from "../../assets/images/icon-carbon-neutral.svg";

import classes from "./AsideBar.module.css";
import { currencyFormatter } from "../../utils/formatting";

import { useContext } from "react";
import CartContext from "../../store/CartContext";

function AsideBar() {
  const cartCtx = useContext(CartContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  return (
    <aside className={classes.aside}>
      <h2 className={classes.title}>Your Cart : </h2>
      <p className={classes.text}>selected cart</p>
      <p>Order Total : {currencyFormatter.format(cartTotal)}</p>
      <p className={classes.txt_carbon}>
        <img src={carbonNeutralImg} className={classes.txt_carbon_img} /> This
        is <b> carbon-neutral </b> delivery
      </p>
      <p className={classes.txt_btn}>
        <button className={classes.btn}>Confirm Order</button>
      </p>
    </aside>
  );
}

export default AsideBar;
