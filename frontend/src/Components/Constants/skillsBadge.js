import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

export default function SkillsBadge(props) {
   const { skills, type } = props;
   const [anySkills] = useState(skills.split(','));
   const [check, setCheck] = useState(false);

   //    useEffect(() => {
   //       if (skills.length === 0) {
   //          setCheck(true);
   //       }
   //       console.log(skills, anySkills);
   //    }, []);

   return (
      <div>
         {!check &&
            anySkills
               .filter((element) => element !== '')
               .map((element) => {
                  return (
                     <Button
                        variant={type}
                        style={{
                           margin: '0.25rem',
                           pointerEvents: 'none',
                        }}
                     >
                        {element}{' '}
                     </Button>
                  );
               })}
         {check && <h3>No skills found</h3>}
      </div>
   );
}
