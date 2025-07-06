import { AVAILABLE_DESSERTS } from "../../utils/data.js";
import classes from './Cart.module.css';

import CartItem from "./CartItem.jsx";

function Cart() {
  return (
    <section className={classes.cart}>
      <ul>
        {AVAILABLE_DESSERTS.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            image={item.image.desktop}
          />
        ))}
      </ul>
    </section>
  );
}

export default Cart;
