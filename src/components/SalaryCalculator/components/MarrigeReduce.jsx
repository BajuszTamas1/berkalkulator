import React, {useEffect, useState} from "react";
import "../../../index.css";

const MarrigeReduce = ({id}) => {
    const initialData = localStorage.getItem('salaryCalculatorData');
    const [persons, setPersons] = useState(JSON.parse(initialData));
    const selectedPerson = persons.find(person => person.id === id);
    
    useEffect(() => {
        const interval = setInterval(() => {
          const storedData = JSON.parse(localStorage.getItem('salaryCalculatorData'));
          setPersons(storedData);  

        }
          , 500);
        return () => clearInterval(interval);
      }, [persons]);

    return (
        <>
        {selectedPerson.marriageDate != null && selectedPerson.firstMarriage && (
        <>
          {selectedPerson.marriageDate && (
            selectedPerson.isEligible
              ? <div className="badge badge-success gap-2 eligible">
                <p>Jogosult</p>
              </div>
              : <div className="badge badge-error gap-2 eligible">
                <p>Nem jogosult</p>
              </div>
          )}
        </>
      )} <br />
        </>
    );
};

export default MarrigeReduce;