import React from 'react';
import AppContext from '../context';


const Info = ({title, image, description}) => {
    const {setIsOpenCart} = React.useContext(AppContext)

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120}  src={image} alt="" />
            <h2>{title}</h2>
            <p className="opacity-6 text-center">{description}</p>
            <button onClick={() => setIsOpenCart(false)} className="greenButton">
                <img src="/img/arrow-left.svg" alt="Arrow" />
                Вернуться назад
            </button>
        </div>
    );
};


export default Info;
