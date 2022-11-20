import {useState} from 'react';
  
const useGenerateRandomColor = async () => {
    const [color,setColor] = useState("");
    const generateColor = () =>{
        setColor('#' + (Math.random().toString(16) + '0000000').slice(2, 8));
    };
    return {color, generateColor};
      
};
export default useGenerateRandomColor;