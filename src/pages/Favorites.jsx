import Card from "../components/Card/Card";




const Favorites = ({favorites, onAddFovarite}) => {
    return (
        <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>Мои закладки</h1>
        </div>
        <div className="sneakers d-flex justify-between flex-wrap">
            {
              favorites.map((item, i) => (
              <Card
                key={i}
                favorited={true}
                onClickFavorites={onAddFovarite}
                {...item}
              />
            ))
          }
        </div>
      </div>
    );
};



export default Favorites;