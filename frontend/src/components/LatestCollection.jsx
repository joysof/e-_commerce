import React, { useContext, useEffect, useState } from 'react'

import Title from './Title'
import ProductItems from './ProductItems'
import { ShopContext } from '../context/CreateContext.jsx'



const LatestCollection = () => {
    const {products} = useContext(ShopContext)
    const [latestProducts , setLatestProducts] =useState([])

    useEffect(() =>{
        setLatestProducts(products.slice(0,10))
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1='latest' text2='collections'/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, perferendis! Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
        </div>


        {/* rendering products  */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    {
            // eslint-disable-next-line array-callback-return
            latestProducts.map((item , index) =>(
                <ProductItems key={index} name={item.name} image={item.image} id={item._id} price={item.price}/>
            ))
        }
        </div>
    </div>
  )
}

export default LatestCollection