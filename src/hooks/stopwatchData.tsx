import { ITag, ICategory, IEntry, IEntries } from 'ts-interfaces/interfaces';


const allCategoriesData: ICategory[] = [
  {id: 0, label: 'one', value: 'one', color: '#3eabb7'},
  {id: 1, label: 'two', value: 'two', color: '#d13c3c'},
  {id: 2, label: 'three', value: 'three', color: '#6d31b7'},
]

const allTagsData: ITag[] = [
  {id: 0, label: 'food', value: 'food', color: '#ee0'},
  {id: 1, label: 'dessert', value: 'dessert', color: '#e0e'},
  {id: 2, label: 'icecream', value: 'icecream', color: '#e0e'},
]

const blankActiveEntry: IEntry = {
  id: 0,
  category: null,
  tags: null,
  start_time: null,
  end_time: null,
  intensity: 100,
  pause_start_time: null,
  cumulative_pause_duration: 0,
};

const activeEntryData: IEntry = {
  id: 1,
  category: allCategoriesData[1],
  tags: [allTagsData[0], allTagsData[1]],
  start_time: null,
  end_time: null,
  intensity: 90,
  pause_start_time: null,
  cumulative_pause_duration: 60000,
};

const mockEntryData: IEntry = {
  id: 1,
  category: allCategoriesData[1],
  tags: [allTagsData[0], allTagsData[1]],
  start_time: new Date(1611021345965),
  end_time: new Date(1611029345965),
  intensity: 90,
  pause_start_time: null,
  cumulative_pause_duration: 60000,
};

const allEntriesData: IEntries = {
  '0': {...mockEntryData, id: 0, start_time: new Date(1611020000000), end_time: new Date(1611021000000)},
  '1': {...mockEntryData, id: 1, start_time: new Date(1611022000000), end_time: new Date(1611023000000)},
  '2': {...mockEntryData, id: 2, start_time: new Date(1611024000000), end_time: new Date(1611025000000)},
  '3': {...mockEntryData, id: 3, start_time: new Date(1411024000000), end_time: new Date(1411027000000)},
}

export {
  allCategoriesData,
  allTagsData,
  blankActiveEntry,
  activeEntryData,
  allEntriesData,
};
