import { useState } from "react";

function useRequirementSectionPicker() {
  const [pickedSection, setPickedSection] = useState("requirements");

  const handleChangeSection = (sectionName) => {
    setPickedSection(sectionName);
  };

  return {
    pickedSection,
    handleChangeSection,
  };
}

export default useRequirementSectionPicker;
