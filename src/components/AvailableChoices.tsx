import React, { useState } from "react";
import { BasicStat, SingleStatData } from "../types";


type SelectComponentProps = {
  title: string,
  items: SingleStatData[];
  onSelect: (selectedId: string) => void;
};


const AvaialbleChoices: React.FC<SelectComponentProps> = ({ title, items, onSelect }) => {
  const [selectedId, setSelectedId] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedId(newValue);
    onSelect(newValue); // Notify parent about the selection
  };

  return (
    <div>
      <label htmlFor="item-select">Select an Item:</label>
      <select id="item-select" value={selectedId} onChange={handleChange}>
        <option value="" disabled>
          Choose an item for {title}
        </option>
        {items.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AvaialbleChoices;