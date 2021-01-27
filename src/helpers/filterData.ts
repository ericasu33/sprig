import { IEntry, IFilterOptions, ITag } from 'ts-interfaces/interfaces'

const filterData = (allEntries: any, filterOptions: any) => {
  
  const {category, tags, date_range} = filterOptions;
  const isBlankFilter = !category && !tags && !date_range
  
  // Get array of tag_ids, if not null
  const tag_ids = tags && tags.map((tagObj: ITag) => tagObj.id)

  // Define date_range variables once, if not null
  const start = date_range && new Date(date_range[0]);
  const end = date_range && new Date(date_range[1]);

  const isEntryInFilter = (entry: any) => {
    // Filter is null, return true for entry
    if (isBlankFilter) return true
    // Category in filter, return false if not same as entry category
    if (category && !entry.category) return false;
    if (category && entry.category && category.id !== entry.category.id) {
      return false;
    }
    // Tag or tags in filter, return false if entry tags array doesn't include all filter tags
    if (tags) {

      const matchedTags = entry.tags.filter((tag: ITag) => tag_ids.includes(tag.id))
      if (matchedTags.length !== tags.length) {
        return false;
      }
    }
    // Date range in filter, return false if entry.start_date is outside range
    if (date_range[0] && date_range[1]) {
      if (new Date(entry.start_time) < start || end < new Date(entry.start_time)) {
        return false;
      }
    }
    // Filter is non-blank but nothing in entry matches, return false
    return true;
  }

  return allEntries.filter((entry: IEntry) => isEntryInFilter(entry))
};

export default filterData;
