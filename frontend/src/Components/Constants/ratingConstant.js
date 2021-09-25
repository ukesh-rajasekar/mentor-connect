import React from 'react';
import ReactStars from 'react-rating-stars-component';

export default function RatingConstant(props) {
   let { rating } = props;

   const firstExample = {
      size: 30,
      value: rating,
      edit: false,
   };
   return (
      <div>{rating ? <ReactStars {...firstExample} /> : <h4>{''}</h4>}</div>
   );
}
