import { IEntry, IFilterOptions, ITag } from 'ts-interfaces/interfaces'

const filterData = (allEntries: any, filterOptions: any) => {
  console.log('filterData function running');
  
  const {filterCat, filterTags, filterDateRange} = filterOptions;
  const isBlankFilter = !filterCat && !filterTags && !filterDateRange
  
  // Define date_range variables once, if not null
  const start = filterDateRange && new Date(filterDateRange[0]);
  const end = filterDateRange && new Date(filterDateRange[1]);

  const isEntryInFilter = (entry: any) => {
    // Filter is null, return true for entry
    if (isBlankFilter) return true
    // Category in filter, return true if same as entry category
    if (filterCat) {
      if (filterCat === entry.category.id) {
        return true;
      }
    }
    // Tag or tags in filter, return true if any match any in entry tags array
    if (filterTags) {
      const inclTag = entry.tags.filter((tag: ITag) => filterTags.includes(tag.id))
      if (inclTag.length > 0) {
        return true;
      }
    }
    // Date range in filter, return true if entry.start_date is in range
    if (filterOptions.date_range) {
      if (start < new Date(entry.start_time) && new Date(entry.start_time) < end) {
        return true;
      }
    }
    // Filter is non-blank but nothing in entry matches, return false
    return false;
  }

  console.log('filterData filterOptions:', filterOptions);
  console.log('filterData allEntries:', allEntries);

  return allEntries.filter((entry: IEntry) => isEntryInFilter(entry))
};

export default filterData;


// interface IEntries {
//   [key: string]: IEntry;
// }

// interface IFilterOptions {
//   category: number | null,
//   tags: number[] | null,
//   date_range: Date[] | null,
// }

// interface IEntry {
//   id: number,
//   category: ICategory | null,
//   tags: ITag[] | null,
//   start_time: Date | null,
//   end_time: Date | null,
//   intensity: number | null
//   pause_start_time?: Date | null,
//   cumulative_pause_duration: number | null
// }