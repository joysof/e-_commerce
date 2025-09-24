import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/CreateContext.jsx'
import {useParams} from 'react-router-dom'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const {products ,currency ,addToCart} = useContext(ShopContext)
  const {productId} = useParams()
  const [productData , setProductData] = useState(false)
  const [image , setImage] = useState('')
  const [size , setSize] =useState('')

  const fetchProductData =()=>{
      products.map((item) =>{
        if(item._id === productId){
          setProductData(item)
          setImage(item.image[0])
          return null
        }
      })
  }
  useEffect(()=>{
    fetchProductData()
  },[productId])


  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      
      <div className='flex gap-12 sm:gap-12 flex-col-reverse sm:flex-row'>

        {/*--------------------- product imgae-----------------------  */}
      <div className='flex-1 flex flex-col-reverse gap-3  sm:flex-row'>
        
     
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full'>
          {
            productData.image.map((item,index) =>(
              <img src={item} key={index} onClick={() =>setImage(item)} className='w-[24px] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[80%]'>
          <img className='w-full h-auto' src={image} alt="" />
        </div>
        </div>
           {/*------------------------- product data -------------------------------- */}

        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_icon} alt="" /><img src={assets.star_dull_icon} alt="" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-3/4'>{productData.description}</p>

          <div className='flex flex-col gap-4 my-8'>
            <p>select size</p>
            <div className='flex gap-2'>
              { 
                JSON.parse(productData.sizes[0])?.map((item, index)=>{
              return <button onClick={()=>setSize(item)} className={` border py-2 px-4 bg-gray-100 rounded-md${size ===item ? ' border-orange-500':''}`} key={index}>{item}</button>;       
                 } )
              }
            </div>
          </div>
          <button onClick={()=>addToCart({ itemId: productData._id, size })} className='bg-black px-8 py-3 text-sm text-white active:bg-gray-700 uppercase'>add to cart</button>
          <hr  className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
      </div>
    </div>
      {/*--------------------- Description and review section------------------  */}
    
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <b className='border px-5 py-3 text-sm'>Reviews (122)</b>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus nulla saepe ratione quam adipisci deleniti eaque eveniet in reprehenderit dolore.</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam omnis illum repellat distinctio, perspiciatis harum.</p>
        </div>
      </div>

      {/* RelatedProducts  */}
      
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ):<div className=' opacity-0'></div>
}

export default Product