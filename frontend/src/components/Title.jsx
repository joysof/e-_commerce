import React from 'react'

const Title = ({text1 , text2}) => {
  return (
    <div className=' inline-flex uppercase items-center gap-4 mb-3'>
        <p className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
           <p className='w-8 md:w-11 h-[2px] bg-[#414141]' />
           
    </div>
  )
}

export default Title