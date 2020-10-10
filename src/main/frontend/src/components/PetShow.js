import React, { useState, useEffect } from 'react'
import PetAdoptionsForm from './PetAdoptionsForm'

const PetShow = (props) => {
  let petId = props.match.params.id
  const [displayForm, setDisplayForm] = useState(false)
  const [pet, setPet] = useState([])
  const [applicationStatus, setApplicationStatus] = useState("")
  const [pageFound, setPageFound] = useState(true)

  let vaccinated = pet.vaccination_status === true? "Yes" : "No"
  
//  useEffect(() => {
//   fetch(`/api/v1/pets/{pet_type}/${petId}`)
//    .then(result => result.json())
//    .then(pet => {
//      setPet(pet[0])
//    })
//  }, []);

    useEffect(() => {
     fetch(`/api/v1${props.location.pathname}`)
      .then(response => {
        if (response.ok) {
        return response
      } else {
        setPageFound(false)
      }
    })
      .then(result =>  result.json())
      .then(pet => {
        setPet(pet)
      })
    }, []);
  
  const handleAdoptClick = () => {
    let formState = displayForm === true ? false : true
    setDisplayForm(formState)
  }

  let adoptForm;
  if (applicationStatus === "pending") adoptForm = "Your request is in process"
  else {
    adoptForm = displayForm === true ? 
    <PetAdoptionsForm pet_id={pet.id} 
      setApplicationStatus={setApplicationStatus}
      setDisplayForm={setDisplayForm}
      /> : <button onClick={handleAdoptClick}>Adopt Me!</button>
  }

  let bad;
    if(!pageFound) {
      bad = <p>Page not found</p>
    }

  return (
    <div>
      {bad}
      <h1>Adopt Me!!</h1>
      
      <h3>Name: {pet.name}</h3>
      <p>Age: {pet.age}</p>
      <p>Vaccinated: {vaccinated}</p>
      <p>{pet.adoption_story}</p>
      {adoptForm}
    </div>
  );

}

export default PetShow
