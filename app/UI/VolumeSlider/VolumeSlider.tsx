import React from 'react';
import Style from './VolumeSlider.module.css';

type propsData = {
  value: number;
  max: number;
  onChange: (input: React.ChangeEvent<HTMLInputElement>) => void;
};

function VolumeSlider(props: propsData) {
  const { value, max, onChange } = props;
  return (
    <div className={Style.vSlider}>
      <input
        type='range'
        value={value}
        max={max}
        onChange={onChange}
        style={{ '--volume-progress': `calc(${(value / max) * 100}%)` } as React.CSSProperties}
        className='h-[3px] ml-2 w-40 bg-white bg-opacity-5 rounded-[50px]'
      />
    </div>
  );
}

export default VolumeSlider;