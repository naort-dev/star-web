

export const UPDATEFILTER = {
  updateCategory: 'update/update_category',
};

export const updateCategory = (label, value) => ({
  type: UPDATEFILTER.updateCategory,
  label,
  value,
});
