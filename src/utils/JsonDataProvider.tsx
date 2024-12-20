import { DB, StatData, SingleStatData, PlayerStat, BasicStat } from "../types";

export const parseJsonKeys = (db: DB): Array<string> => {
    return Object.keys(db); // Simple utility to extract top-level keys
};
  

export const findCorrectStatLevel = (stat: string, value: number, db: DB ): StatData => {
  const result:Object<number, any> = db[stat];
  let foundData:StatData;
  for (const [statValue, statData] of Object.entries(result)) {
      console.log(statValue);
      if (Number(statValue) > value) {
        break;
      }
      foundData = statData;
  }

  if(foundData === undefined) {
    //TODO implement default min return of stat IE pick the lowest possible stat
    //potentially superfluous
  }
  return foundData;
};

export const handlePassiveStats = (data: SingleStatData[], characterData: PlayerStat) => {

  data.forEach((statData: SingleStatData) => {
      characterData.stats.push({
        id: statData.id,
        name: statData.name,
        description: statData.description,
        value: Number(statData.value)
      } as BasicStat);

  });
}

export const handleSelectStats = (
  title: string,
  statData: SingleStatData,
  characterData: PlayerStat
) => {
  const selectedStatKey = title.replace(" ", "_") + "availabe_choices_selected"
  // Remove the old stat by filtering out the item with the given id
  console.log(selectedStatKey)
  console.log(statData)
  characterData.stats = characterData.stats.filter(s => s.id !== selectedStatKey);

  // Add the new stat to the end of the stats array
  characterData.stats.push({
    id: selectedStatKey,
    name: statData.name,
    description: statData.description,
    value: Number(statData.value),
  } as BasicStat);
};
