import { IEntry, IFilterOptions, ITag } from 'ts-interfaces/interfaces'

const filterData = (allEntries: any, filterOptions: any) => {
  
  const {category, tags, date_range} = filterOptions;
  const isBlankFilter = !category && !tags && !date_range
  console.log('tags:', tags);
  
  // Get array of tag_ids, if not null
  const tag_ids = tags && tags.map((tagObj: ITag) => tagObj.id)

  // Define date_range variables once, if not null
  const start = date_range && new Date(date_range[0]);
  const end = date_range && new Date(date_range[1]);

  const isEntryInFilter = (entry: any) => {
    // Filter is null, return true for entry
    if (isBlankFilter) return true
    // Category in filter, return true if same as entry category
    if (category) {
      if (category.id === entry.category.id) {
        return true;
      }
    }
    // Tag or tags in filter, return true if any match any in entry tags array
    if (tags) {
      const inclTag = entry.tags.filter((tag: ITag) => tag_ids.includes(tag.id))
      if (inclTag.length > 0) {
        return true;
      }
    }
    // Date range in filter, return true if entry.start_date is in range
    if (date_range) {
      if (start < new Date(entry.start_time) && new Date(entry.start_time) < end) {
        return true;
      }
    }
    // Filter is non-blank but nothing in entry matches, return false
    return false;
  }

  return allEntries.filter((entry: IEntry) => isEntryInFilter(entry))
};

export default filterData;
