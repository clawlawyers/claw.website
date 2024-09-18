export const activePlanFeatures = (planArr, feature) => {
  let activePlanFilter;
  if (!feature) {
    activePlanFilter = planArr
      .filter((x) => x.isActive === true)
      .filter((x) => x.planName !== "ADDON_M");
  } else {
    activePlanFilter = planArr
      .filter((x) => x.isActive === true)
      .filter((x) => x.plan[`${feature}`]);
  }

  console.log(activePlanFilter);
  return activePlanFilter;
};
