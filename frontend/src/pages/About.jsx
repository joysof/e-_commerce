import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLatter from '../components/NewsLatter'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'about'} text2={'us'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad asperiores molestias minus tempora, tenetur nobis dignissimos esse dolores incidunt, id illo necessitatibus quae exercitationem animi sit ea. Provident, ad odit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ab nemo nostrum quidem. A maiores, odit autem illum soluta, illo officiis voluptas alias unde dolores delectus animi voluptates recusandae?</p>
        <b className='text-gray-800 capitalize'>our mission</b>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur iste voluptas aliquam nihil nobis magnam amet rerum unde ipsa suscipit.
        </p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'why'} text2={'choose us'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className=' capitalize'>quality assurance : </b>
            <p className='text-gray-600'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa reprehenderit laboriosam corrupti consectetur explicabo voluptas necessitatibus accusamus magni quam.
            </p>
        </div>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className=' capitalize'>convenience : </b>
            <p className='text-gray-600'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa reprehenderit laboriosam corrupti consectetur explicabo voluptas necessitatibus accusamus magni quam.
            </p>
        </div>
        <div className=' border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className=' capitalize'>exceptional customer service : </b>
            <p className='text-gray-600'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos ipsa reprehenderit laboriosam corrupti consectetur explicabo voluptas necessitatibus accusamus magni quam.
            </p>
        </div>
      </div>
      <NewsLatter/>
    </div>
  )
}

export default About