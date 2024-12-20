import React from "react";
import InputField from "./InputField.tsx";

type Props = {
  jsonData: Array<string>; // Top-level keys
  formValues: Record<string, string>; // State from parent
  handleChange: (key: string, value: string) => void; // State update handler
};

const TopLevelStatInput: React.FC<Props> = ({ jsonData, formValues, handleChange }) => {
  return (
    <div>
      {jsonData.map((key) => (
        <InputField
          key={key}
          label={key}
          value={formValues[key] || "0"}
          onChange={(value) => handleChange(key, value)}
        />
      ))}
    </div>
  );
};

export default TopLevelStatInput;
