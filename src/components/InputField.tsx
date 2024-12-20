import React from "react";

type InputFieldProps = {
  label: string; // Label for the input
  value: string; // Current value
  onChange: (value: string) => void; // Callback for handling changes
};

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        {label}:{" "}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter value for ${label}`}
        />
      </label>
    </div>
  );
};

export default InputField;
