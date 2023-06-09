import Feed from '@/components/Feed'
import React from 'react'

const home = () => {
    
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
            Discover & Share 
            <br className='max-sm:hidden'/>
            <spna className="orange_gradient text-center">AI-Powered Prompts</spna>
        </h1>

        <p className='desc text-center'>
            Promptopia is an open-source AT promptig tool for modern wworld to descover, create and share creative prompts
        </p>
        
        <Feed/>
        

    </section>
  )
}

export default home