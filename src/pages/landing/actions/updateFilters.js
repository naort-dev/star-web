

export const UPDATEFILTER = {
  updateCategory: 'update/update_category',
};

export const updateCategory = value => ({
  type: UPDATEFILTER.updateCategory,
  value,
});
