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
      console.log(statData.id);
      console.log(statData);
      const stat = characterData.stats.find(s => s.id === statData.id);
      if (stat) {
        stat.name = statData.name;
        stat.description = statData.description;
      } else {
        characterData.stats.push({
          id: statData.id,
          name: statData.name,
          description: statData.description,
          value: 0
        } as BasicStat);
      }
  });
}

// export const handleChoices = (stat: string, data: SingleStatData[], characterData: PlayerStat) => {
    
// }