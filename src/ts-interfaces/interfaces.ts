
interface ISound {
  id: number;
  file: string;
};

interface ITimer {
    id: number,
    uid: number | never,
    name: string,
    cycles: number,
    work: number,
    short_break: number,
    long_break: number,
    short_b_start_sound: number,
    short_b_end_sound: number,
    long_b_start_sound: number,
    long_b_end_sound: number,
}

interface ICategory {
  id: number | null,
  value: string,
  color: string | null,
  label?: string,
}

interface IStats {
  duration: number;
  work: number;
  p_work: number;
};

interface ITag {
  id: number | null,
  label: string | null,
  value?: string,
  color: string | null
}

interface IEntry {
  id: number,
  category: ICategory | null,
  tags: ITag[] | null,
  start_time: Date | null,
  end_time: Date | null,
  intensity: number | null
  pause_start_time?: Date | null,
  cumulative_pause_duration: number | null
}

interface IEntries {
  [key: string]: IEntry;
}

export type {
  ISound,
  ITimer,
  ICategory,
  IStats,
  ITag,
  IEntry,
  IEntries,
};
