import React, { useState, useEffect } from "react";

const HouseholdSummary = () => {
  const initialData = localStorage.getItem('salaryCalculatorData');
  const [persons, setPersons] = useState(JSON.parse(initialData));

    useEffect(() => {
      const interval = setInterval(() => {
        const storedData = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        setPersons(storedData);
      }
        , 100);
      return () => clearInterval(interval);
    }, [persons]);

  return (
    <div className="summaryComp">
      <div className="summary">
        <h1>Háztartás összesített jövedelme</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Családtag</th>
              <th>Nettó bér</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td>{person.csNev}</td>
                <td>{person.netSalary} Ft</td>
              </tr>
            ))}
            <tr>
              <td><strong>Összesen:</strong></td>
              <td><strong>{persons.reduce((acc, person) => acc + person.netSalary, 0)} Ft</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>);
};

export default HouseholdSummary;
