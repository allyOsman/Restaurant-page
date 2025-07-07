import { useContext } from "react";

import { currencyFormatter } from "../../utils/formatting";
import addToCart from "../../assets/images/icon-add-to-cart.svg";

import classes from "./CartItem.module.css";

import CartContext from "../../store/CartContext";

function CartItem({ item }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(item);
  }

  return (
    <li>
      <article className={classes.item}>
        <div className={classes.img_btn}>
          <img src={item.image.desktop} className={classes.img_btn_img} />
          <button className={classes.img_btn_btn} onClick={handleAddMealToCart}>
            <img src={addToCart} />
            Add to Cart
          </button>
        </div>
        <div className={classes.textAll}>
          <div className={classes.all_text}>
            <p className={classes.category}>{item.category}</p>
            <h3 className={classes.title}>{item.name}</h3>
            <p className={classes.price}>
              {currencyFormatter.format(item.price)}
            </p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default CartItem;
