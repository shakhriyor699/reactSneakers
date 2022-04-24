import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Favorites from "./pages/Favorites";
import AppContext from "./context";
import Orders from "./pages/Orders";



function App() {
  const [isOpenCart, setIsOpenCart] = useState(false)
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //  await  fetch('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/items')
    //   .then(res => res.json())
    //   .then(data => {
    //     setItems(data)
    //   })

    async function fetchData() {
        try {
          const [cartRes, favRes, itemsRes] = await Promise.all([ axios.get('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/cart'), axios.get('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/favorites'), axios.get('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/items')])

          setIsLoading(false)
          setCartItems(cartRes.data)
          setFavorites(favRes.data)
          setItems(itemsRes.data)
        }catch(e) {
          alert('Ошибка при запросе данных :(')
        }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
        axios.delete(`https://6249cb3bfd7e30c51c06a9c0.mockapi.io/cart/${findItem.id}`)
      } else {
        const { data } = await axios.post('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/cart', obj)
        setCartItems(prev => [...prev, data])
      }
    } catch (e) {
      alert('Не удалось добавить в корзину')
    }
  }

  const onAddFovarite = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
        axios.delete(`https://6249cb3bfd7e30c51c06a9c0.mockapi.io/favorites/${obj.id}`)
      } else {
        setFavorites(prev => [...prev, data])
        const { data } = await axios.post('https://6249cb3bfd7e30c51c06a9c0.mockapi.io/favorites', obj)

      }
    } catch (e) {
      alert('Не удалось добавить в избранное')
    }
  }


  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6249cb3bfd7e30c51c06a9c0.mockapi.io/cart/${id}`)

      setCartItems(prev => prev.filter(item => +item.id !== +id))
    }catch(e) {
      alert('Ошибка при удалении из корзины')
    }
  }


  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }



  return (
    <AppContext.Provider value={{ cartItems, favorites, items, isLoading, isItemAdded, setIsOpenCart, setCartItems, onAddToCart, onAddFovarite }}>
      <div className="wrapper">
      <Drawer onClose={() => setIsOpenCart(false)} items={cartItems} onRemove={onRemoveItem} opened={isOpenCart} />
        <Header onClickCart={() => setIsOpenCart(true)} />

        <Routes>
          <Route path="/" element={<Home
            items={items}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddFovarite={onAddFovarite}
            // cartItems={cartItems}
            isLoading={isLoading}
          />}>

          </Route>

          <Route path='/favorites' element={<Favorites favorites={favorites} onAddFovarite={onAddFovarite} />}></Route>

          <Route path='/orders' element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
