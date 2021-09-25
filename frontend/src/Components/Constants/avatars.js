import React, { useState, useEffect } from 'react';

export default function Avatars(props) {
   let { name } = props;
   const [initials, setInitials] = useState('');

   useEffect(() => {
      let fname = name.split(' ')[0];
      let lname = name.split(' ')[1];
      let shortName = fname[0] + lname[0];
      setInitials(shortName);
   }, []);
   return <div id='avatar'>{initials} </div>;
}
