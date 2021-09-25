import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { showToast } from './toastServices';

export default function Ratings(props) {
   const { userId } = props;
   const [payload, setPayload] = useState({
      id: parseInt(userId),
      rating: 0,
   });

   const postRating = () => {
      console.log(payload);
      axios
         .post('/user/rating', payload, {
            headers: {
               Accept: 'application/json',
               Authorization: localStorage.token,
            },
         })
         .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
               showToast(`Rated successfully ⭐`, 'success');
            }
         })
         .catch((err) => {
            showToast('Login error', 'error');
         });
   };

   const ratingChanged = (newRating) => {
      console.log(newRating);
      payload['rating'] = newRating;
      postRating();
   };
   return (
      <div>
         <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            emptyIcon={<i className='far fa-star'></i>}
            halfIcon={<i className='fa fa-star-half-alt'></i>}
            fullIcon={<i className='fa fa-star'></i>}
            activeColor='#ffd700'
         />
      </div>
   );
}
