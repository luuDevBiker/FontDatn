


import React from 'react';

export interface props{
    label:string,
    number:number,
    cardRef:any
}

const CountDownSquare = ( props:props) => {
    const {cardRef,label,number} =props

  return (
    <div className="countdown__card">
      <div className="countdown__card__bg" ref={cardRef}>
        <div className="countdown__card__number" id={label}>
          {number}
        </div>
      </div>
      <div className="countdown__card__label">{label}</div>
    </div>
  );
};

export default CountDownSquare;
