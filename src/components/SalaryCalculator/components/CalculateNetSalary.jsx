import React, { useState, useEffect } from 'react';
import '../../../index.css';

const CalculateNetSalary = ({id}) => {
    const initialData = localStorage.getItem('salaryCalculatorData');
    
    const [persons, setPersons] = useState(JSON.parse(initialData));
    const selectedPerson = persons.find(person => person.id === id);

    useEffect(() => {
        const interval = setInterval(() => {
          const storedData = JSON.parse(localStorage.getItem('salaryCalculatorData'));
          setPersons(storedData);
        }, 500);
        return () => clearInterval(interval);
      }, [persons]);
    
  // Your calculation logic here
  return (
    <>
    <h1 className='nettoSzoveg'>Számított nettó bér:</h1>
      <div className='nettoBer'>
        <p className='nettoP'>{Math.round(selectedPerson.netSalary) + " Ft"}</p>
      </div>
      </>
  );
};

export default CalculateNetSalary;
