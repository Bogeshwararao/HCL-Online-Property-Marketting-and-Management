import React from 'react';
import "./Title.scss";

const Title = ({title, color}) => {
  const property = {
    title: "Property"
  };
  return (
    <div className='section-title'>
        <h3 style={{ color: `${color}` }}>{property.title}</h3>
        <div className='horz-line' style = {{background: `${color}`}}></div>
        <p style={{ color: `${color}`}}>Your home should tell the story of who you are, and be a collection of what you love.</p>
    </div>
  )
}

export default Title