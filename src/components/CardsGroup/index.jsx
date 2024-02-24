import Styles from "./index.module.css";

export function CardsGroup({ resource, propsDataMapping = [], component: Card, layoutStyles = {} }) {
    const blogs = resource.read();
    console.log(blogs);
    return <div style={{ width: "100%", ...layoutStyles, backgroundColor: "transparent" }}>
        {blogs?.data?.map((data, idx) => {
            const props = {};
            propsDataMapping.forEach((mapping) => {
                props[mapping.key] = mapping.transform ? mapping.transform(data[mapping.value]) : data[mapping.value];
            });

            return <Card
                key={idx}
                {...props}
            />
        })}
    </div>
}

export function CardsGroupGrid({ resource, propsDataMapping = [], component: Card, layoutStyles = {} }) {
    const blogs = resource.read();
    return <div className={Styles.grid} style={{ width: "100%", ...layoutStyles }}>
        {blogs?.data?.map((data, idx) => {
            const props = {};
            propsDataMapping.forEach((mapping) => {
                props[mapping.key] = mapping.transform ? mapping.transform(data[mapping.value]) : data[mapping.value];
            });

            return <Card
                key={idx}
                {...props}
            />
        })}
    </div>
}


export function CardsGroupSkeleton({ count = 1, component: Card }) {
    return (
        <div style={{ width: "100%" }}>
            {Array(count).map((_, i) => <Card />)}
        </div>
    )
}