import React, { useState } from "react";
import FamilyMemberTabs from "./FamilyMemberTabs/FamilyMemberTabs";
import HouseholdSummary from "./HouseholdSummary/HouseholdSummary";
import SalaryCalculator from "./SalaryCalculator/SalaryCalculator";

const HouseholdSalaryCalculator = () => {  

  const [id, setId] = useState(1);

  return (
    <>
      <header>
        <FamilyMemberTabs setId={setId}/>
      </header>
      <main className="comp">
        <SalaryCalculator id={id} />
        <HouseholdSummary/>
      </main>
    </>
  );
};

export default HouseholdSalaryCalculator;
