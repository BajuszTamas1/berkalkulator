import React, { useState, useEffect } from 'react';
import '../../index.css';

const FamilyMemberTabs = ({ setId }) => {
  const initialData = [
    {
      id: 1,
      grossSalary: 250000,
      firstMarriage: false,
      marriageDate: null,
      isEligible: false,
      dependents: 0,
      beneficiaryDependents: 0,
      csNev: 'Új személy',
      szja: false,
      szemelyiAdo: false,
      csaladiKedvezmeny: false,
      netSalary: Math.round(250000 - 250000 * 0.15 - 250000 * 0.185),
    },
  ];

  if (!localStorage.getItem('salaryCalculatorData')) {
    localStorage.setItem('salaryCalculatorData', JSON.stringify(initialData));
  }

  const [persons, setPersons] = useState(
    JSON.parse(localStorage.getItem('salaryCalculatorData'))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const storedData = JSON.parse(
        localStorage.getItem('salaryCalculatorData')
      );
      setPersons(storedData);
    }, 500);
    return () => clearInterval(interval);
  }, [persons]);

  function addPerson() {
    const newPerson = {
      id: persons.length + 1,
      grossSalary: 250000,
      firstMarriage: false,
      marriageDate: null,
      isEligible: false,
      dependents: 0,
      beneficiaryDependents: 0,
      csNev: 'Új személy',
      szja: false,
      szemelyiAdo: false,
      csaladiKedvezmeny: false,
      netSalary: Math.round(250000 - 250000 * 0.15 - 250000 * 0.185),
    };
    const updatedPersons = [...persons, newPerson];
    setPersons(updatedPersons);
    localStorage.setItem(
      'salaryCalculatorData',
      JSON.stringify(updatedPersons)
    );
  }

  const [activeId, setActiveId] = useState(1);
  function handleTabSelect(id) {
    setId(id);
    setActiveId(id);
  }

  return (
    <div role="tablist" className="tabs tabs-lifted memberTabs">
      {persons.map((person) => (
        <button
          className={`btn tab ${
            person.id === activeId ? 'tab-active' : ''
          } [--tab-bg:#2b3440] [--tab-border-color:none]`}
          role="tab"
          key={person.id}
          onClick={() => handleTabSelect(person.id)}
        >
          {person.csNev}
        </button>
      ))}
      <button className="btn addPersonButton" role="tab" onClick={addPerson}>
        +
      </button>
    </div>
  );
};

export default FamilyMemberTabs;
