import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.js'
import Shop from './Shop.js'
import Cart from './Cart.js'

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RouteSwitch