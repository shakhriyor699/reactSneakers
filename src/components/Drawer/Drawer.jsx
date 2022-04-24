import { useContext, useState } from "react";
import AppContext from "../../context";
import Info from "../Info";
import axios from "axios";
import useCart from "../../hooks/useCart";
import styles from './Drawer.module.scss'

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
    const [isComplete, setIsComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    // const { cartItems, setCartItems } = useContext(AppContext)
    const { cartItems, setCartItems, totalPrice } = useCart()

    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/orders', { items: cartItems })
            setOrderId(data.id)
            setIsComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://6249cb3bfd7e30c51c06a9c0.mockapi.io/cart/${item.id}`)
            }
            /* Костыль так как в mockapi нет удаления */
            // axios.delete(`https://6249cb3bfd7e30c51c06a9c0.mockapi.io/cart`) 
        } catch (e) {
            alert('Не удалось создать заказ ):')
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={`${styles.drawer} d-flex flex-column justify-between`} >


                <h2>Корзина <img onClick={onClose} src="/img/btn-remove.svg" className="drawer__cart-btn" alt="" /></h2>
                
                {
                    items.length > 0 ? (
                        <div>
                            <div className="items flex">
                                {
                                    items.map(obj => (
                                        <div key={obj.id} className="drawer__cart-item d-flex align-center mt-30 mb-20">
                                            <img width={70} height={70} src={obj.url} alt="Sneakers" />

                                            <div className="ml-20 mr-20">
                                                <p className="mb-5">{obj.name}</p>
                                                <b>{obj.price} руб.</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} src="/img/btn-remove.svg" className="drawer__cart-btn" alt="" />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="cartTotalBlock">
                                <ul className="drawer__total">
                                    <li className="d-flex align-end mb-20">
                                        <span>Итого</span>
                                        <div></div>
                                        <b>{totalPrice} руб. </b>
                                    </li>
                                    <li className="d-flex align-end mb-20">
                                        <span>Налог 5%</span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} руб.</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} className="greenBtn" onClick={onClickOrder}>Оформить заказ
                                    <img src="/img/arrow.svg" alt="Arrow" />
                                </button>
                            </div>
                        </div>
                    )

                        : (

                            <Info title={isComplete ? 'Заказ оформлен!' : 'Корзина пустая'} description={isComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару крассовок, чтобы сделать заказ"} image={isComplete ? '/img/complete-order.png' : '/img/empty-cart.png'} />

                        )


                }










                {/* <div className="cartTotalBlock">
                    <ul className="drawer__total">
                        <li className="d-flex align-end mb-20">
                            <span>Итого</span>
                            <div></div>
                            <b>21 498 руб. </b>
                        </li>
                        <li className="d-flex align-end mb-20">
                            <span>Налог 5%</span>
                            <div></div>
                            <b>1074 руб.</b>
                        </li>
                    </ul>
                    <button className="greenBtn">Оформить заказ
                        <img src="/img/arrow.svg" alt="Arrow" />
                    </button>
                </div> */}

            </div>
        </div>

    );
};



export default Drawer;