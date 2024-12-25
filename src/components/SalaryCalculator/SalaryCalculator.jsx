import React, { useState, useEffect } from 'react';
import '../../index.css';
import NameAndSalary from './components/NameAndSalary';
import CalculateNetSalary from './components/CalculateNetSalary';
import TaxReducers from './components/TaxReducers';

const SalaryCalculator = ({ id }) => {
  const initialData = localStorage.getItem('salaryCalculatorData');

  const selectedPerson = JSON.parse(initialData).find(person => person.id === id);
  const [grossSalary, setGrossSalary] = useState(selectedPerson.grossSalary);
  const [csNev, setCsNev] = useState(selectedPerson.csNev);
  const [persons, setPersons] = useState(JSON.parse(localStorage.getItem('salaryCalculatorData')));

  const handleDelete = () => {
    const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
    const updatedPersons = persons.filter(person => person.id !== id);
    updatedPersons.forEach((person, index) => {
      person.id = index + 1;
    });
    localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    if (updatedPersons.length === 0) {
      localStorage.removeItem('salaryCalculatorData');
    }
    window.location.reload();
  };



  useEffect(() => {
    const interval = setInterval(() => {
      const storedData = JSON.parse(localStorage.getItem('salaryCalculatorData'));
      setPersons(storedData);  
    }
      , 500);
    return () => clearInterval(interval);
  }, [persons]);


  return (
    <div className='salaryComp'>
      <button className='btn delBtn' onClick={handleDelete}>🗑️</button>
      <NameAndSalary id={id} csNev={csNev} setCsNev={setCsNev} grossSalary={grossSalary} setGrossSalary={setGrossSalary} />
      <TaxReducers id={id} />
      <CalculateNetSalary  id={id}/>
    </div>
  );
};



export default SalaryCalculator;