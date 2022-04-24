import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";




const Orders = () => {
    const { onAddToCart, onAddFovarite } = useContext(AppContext)
    const [orders, setOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsLoading(false)
            }
            catch (e) {
                alert('Ошибка при запросе заказов!')
            }
        }
        fetchData()
    }, [])


    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мои Заказы</h1>
            </div>
            <div className="sneakers d-flex justify-between flex-wrap">
                {
                    (isLoading ? [...Array(12)] : orders).map((item, i) => (
                        <Card
                            key={i}
                            // onPlus={(items) => onAddToCart(items)}
                            // onClickFavorites={(items) => onAddFovarite(items)}
                            loading={isLoading}
                            {...item}
                        />
                    ))
                }
            </div>
        </div>
    );
};



export default Orders;