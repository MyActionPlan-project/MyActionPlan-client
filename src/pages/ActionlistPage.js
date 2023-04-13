import axios from "axios"
import { useEffect, useState } from "react"


function Actionlist(){

    const {actionplans, setActionplans} =useState(null)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}api/actionlists`)
        .then(actionPlansFromDB => setActionplans(actionPlansFromDB))
        .catch((error) => console.log(error));
    },[])

    const renderActionplans = () => {
      return (
        <>
          {actionplans.map((actionplan) => {
            console.log(actionplan)
            return (
                
              <section key={actionplan._id}>
                <h2>{actionplan.title}</h2>

              </section>
            );
          })}
        </>
      );
    };

    return(
        <div>
        {actionplans 
        ? renderActionplans()
        : <h1> Loading ....</h1> }

        

        </div>

    )

}

export default Actionlist