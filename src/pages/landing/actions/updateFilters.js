

export const UPDATEFILTER = {
  updateCategory: 'update/update_category',
  switchTab: 'switch/switch_home_tab',
  updateSearchParam: 'update/search_param',
};

export const updateCategory = (label, value) => ({
  type: UPDATEFILTER.updateCategory,
  label,
  value,
});

export const updateSearchParam = value => ({
  type: UPDATEFILTER.updateSearchParam,
  value,
});

export const switchTab = label => ({
  type: UPDATEFILTER.switchTab,
  label,
});
