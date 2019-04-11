

export const UPDATEFILTER = {
  updateCategory: 'update/update_category',
  updateSearchParam: 'update/search_param',
  updatePriceRange: 'update/price_range',
  updateSort: 'update/update_sort',
  updateSelectedSubCategory: 'update/update_sub_category',
  updateSelectedVideoType: 'update/update_video_type',
  updateSelectedVideoDate: 'update/update_video_date',
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

export const updateSelectedSubCategory = (selectedList, category) => ({
  type: UPDATEFILTER.updateSelectedSubCategory,
  selectedList,
  category,
});

export const updateSelectedVideoType = value => ({
  type: UPDATEFILTER.updateSelectedVideoType,
  value,
});

export const updateSelectedVideoDate = timeSpan => ({
  type: UPDATEFILTER.updateSelectedVideoDate,
  timeSpan,
});
