export const activePlanFeatures = (planArr) => {
  const activePlanFilter = planArr
    .filter((x) => x.isActive === true)
    .filter((x) => x.planName !== "ADDON_M");
  return activePlanFilter;
};
