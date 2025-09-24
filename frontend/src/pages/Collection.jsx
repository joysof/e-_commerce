import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/CreateContext.jsx'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItems'
const Collection = () => {
  const {products,search, showSearch} = useContext(ShopContext)
  const [showFilter , setShowFilter] = useState(false)
  const [filterProduct , setFilterProduct] =useState([])
  const [category , setCategory] = useState([])
  const [subCatagory , setSubCatagory] = useState([])
  const [sortType , setSortType] = useState('relavent')

  const toggoleCatagory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev =>[...prev , e.target.value])
    }
  }

  const toggoleSubcatagory = (e) =>{
    if(subCatagory.includes(e.target.value)){
      setSubCatagory(prev => prev.filter(item => item !==e.target.value))
    }else{
      setSubCatagory(prev => [...prev , e.target.value])
    }
  }
  const applyFilter = () =>{
    let productCopy  = products.slice()

      if(showSearch && search){
        productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }
       if (category.length > 0) {
      productCopy = productCopy.filter(item =>
        category.includes(String(item.category || '').toLowerCase())
      )
    }
   
    if(subCatagory.length > 0) {
      productCopy = productCopy.filter(item =>subCatagory.includes(String(item.subCategory || '').toLowerCase()))
    }

    setFilterProduct(productCopy)
  
  }
useEffect(() =>{
  applyFilter()
},[category , subCatagory,search,showSearch,products])


const sortProduct = () =>{
  let spCopy = filterProduct.slice()

  switch(sortType){
    case  'low-high' :
      setFilterProduct(spCopy.sort((a,b)=>(a.price -b.price)))
      break;
    case 'high-low' :
      setFilterProduct(spCopy.sort((a,b) =>(b.price - a.price)))
      break;
    default :
    return spCopy;
  }
}
useEffect(() =>{
  sortProduct()
},[sortType])
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* filter option  */}
      <div className='min-w-60'>
        <p onClick={() =>setShowFilter(!showFilter)} className='my-2 text-xl items-center cursor-pointer flex gap-2 uppercase'>filters
           <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
        </p>
       
        {/* catagory filter  */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>catagories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' value={'men'}  onChange={toggoleCatagory}type="checkbox" />Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'women'} onChange={toggoleCatagory} type="checkbox" />Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'kids'} onChange={toggoleCatagory} type="checkbox" />Kids
            </p>
          </div>

        </div>
           {/* filter option  */}
      <div className='min-w-60'>
        {/* subcatagory filter  */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' value={'topwear'} type="checkbox" onChange={toggoleSubcatagory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'bottomwear'} type="checkbox" onChange={toggoleSubcatagory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' value={'winterwear'} type="checkbox" onChange={toggoleSubcatagory} /> Winterwear
            </p>
          </div>

        </div>
      </div>
      </div>

    {/* right side  */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'all'} text2={'collection'}/>

          {/* product sort  */}

          <select onChange={(e) =>setSortType(e.target.value)}>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by:High to Low</option>
          </select>
        </div>

        {/* map products  */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item , index) =>(
              <ProductItem key={index} name={item.name} image={item.image} price={item.price} id={item._id}/>
            ))
          }

        </div>
      </div>

      
    </div>
  )
}

export default Collection