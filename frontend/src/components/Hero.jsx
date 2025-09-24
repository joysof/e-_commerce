import React from 'react'

import { assets } from '../assets/assets'
const Hero = () => {
  return (
    <div className='border  rounded flex items-center flex-col sm:flex-row border-gray-400'>
        {/* Hero left side  */}
        <div className='w-full sm:w-1/2 flex items-center justify-center text-[#414141] uppercase py-10 sm:py-0'>
            <div>
                <div className='flex items-center gap-2'>
                    <hr className='w-8 md:w-11 h-[2px] bg-[#414141]' />
                    <p className='font-medium text-sm md:text-base'>our bestseller</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>latest arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>shop now</p>
                    <hr className='w-8 md:w-11 h-[2px] bg-[#414141]' />
                </div>
            </div>
        </div>

        {/* hero right site  */}
       
            <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
        
    </div>
  )
}

export default Hero