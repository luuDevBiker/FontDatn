import React from 'react';
import { useBarcode } from 'react-barcodes';

export interface Props{
    value:any,
    size:any,
    color:any
}

const Barcodes =(props:Props) => {
  const {value, size, color } = props
  const { inputRef } = useBarcode({
    value: value,
    options: {
      background: color,
      width:0.5,
      height:30,
      margin: 0,
      displayValue:true,
      textMargin: 0,
      fontSize:10,
    }
  });
  return <svg ref={inputRef} />;
};

export default Barcodes;