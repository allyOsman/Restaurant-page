// Import required React hooks and utilities
import { useContext } from "react";
import { currencyFormatter } from "../../utils/formatting";
import addToCart from "../../assets/images/icon-add-to-cart.svg";
import classes from "./CartItem.module.css";
import CartContext from "../../store/CartContext";

/**
 * CartItem component - Displays a single product item with add-to-cart functionality
 * @param {Object} props - Component props
 * @param {Object} props.item - The product item to display
 * @returns {JSX.Element} - Rendered cart item component
 */
function CartItem({ item }) {
  // Access cart context to get addItem function
  const cartCtx = useContext(CartContext);

  /**
   * Handles adding the current item to the cart
   * Triggered when the "Add to Cart" button is clicked
   */
  function handleAddMealToCart() {
    cartCtx.addItem(item);
  }

  return (
    <li>
      {/* Article container for the product card */}
      <article className={classes.item}>
        {/* Container for image and add-to-cart button */}
        <div className={classes.img_btn}>
          {/* Product image */}
          <img 
            src={item.image.desktop} 
            className={classes.img_btn_img} 
            alt={item.name} // Added accessibility attribute
          />
          
          {/* Add to cart button */}
          <button 
            className={classes.img_btn_btn} 
            onClick={handleAddMealToCart}
            aria-label={`Add ${item.name} to cart`} // Accessibility improvement
          >
            <img 
              src={addToCart} 
              alt="" // Decorative icon doesn't need alt text
            />
            Add to Cart
          </button>
        </div>

        {/* Container for product information */}
        <div className={classes.textAll}>
          <div className={classes.all_text}>
            {/* Product category */}
            <p className={classes.category}>{item.category}</p>
            
            {/* Product name */}
            <h3 className={classes.title}>{item.name}</h3>
            
            {/* Formatted product price */}
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