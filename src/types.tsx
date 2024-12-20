export type DB = Record<string, any>;

export type StatData = {
  passive_stats: SingleStatData[],
  available_choices: SingleStatData[]
};

export type SingleStatData = {
  id: string,
  name: string,
  should_affect_stats: boolean,
  type?: string,
  value?: string,
  description?: string,
}

export type PlayerStat = {
  stats: BasicStat[]
  choices: BasicStat[]
}

export type BasicStat = {
  id: string,
  name: string,
  description?: string,
  value: number
}

export interface ComputedStats {
  [statName: string]: number;
}
