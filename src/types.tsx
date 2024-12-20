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
  stats: { [key: string]: BasicStat[] },
  choices: BasicStat[]
}

export type BasicStat = {
  id: string,
  name: string,
  should_affect_stats: boolean,
  description?: string,
  value: number
}
export type  NonAffectingStat = {
  id: string;
  name: string;
  value: number;
  should_affect_stats: boolean;
}

// Update the ComputedStats type to include both stats that affect computation and those that do not
export type  ComputedStats = {
  statsSummary: Record<string, number>;  // For the computed stats that are affected by `should_affect_stats: true`
  nonAffectingStats: NonAffectingStat[]; // For the stats that are not included in the computation
}