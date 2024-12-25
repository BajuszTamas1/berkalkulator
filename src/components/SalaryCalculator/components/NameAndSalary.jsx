import React, { useState, useEffect } from 'react';
import '../../../index.css';


const NameAndSalary = ( {id, } ) => {
    const initialData = localStorage.getItem('salaryCalculatorData');
    const selectedPerson = JSON.parse(initialData).find(person => person.id === id);
    const [csNev, setCsNev] = React.useState(selectedPerson.csNev);
    const [grossSalary, setGrossSalary] = React.useState(selectedPerson.grossSalary);
    const [netSalary, setNetSalary] = useState(selectedPerson.netSalary);
    const [persons, setPersons] = useState(JSON.parse(localStorage.getItem('salaryCalculatorData')));

    const setGrossSalaryParse = (value) => {
        setNetSalary(calculateNetSalary());
        setNetSalaryParse(calculateNetSalary());
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
          if (person.id === id) {
            return {
              ...person,
              grossSalary: value
            };
          }
          return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
      };


      const setNetSalaryParse = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
          if (person.id === id) {
            return {
              ...person,
              netSalary: Math.round(value)
            };
          }
          return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
      };

      const setPersonName = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
          if (person.id === id) {
            return {
              ...person,
              csNev: value
            };
          }
          return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
      };

      const calculateNetSalary = () => {
        let szjaTax = 0.15;
        let tbTax = 0.185;
    
        let calculatedNetSalary = Number(selectedPerson.grossSalary - (selectedPerson.grossSalary * tbTax) - (selectedPerson.grossSalary * szjaTax));
    
        if (selectedPerson.szja && selectedPerson.grossSalary < 499952) {
          szjaTax = 0;
          calculatedNetSalary = Number(selectedPerson.grossSalary - (selectedPerson.grossSalary * tbTax));
        } else if (selectedPerson.szja && selectedPerson.grossSalary >= 499952) {
          szjaTax = 0.15;
          let taxExemptIncome = 499952;
          let taxableIncome = selectedPerson.grossSalary - taxExemptIncome;
          calculatedNetSalary = Number(selectedPerson.grossSalary - (taxableIncome * szjaTax) - (grossSalary * tbTax));
        }
    
        if (selectedPerson.szemelyiAdo && calculatedNetSalary + 77300 > selectedPerson.grossSalary) {
          calculatedNetSalary = Number(selectedPerson.grossSalary);
        } else if (selectedPerson.szemelyiAdo && calculatedNetSalary + 77300 <= selectedPerson.grossSalary) {
          calculatedNetSalary = Number(calculatedNetSalary) + Number(77300);
        }
    
        if (selectedPerson.isEligible && selectedPerson.firstMarriage) {
          calculatedNetSalary += Number(5000);
        }
    
        if (selectedPerson.csaladiKedvezmeny && selectedPerson.beneficiaryDependents == 1) {
          calculatedNetSalary = Number(calculatedNetSalary + Number(10000 * selectedPerson.dependents));
        } else if (selectedPerson.csaladiKedvezmeny && selectedPerson.beneficiaryDependents == 2) {
          calculatedNetSalary = Number(calculatedNetSalary + Number(20000 * selectedPerson.dependents));
        } else if (selectedPerson.csaladiKedvezmeny && selectedPerson.beneficiaryDependents >= 3) {
          calculatedNetSalary = Number(calculatedNetSalary + Number(33000 * selectedPerson.dependents));
        }
    
        return Math.round(calculatedNetSalary);
      };

      useEffect(() => {
        const interval = setInterval(() => {
          const storedData = JSON.parse(localStorage.getItem('salaryCalculatorData'));
          setPersons(storedData);
          const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
          const updatedPersons = persons.map(person => {
            if (person.id === id) {
              return {
                ...person,
                netSalary: calculateNetSalary()
              };
            }
            return person;
          });
          localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
        }
          , 500);
        return () => clearInterval(interval);
      }, [persons]);

      console.log(persons)


    return (
        <div>
            <h1>{selectedPerson.csNev.toUpperCase()} BÉRÉNEK KISZÁMÍTÁSA</h1>
      <p>Családtag neve</p>
      <input
        type="text"
        placeholder=""
        id="csNev"
        className="input input-bordered w-full max-w-lg textInput"
        value={selectedPerson.csNev}
        onChange={(e) => { setCsNev(e.target.value); setPersonName(e.target.value); }}
      />
      <p className='lowopacity'>Add meg a családtag nevét!</p>
      <p>Bruttó bér</p>
      <input
        type="number"
        placeholder={selectedPerson.grossSalary + " Ft"}
        value={Math.round(selectedPerson.grossSalary)}
        className="input input-bordered w-full max-w-lg textInput"
        onChange={(e) => { setGrossSalary(e.target.value); setGrossSalaryParse(e.target.value); }}
        min={0}
        max={1000000}
      />

      <p className='lowopacity'>Add meg a bruttó béredet!</p>
      <input
        className="range range-xs max-w-lg"
        type="range"
        min={0}
        max={1000000}
        value={selectedPerson.grossSalary}
        onChange={(e) => { setGrossSalary(e.target.value); setGrossSalaryParse(e.target.value); }}
      />
      <br />
      <div className='max-w-lg salBtnDiv'>
        <button className="btn btn-active salbtn" onClick={() => { setGrossSalary(selectedPerson.grossSalary * 0.99); setGrossSalaryParse(selectedPerson.grossSalary * 0.99); }}>
          -1%
        </button>
        <button className="btn btn-active salbtn" onClick={() => { setGrossSalary(selectedPerson.grossSalary * 0.95); setGrossSalaryParse(selectedPerson.grossSalary * 0.95); }}>
          -5%
        </button>
        <button className="btn btn-active salbtn" onClick={() => { setGrossSalary(selectedPerson.grossSalary * 1.01); setGrossSalaryParse(selectedPerson.grossSalary * 1.01); }}>
          +1%
        </button>
        <button className="btn btn-active salbtn" onClick={() => { setGrossSalary(selectedPerson.grossSalary * 1.05); setGrossSalaryParse(selectedPerson.grossSalary * 1.05); }}>
          +5%
        </button>
      </div>
        </div>
    );
};

export default NameAndSalary;
