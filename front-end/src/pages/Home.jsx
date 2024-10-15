import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Announcement from '../components/Announcement'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
const   home = () => {
  return (
    <div> 
    <Navbar/>
    <Announcement/>
    <Slider/>
    <Categories/>
    <Products/>
    {/* <Newsletter/> */}
    <Footer/>

    </div>
  )
}

export default home