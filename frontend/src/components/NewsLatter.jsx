import React from 'react'

const NewsLatter = () => {
    const handleSubmit = (e) =>{
        e.preventDefault()
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>subcribe now & get 20%</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, illo?</p>

        <form onSubmit={handleSubmit} className='flex w-full sm:w-1/2 items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your Email' />
            
            <button type='submit' className=' uppercase bg-black text-white text-xs p-10 py-4'>subcribe</button>
        </form>
    </div>
  )
}

export default NewsLatter