
interface ISound {
  id: number;
  name: string;
  file_name: string;
};

interface ITimer {
    id: number | null,
    uid: number | never | null,
    name: string,
    cycles: number,
    work: number,
    short_break: number,
    long_break: number,
    short_b_start_sound: number | null,
    short_b_end_sound: number | null,
    long_b_start_sound: number | null,
    long_b_end_sound: number | null,
}

interface IClock {
  playing: boolean,
  stopped: boolean,
  current: "work" | "short_break" | "long_break" | "",
  time: number,
  partition: number,
}
interface ICategoryDB {
  id?: number | null,
  user_id?: string,
  name: string,
  color: string,
}
interface ICategory {
  id: number | null | undefined,
  value: string,
  color: string,
  label?: string,
}

interface IStats {
  duration: number;
  work: number;
  p_work: number;
};

interface ITagDB {
  id: number | null,
  tag: string,
  user_id: number,
}
interface ITag {
  id: number | null,
  label: string | null,
  value?: string,
}

interface IEntriesTags {
  entry_id: number,
  tag_id: number
}
interface IEntryDB {
  id?: number,
  category: number | null,
  start_time: Date | null,
  end_time: Date | null,
  intensity: number | null
  pause_start_time?: Date | null,
  cumulative_pause_duration: number | null
}

interface IEntriesTags {
  entry_id: number,
  tag_id: number
}

interface IEntry {
  id?: number,
  category: ICategory | null,
  tags: ITag[] | number[] | null,
  start_time: Date | null,
  end_time: Date | null,
  intensity: number | null
  pause_start_time?: Date | null,
  cumulative_pause_duration: number | null
}

// interface IEntries {
//   [key: string]: IEntry;
// }

interface IFilterOptions {
  category: number | null,
  tags: number[] | null,
  date_range: (Date | null)[],
}

export type {
  ISound,
  ITimer,
  IClock,
  ICategoryDB,
  ICategory,
  IStats,
  ITagDB,
  ITag,
  IEntriesTags,
  IEntry,
  IEntryDB,
  IFilterOptions,
};
