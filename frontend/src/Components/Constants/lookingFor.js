import React from 'react';

export default function LookingFor(props) {
   const { participants } = props;
   let display = 'Mentor';
   if (participants === 2) {
      display = 'Mentee';
   } else if (participants === 3) {
      display = 'Mentor & Mentee';
   }
   return <div>{display}</div>;
}
