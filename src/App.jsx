import React from 'react'
import '../src/App.css'
import { Route, Routes } from 'react-router-dom'

import MasterManege from './pages/masterManage/MasterManege'
import SplashScreen from './pages/SplashScreen/SplashScreen'
import CreateUser from './pages/createUser/CreateUser'
import PremvatiMangment from './pages/premvatiManegment/PremvatiMangment'
import ProductMangement from './pages/ProductManagement/ProductMangement'
import OrderManagement from './pages/OrderPage/Order'
import TransectionHistory from './pages/TransectionHistory/TransectionHistory'
import Login from './pages/login/Login'




function App() {

  return (
    <>

      <Routes >

      <Route path='/' element={<Login />} />
        <Route path='/spalsh' element={<SplashScreen />} />
        <Route path='/master' element={<MasterManege />} />
        <Route path='/user' element={<CreateUser />} />
        <Route path='/premvati' element={<PremvatiMangment />} />
        <Route path='/product' element={<ProductMangement />} />
        <Route path='/order' element={<OrderManagement />} />
        <Route path='/transection' element={<TransectionHistory />} />
      </Routes>
      


    </>
  )
}

export default App
