import Card from "../components/Card/Card";




const Home = (props) => {
  const { items, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddFovarite, cartItems, isLoading} = props
  
  

  const renderItems = () => {

     
    return (isLoading ? [...Array(12)] : items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))).map((item, i) => (
      <Card
        key={i}
        onPlus={(items) => onAddToCart(items)}
        onClickFavorites={(items) => onAddFovarite(items)}
        
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img onClick={() => setSearchValue('')} src="/img/btn-remove.svg" className="drawer__cart-btn remove" alt="" />}
          <input type="text" placeholder="Поиск..." onChange={onChangeSearchInput} value={searchValue} />
        </div>
      </div>
      <div className="sneakers d-flex justify-between flex-wrap">
        {
          renderItems()
        }
      </div>
    </div>
  );
};



export default Home;