import {NavLink} from "react-router-dom"
import Cart from './Cart.js'
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons"
import './shop.sass'
import shopList from "./Inventory.js"
import CartItem from './CartItem.js'
import uniqid from 'uniqid'

const Shop = () => {
  const cartBackgroundRef = useRef()
  const shopCartRef = useRef()
  const hamburgerRef = useRef()

  const [input, setInput] = useState('')
  const [visitedInput, setVisitedInput] = useState([])
  const [currentInput, setCurrentInput] = useState([])
  const [shoppingCart, setShoppingCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [error, setError] = useState("")
  const [updateTheCart, setUpdateTheCart] = useState(true)
  // useEffect(() => {
  //   console.log('the input state has changed')
  // }, [input])

  let showDecimals = (number) => {
    let str = number.toString()
    if (!number.toString().includes(".")) {
      return number + ".00"
      
    }

    if (str[str.length - 2] == ".") {
      return number + "0"
    }
    else return number
  }

  let addZero

  let showCart = () => {
     cartBackgroundRef.current.style.visibility = "visible"
    cartBackgroundRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
    shopCartRef.current.className = "shopping-cart-container active"
    
    document.body.style.overflowY = "hidden"
    
    hamburgerRef.current.style.zIndex = "0"
    
  }

  let hideCart = () => {
    cartBackgroundRef.current.style.visibility = "hidden"
    cartBackgroundRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0'
    shopCartRef.current.className = "shopping-cart-container"
    document.body.style.overflowY = "visible"
    hamburgerRef.current.style.zIndex = "2"
  }

  

  

  let handleChange = (event) => {
    
    if (event.target.value == null) return
    
    currentInput.value = event.target.value
    setInput(currentInput.value)
   
 }

  let checkInput = (event) => {
    if (currentInput == event.target) {
      return
    }
    
     setCurrentInput(event.target)
    
    if (visitedInput.length < 1) {
      setVisitedInput([event.target])
      
    }
    

    if (visitedInput.length > 0) {
      
      setInput('')
      visitedInput[0].value = null
      setVisitedInput([event.target])
      
    }

    let inputField = event.target.attributes.data.value
    let parentField = event.target.parentElement.attributes.data.value
    
    // if (inputField == parentField) {
      
    //   event.target.value = input
    // }

    
    
  }

  let increment = (event) => {
    
    
    let incrementBtnId = event.target.attributes.data.value
    let currentValue = parseInt(currentInput.value)
    let currentInputId = currentInput.attributes.data.value
    

    if (currentValue > 9 || currentValue < 0) return

    if (!currentValue) {
      currentInput.value = '1' 
      return
    }
    
    if (incrementBtnId == currentInputId) {
       
        let newValue = currentValue += 1
        currentInput.value = newValue.toString()
        setInput(currentInput.value)
     }
   
  }

  let decrement = (event) => {
    let decrementBtnId = event.target.attributes.data.value
    let currentValue = parseInt(currentInput.value)
    console.log(currentValue)
    let currentInputId = currentInput.attributes.data.value
    if (currentValue > 9 || currentValue < 1) return

    if (!currentValue) {
      currentInput.value = '0'
      return
    }

    
    if (decrementBtnId == currentInputId) {
       
        let newValue = currentValue -= 1
        currentInput.value = newValue.toString()
        setInput(currentInput.value)
     }
  }

  let updateCart = (event) => {
    if (currentInput.value == null || currentInput.value == 0 || currentInput.value < 0 || currentInput.value > 10 || isNaN(currentInput.value) == true) {
      setError(event.target.attributes.data.value)
      currentInput.value = null
      return 
    }
    setCartTotal(cartTotal + parseInt(input))
    
    currentInput.value = null
    let addCartData = event.target.attributes.data.value
    setError("")
    shopList.forEach(item => {
      if (item.id == addCartData && shoppingCart.length > 0) {
        let inCart = alreadyInCart(item.name)
        if (inCart) {
          condenseCart(item.name, item.id)
          if (condenseCart(item.name, item.id) == false) {
            setTotalCost(totalCost)
          }
        } else {
          setShoppingCart([...shoppingCart, {
            name: item.name,
            quantity: input,
            price: item.price
          }])
          setTotalCost(Math.round((totalCost + Math.round((item.price * input) * 100) / 100) * 100) / 100 )
        }

        
        // setTotalCost(Math.round((totalCost + Math.round((item.price * input) * 100) / 100) * 100) / 100 )
        
      }
      if (item.id == addCartData && shoppingCart.length < 1 ) {
        setShoppingCart([...shoppingCart, {
          name: item.name,
          quantity: input,
          price: item.price
        }])
        
        setTotalCost(Math.round((totalCost + Math.round((item.price * input) * 100) / 100) * 100) / 100 )
        
      }
      
    })
  }

  let alreadyInCart = (itemName) => {
    for (let i = 0; i < shoppingCart.length; i++) {
      let item = shoppingCart[i]
      let values = Object.values(item)

      if (values.includes(itemName)) {
        return true
      }
    }
    
    return false
  }

  let condenseCart = (itemName, key) => {
    
    let newShoppingCart = shoppingCart.map(item => {
      let itemCopy = {...item}
      if (itemCopy.name == itemName) {
        
        itemCopy.quantity = parseInt(itemCopy.quantity) + parseInt(input)
          
        return itemCopy
        
      }
      return itemCopy
    })

    for (let i = 0; i < newShoppingCart.length; i++) {
      let ele = newShoppingCart[i]
      
      if (ele.quantity > 10) {
        newShoppingCart = shoppingCart
        setError(key)
        setCartTotal(cartTotal)
        setShoppingCart(newShoppingCart)
        return false
        
      }
    }
    setShoppingCart(newShoppingCart)
  }

  let showError = (id1, id2) => {
    if (id1 == id2) {
      return (
        <h2 className="error-msg">Only 10 left in stock!</h2>
      )
    }
  }


  return (
    <div className="transparent">

      <div className="cart-background-container" ref={cartBackgroundRef} >
        <div className="extra-flex-item" onClick={hideCart}></div>
        
        <div className="shopping-cart-container" ref={shopCartRef}>
          <h1>Shopping Cart</h1>
          <FontAwesomeIcon icon={faTimesCircle} className="close-icon" onClick={hideCart}/>

          <div className="item-grid-container" >
            
            {shoppingCart.map(item => {
              return (
              <div className="shopping-row" key={uniqid()}>
                <div className="photo">
                  <div className={item.name.toLowerCase()}></div>
                </div>
                <h3 className="cart-description">{item.name}</h3>
                <h3 className="cart-quantity">Quantity: {item.quantity}</h3>
                <h3 className="item-total">Item Total: ${showDecimals(Math.round((item.price * item.quantity) * 100 ) / 100)}</h3>
              </div>
              )})}
            
          </div>
          <span className="total-cost">Total: ${showDecimals(totalCost)}</span>
          <span>
            <button type="button" className="checkout-btn">Checkout</button>
          </span>
        </div>
      
      </div>

      <div className="background-shop">
        <div className="sh-top-flex-container">
          <div className="sh-top-flex-item1">
            <h1>Avalon</h1>
            <div className="avalon-sub-container">
              <hr></hr>
              <h2>interior</h2>
            </div>
          </div>
          <div className="sh-top-flex-item2">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/shop" className="nav-link">Shop</NavLink>
            <div className="cart-container" onClick={showCart}>
              <div className="cart-amount">
                <span>{cartTotal}</span>
              </div>
              <FontAwesomeIcon icon={faShoppingBasket} className="cart"/>
            </div>
            
          </div>
        </div>

        

        <div className="shop-flex-container">
          
          {shopList.map(item => {
            return (
            <div className="shop-flex-item" key={item.id}>
              <div className="item-photo-container">
                <div className={item.name.toLowerCase()}></div>
              </div>
              
              <div className="sub-container">
                <h2 className="item-description">{item.name}</h2>
                <span className="item-price">${item.price}</span>
                <div className="sub-grid" data={item.id}>
                  <input type="text" pattern="[0-9]{1}" data={item.id} onClick={() => checkInput(event)} onChange={() => handleChange(event)}></input>
                  <FontAwesomeIcon icon={faChevronUp} className="incrementer" data={item.id} onClick={() => increment(event)}/>
                  <FontAwesomeIcon icon={faChevronDown} className="decrementer" data={item.id} onClick={() => decrement(event)} />
                  <button type="button" className="add-cart" data={item.id} onClick={() => updateCart(event)}>add to cart</button>
                  {showError(item.id, error)}
                </div>
              </div>

            </div>
            )
          })}
        
          
        </div>
        
      </div>
      <div className="hamburger-container" ref={hamburgerRef}>
        <FontAwesomeIcon icon={faBars} className="hamburger"/>
        <NavLink to="/" className="li">Home</NavLink>
        <NavLink to="/shop" className="li">Shop</NavLink>
      </div>

    </div>
  )
}

export default Shop


{/* <div className="photo">   
  <div className="bedside"></div>
</div>
<h3 className="cart-description">Bedside </h3>
<h3 className="cart-quantity">Quantity: 2</h3>
<h3 className="item-total">Item Total: $50.00</h3> */}