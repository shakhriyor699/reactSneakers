
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Header = (props) => {

    const { totalPrice } = useCart()


    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to={"/"}>
                <div className="headerLeft d-flex align-center">
                    <img width={40} height={40} src="img/logo.svg" alt="Logo" className="mr-15" />
                    <div>
                        <h3 className="text-uppercase">REACT SNEAKERS</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>

                </div>
            </Link>
            <ul className="headerRight d-flex align-center">
                <li className="mr-30 d-flex align-center cu-p" onClick={props.onClickCart}>
                    <img width={18} height={18} src="img/cart.svg" alt="Cart" className="mr-10" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-30 d-flex cu-p">
                    <Link to={'/favorites'}>
                        <img width={18} height={18} src="img/heart.svg" alt="Favorite" />
                    </Link>
                </li>
                <li className="d-flex">
                    <Link to={'/orders'}>
                        <img width={18} height={18} src="img/user.svg" alt="User" />
                    </Link>
                </li>
            </ul>
        </header>
    );
};



export default Header;