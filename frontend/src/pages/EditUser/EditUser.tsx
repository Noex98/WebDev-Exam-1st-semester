import React from 'react'
import { useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { Nav } from '../../components';

export const EditUser = () => {
  const location = useLocation();
  const test = location.state;
  
  useEffect(() => {
   // console.log(test);
  }, [])
  
return (
    <div>
      {test}
      <Nav />
    </div>
  ) 
}