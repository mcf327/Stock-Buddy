import InventoryList from "../InventoryList/InventoryList";
import Cart from "../Cart/Cart";
import { useState } from 'react';
import './OrderBox.css';

export default function OrderBox({ cart, inventory, removeFromCart, removefromInventory, changeCartItemQty, changeInventoryQty, changeInventoryMin, addCustomItem, handleCheckout }) {
    const [active, setActive] = useState('cart');

    return (
        <div className="order-box">
            <div className="order-box-buttons">
                <button className="btn-sm" onClick={() => setActive('cart')}>Cart</button>
                <button className="btn-sm" onClick={() => setActive('')}>My Inventory</button>
            </div>
            {active === 'cart' ? 
                <Cart 
                    cart={cart}
                    removeFromCart={removeFromCart}
                    changeCartItemQty={changeCartItemQty}
                    handleCheckout={handleCheckout}
                /> 
                : 
                <InventoryList 
                    inventory={inventory}
                    removefromInventory={removefromInventory}
                    changeInventoryQty={changeInventoryQty}
                    changeInventoryMin={changeInventoryMin}
                    addCustomItem={addCustomItem}
                />
            }
        </div>
    );
}