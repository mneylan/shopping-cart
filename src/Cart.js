import { useRef } from "react"
const Cart = () => {
  const cartBackgroundRef = useRef()
  const shopCartRef = useRef()

  let showCart = () => {
    // cartBackgroundRef.current.style.visibility = ""
    
    shopCartRef.current.className = "shopping-cart-container active"
    
    // document.body.style.overflowX = "hidden"
    
    document.body.style.overflowY = "hidden" 
    
  }

  return (
    <div className="cart-background-container" ref={cartBackgroundRef} >
      <div className="extra-flex-item" onClick={showCart}></div>
      
      <div className="shopping-cart-container" ref={shopCartRef}>
        <h1>Shopping Cart</h1>

        <div className="item-grid-container" >
         
            <div className="photo">
              <div className="bedside"></div>
            </div>
            <h3 className="cart-description">Bedside </h3>
            <h3 className="cart-quantity">Quantity: 2</h3>
            <h3 className="item-total">Item Total: $50.00</h3>

            <div className="photo">
              <div className="bedside"></div>
            </div>
            <h3 className="cart-description">Bedside </h3>
            <h3 className="cart-quantity">Quantity: 2</h3>
            <h3 className="item-total">Item Total: $50.00</h3>

            <div className="photo">
              <div className="bedside"></div>
            </div>
            <h3 className="cart-description">Bedside </h3>
            <h3 className="cart-quantity">Quantity: 2</h3>
            <h3 className="item-total">Item Total: $50.00</h3>

            <div className="photo">
              <div className="bedside"></div>
            </div>
            <h3 className="cart-description">Bedside </h3>
            <h3 className="cart-quantity">Quantity: 2</h3>
            <h3 className="item-total">Item Total: $50.00</h3>

          
        </div>
        <span className="total-cost">Total: $$$</span>
        <span>
          <button type="button" className="checkout-btn">Checkout</button>
        </span>
      </div>
      
    </div>
  )
}

export default Cart