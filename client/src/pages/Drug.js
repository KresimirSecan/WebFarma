import React ,{useEffect,useState}from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function Drug(){
    let {id} =useParams();
    const [drugObject,setDrugObject] = useState({});
    const [contributors,setContributors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/post/Id/${id}`).then((response)=>{
            setDrugObject(response.data);
        });

        axios.get(`http://localhost:3001/contributors/${id}`).then((response)=>{
        setContributors(response.data);
      });
    }, [id]);

   return(
   <div>
    <div className='drugPage'>{drugObject.name} </div>;

     <div className='ContributorsContainer'>
              {contributors.map((contrib,key) =>{
                return <div key= {key} className='contributorCell'>{contrib.description}</div>
              })}
        </div>
   </div>
   );
    
}

export default Drug