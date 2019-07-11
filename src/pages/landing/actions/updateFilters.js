

export const UPDATEFILTER = {
  updateCategory: 'update/update_category',
  updateSearchParam: 'update/search_param',
  updatePriceRange: 'update/price_range',
  updateSort: 'update/update_sort',
  updateSelectedSubCategory: 'update/update_sub_category',
  updateSelectedTag: 'update/update_tag',
};

export const updateCategory = (label, value, subCategories) => ({
  type: UPDATEFILTER.updateCategory,
  label,
  value,
  subCategories,
});

export const updateSearchParam = value => ({
  type: UPDATEFILTER.updateSearchParam,
  value,
});

export const updatePriceRange = (low, high) => ({
  type: UPDATEFILTER.updatePriceRange,
  low,
  high,
});

export const updateSort = value => ({
  type: UPDATEFILTER.updateSort,
  value,
});

export const updateSelectedSubCategory = selectedList => ({
  type: UPDATEFILTER.updateSelectedSubCategory,
  selectedList,
});

export const updateSelectedTag = (tagName, tagId) => ({
  type: UPDATEFILTER.updateSelectedTag,
  tagName,
  tagId
});
