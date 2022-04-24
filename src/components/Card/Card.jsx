import { useState, useContext } from 'react';
import ContentLoader from "react-content-loader"
import cl from './Card.module.scss'
import AppContext from '../../context';

const Card = ({ id, parentId, name, url, price, onPlus, onClickFavorites, favorited = false,  loading = false }) => {
    const {isItemAdded} = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited)
    const obj = { id, parentId: id, name, url, price }

    // console.log(id, isItemAdded(id));

    const onClickPlus = () => {
        onPlus(obj)
        isItemAdded(id)
    }

    const onClickFavorite = () => {
        onClickFavorites(obj)
        setIsFavorite(!isFavorite)
    }


    return (
        <>
            <div className={cl.card}>
                {
                    loading ?
                        <ContentLoader
                            speed={2}
                            width={210}
                            height={210}
                            viewBox="0 0 210 210"
                            backgroundColor="#f7f7f7"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" />
                            <rect x="-2" y="110" rx="3" ry="3" width="150" height="15" />
                            <rect x="0" y="134" rx="3" ry="3" width="93" height="15" />
                            <rect x="1" y="182" rx="8" ry="8" width="80" height="24" />
                            <rect x="136" y="168" rx="0" ry="0" width="0" height="9" />
                            <rect x="119" y="178" rx="10" ry="10" width="32" height="32" />
                        </ContentLoader>
                        :
                        <>
                           {onClickFavorites && <div className={cl.favorite} onClick={onClickFavorite} >
                                <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked" />
                            </div>}
                            <img width={133} height={112} src={url} alt="" />
                            <p className={cl.cardDescription}>{name}</p>
                            <div className="d-flex justify-between align-center">
                                <div className="d-flex flex-column">
                                    <span>Цена:</span>
                                    <b>{price} руб.</b>
                                </div>
                                {onPlus && <img className={cl.plus} onClick={onClickPlus} src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt="" />}
                            </div>
                        </>
                }

            </div>
        </>
    );
};


export default Card;