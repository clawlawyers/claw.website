import Styles from "./index.module.css";

export function CardsGroup({
  resource,
  propsDataMapping = [],
  component: Card,
  layoutStyles = {},
}) {
  const dataObj = resource.read();
  return (
    <div
      style={{ width: "100%", ...layoutStyles, backgroundColor: "transparent" }}
    >
      {dataObj?.data?.map((data, idx) => {
        const props = {};
        propsDataMapping.forEach((mapping) => {
          props[mapping.key] = mapping.transform
            ? mapping.transform(data[mapping.value])
            : data[mapping.value];
        });

        return <Card key={idx} {...props} />;
      })}
    </div>
  );
}

export function CardsGroupGrid({
  resource,
  propsDataMapping = [],
  component: Card,
  layoutStyles = {},
}) {
  const blogs = resource.read();

  console.log(blogs);
  return (
    <div className={Styles.grid} style={{ width: "100%", ...layoutStyles }}>
      {blogs?.data?.map((data, idx) => {
        const props = {};
        propsDataMapping.forEach((mapping) => {
          props[mapping.key] = mapping.transform
            ? mapping.transform(data[mapping.value])
            : data[mapping.value];
        });

        return <Card key={idx} {...props} />;
      })}
    </div>
  );
}

export function CardsGroupSkeleton({
  count = 1,
  component: Card,
  layoutStyles,
}) {
  return (
    <div style={{ width: "100%", ...layoutStyles }}>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Card key={i} />
        ))}
    </div>
  );
}
