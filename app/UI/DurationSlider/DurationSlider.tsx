import React from 'react'
import Style from './durationslider.module.css'

type propsData = {
    value: number;
    max: number;
    onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
}

function DurationSlider(props: propsData) {
  return (
    <div className={`${Style.dSlider} hidden sm:block`}>
        <input type='range' 
            {...props}
            className='h-[4px] w-[90%] bg-white bg-opacity-5 rounded-[50px]'>            
        </input>
    </div>
  )
}

export default DurationSlider