// Import required React hooks and functions
import { createContext, useReducer } from "react";

/**
 * Create CartContext with default values
 * This provides better IDE autocompletion and serves as fallback
 */
const CartContext = createContext({
  items: [],                   // Array to hold cart items
  addItem: () => {},        // Function to add items to cart
  removeItem: () => {},       // Function to remove items from cart
  clearCart: () => {},          // Function to empty the cart
});

/**
 * Reducer function to handle cart state updates
 * @param {Object} state - Current cart state
 * @param {Object} action - Contains type and payload for state update
 * @returns {Object} - Updated cart state
 */
function cartReducer(state, action) {
  // Handle adding items to cart
  if (action.type === "ADD_ITEM") {
    // Check if item already exists in cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Create copy of current items array (immutable update)
    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      // If item exists, increment quantity
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If new item, add to cart with quantity 1
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  // Handle removing items from cart
  if (action.type === "REMOVE_ITEM") {
    // Find index of item to remove
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Return current state if item not found
    if (existingCartItemIndex === -1) return state;

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      // If last item, remove from array completely
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // If multiple items, decrement quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  // Handle clearing entire cart
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  // Default case returns current state for unknown actions
  return state;
}

/**
 * CartContextProvider component
 * Provides cart state and operations to child components
 */
export function CartContextProvider({ children }) {
  // Initialize cart state using reducer
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // Action dispatcher for adding items
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  // Action dispatcher for removing items
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  // Action dispatcher for clearing cart
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  // Context value containing state and operations
  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
}

// Export the context for consumption by components
export default CartContext;