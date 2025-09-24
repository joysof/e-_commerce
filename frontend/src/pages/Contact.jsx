import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLatter from '../components/NewsLatter'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'contact'} text2={'us'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-center gap-6'>
          <p className=' font-semibold text-xl capitalize text-gray-600'>our store</p>
          <p className='text-gray-500'>54709 willms station <br /> suite 350, washington, USA</p>
          <p className='text-gray-500'>tel : 01314997965 <br /> Email : sajibhossen560@gmail.com</p>
          <p className=' font-semibold text-xl text-gray-600'>Careers at Forever</p>
           <p className='text-gray-500'>Learn more about our teams and job openings</p>
           <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>


        </div>

      </div>
      <NewsLatter/>
    </div>
  )
}

export default Contact