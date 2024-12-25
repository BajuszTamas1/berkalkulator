import React, { useState, useEffect } from "react";
import "../../../index.css";
import MarrigeReduce from "./MarrigeReduce";

const TaxReducers = ({ id }) => {

    const initialData = localStorage.getItem('salaryCalculatorData');
    const [persons, setPersons] = useState(JSON.parse(initialData));
    const selectedPerson = persons.find(person => person.id === id);
    const [szja, setSzja] = useState(selectedPerson.szja);
    const [szemelyiAdo, setSzemelyiAdo] = useState(selectedPerson.szemelyiAdo);
    const [csaladiKedvezmeny, setCsaladiKedvezmeny] = useState(selectedPerson.csaladiKedvezmeny);
    const [modalDate, setModalDate] = useState('');
    const [firstMarriage, setFirstMarriage] = useState(selectedPerson.firstMarriage);
    const [marriageDate, setMarriageDate] = useState(selectedPerson.marriageDate);
    const [isEligible, setIsEligible] = useState(selectedPerson.isEligible);
    const [dependents, setDependents] = useState(selectedPerson.dependents);
    const [beneficiaryDependents, setBeneficiaryDependents] = useState(selectedPerson.beneficiaryDependents);


    const eltartottplus = () => {
        const newDependents = selectedPerson.dependents + 1;
        setDependents(newDependents);
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    dependents: newDependents
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const eltartottmin = () => {
        const newDependents = selectedPerson.dependents - 1;
        if (selectedPerson.dependents > 0) {
            setDependents(newDependents);
            const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
            const updatedPersons = persons.map(person => {
                if (person.id === id) {
                    return {
                        ...person,
                        dependents: newDependents
                    };
                }
                return person;
            });
            localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
        }
        if (selectedPerson.beneficiaryDependents >= selectedPerson.dependents) {
            setBeneficiaryDependents(newDependents);
            const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
            const updatedPersons = persons.map(person => {
                if (person.id === id) {
                    return {
                        ...person,
                        beneficiaryDependents: newDependents
                    };
                }
                return person;
            });
            localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
        };
    }

    const kedvplus = () => {
        const newBeneficiaryDependents = selectedPerson.beneficiaryDependents + 1;

        if (selectedPerson.dependents > selectedPerson.beneficiaryDependents)
            setBeneficiaryDependents(newBeneficiaryDependents);

        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    beneficiaryDependents: newBeneficiaryDependents
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const kedvmin = () => {
        const newBeneficiaryDependents = selectedPerson.beneficiaryDependents - 1;
        if (selectedPerson.beneficiaryDependents > 0) {
            setBeneficiaryDependents(newBeneficiaryDependents);
        }
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    beneficiaryDependents: newBeneficiaryDependents
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const handleFirstMarriageChange = (event) => {
        setFirstMarriage(event.target.checked);
        if (!event.target.checked) {
            setMarriageDate(null);
            setIsEligible(false);
        }
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    firstMarriage: event.target.checked
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const handleDateChange = (event) => {
        const date = new Date(modalDate);
        setMarriageDate(date);
        setMarriageDateParse(date);
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
        if (firstMarriage) {
            setIsEligible(date >= twoYearsAgo);
            setIsEligibleParse(date >= twoYearsAgo);
        }
    };

    const setMarriageDateParse = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    marriageDate: value
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const setIsEligibleParse = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    isEligible: value
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };


    const setSZJAParse = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    szja: value
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const setSzemelyiAdoParse = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    szemelyiAdo: value
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
    };

    const setCsaladiKedvezmenyParse = (value) => {
        const persons = JSON.parse(localStorage.getItem('salaryCalculatorData'));
        const updatedPersons = persons.map(person => {
            if (person.id === id) {
                return {
                    ...person,
                    csaladiKedvezmeny: value
                };
            }
            return person;
        });
        localStorage.setItem('salaryCalculatorData', JSON.stringify(updatedPersons));
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
        <>
            <h3>KEDVEZMÉNYEK</h3>
            <input type="checkbox" value={selectedPerson.szja} className="toggle tog" checked={selectedPerson.szja} onChange={() => { setSzja(!selectedPerson.szja); setSZJAParse(!selectedPerson.szja) }} />
            <label className='toglabel' htmlFor="">25 év alattiak SZJA mentessége</label> <br />
            <input type="checkbox" value={selectedPerson.firstMarriage} className="toggle tog" checked={selectedPerson.firstMarriage} onChange={handleFirstMarriageChange} />
            <label className='toglabel' htmlFor="">Első házasok kedvezménye</label>
            <button className="btn btn-xs modalBtn" onClick={() => document.getElementById('my_modal_4').showModal()}>Dátum módosítása</button>
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                    <p className='lowopacity'>A kedvezmény elöször a házasságkötést követo hónapra veheto igénybe és a
                        házassági életközösség alatt legfeljebb 24 hónapon keresztül jár.</p>
                    <p className="py-4">Add meg a házasságkötés dátumát</p>
                    <input
                        type="date"
                        className='modalDate'
                        value={new Date(selectedPerson.marriageDate).toISOString().slice(0, 10)}
                        onChange={(e) => setModalDate(e.target.value)}
                    />          <p className='lowopacity'>Például: 2000/10/25</p>
                    <div className="modal-action move">
                        <form method="dialog">
                            <button className="btn modalSaveBtn" onClick={handleDateChange}>Mentés</button>
                        </form>
                    </div>
                </div>
            </dialog>
            <MarrigeReduce id={id} />
            <input type="checkbox" className="toggle tog" value={selectedPerson.szemelyiAdo} checked={selectedPerson.szemelyiAdo} onChange={() => { setSzemelyiAdo(!selectedPerson.szemelyiAdo); setSzemelyiAdoParse(!selectedPerson.szemelyiAdo) }} />
            <label className='toglabel' htmlFor="">Személyi adókedvezmény</label> <br />
            <input type="checkbox" value={selectedPerson.csaladiKedvezmeny} className="toggle tog" checked={selectedPerson.csaladiKedvezmeny} onChange={() => { setCsaladiKedvezmeny(!selectedPerson.csaladiKedvezmeny); setCsaladiKedvezmenyParse(!selectedPerson.csaladiKedvezmeny) }} />
            <label className='toglabel' htmlFor="">Családi kedvezmény</label> <br />
            {selectedPerson.csaladiKedvezmeny && (
                <>
                    <button className='btn btn-xs btn-circle btn-active plusMinus' onClick={eltartottmin}><p>-</p></button>
                    <span className='dep'>  {selectedPerson.dependents}  </span>
                    <button className='btn btn-xs btn-circle btn-active plusMinus' onClick={eltartottplus}><p>+</p></button>
                    <span style={{ fontWeight: 'bold' }}> Eltartottak, ebből kedvezményezett: </span>
                    <button className='btn btn-xs btn-circle btn-active plusMinus' onClick={kedvmin}><p>-</p></button>
                    <span className='dep'>  {selectedPerson.beneficiaryDependents}  </span>
                    <button className='btn btn-xs btn-circle btn-active plusMinus' onClick={kedvplus}><p>+</p></button>
                </>
            )}
        </>
    );
};

export default TaxReducers;