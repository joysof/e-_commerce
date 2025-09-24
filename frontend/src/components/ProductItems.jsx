import React, { useContext } from 'react'
import { ShopContext } from '../context/CreateContext.jsx'
import {Link} from 'react-router-dom'
const ProductItems = ({id,image , price , name}) => {

    const {currency} = useContext(ShopContext)
  return (
    <Link className=' cursor-pointer text-gray-700' to={`/product/${id}`}>
        <div>
            <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt="" />
        </div>
        <p className='pt-3 text-sm'>{name}</p>
        <p className='font-medium text-sm'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItems