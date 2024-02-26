import React from 'react';
import { Helmet } from "react-helmet";

import Styles from "./BlogDetail.module.css";

export function BlogDetail({ resource }) {
    const blog = resource.read();
    const { content, heading, subHeading } = blog.data[0];
    const imageSrc = `var(--image-blogpost-${parseInt(Math.random() * 10) % 2})`;
    return (
        <div className={Styles.blogDetailContainer}>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{heading}: {subHeading}</title>
            </Helmet>
            <div className={Styles.blogDetailContent}>
                <ElementRenderer elementTree={content.slice(0, 2)} />
                <div className={Styles.imageHeading} style={{ backgroundImage: imageSrc, backgroundRepeat: "no-repeat", backgroundSize: "cover", margin: "20px 0px 30px 0px" }}>
                    {heading}
                </div>
                <ElementRenderer elementTree={content.slice(2)} />

            </div>
        </div >
    )
}
function selectElementRender(element) {
    switch (element.type) {
        case "Heading":
            return <h1 className={Styles.blogDetailHeading}>
                {element.props.text}
            </ h1>
        case "SubHeading":
            return <h2 className={Styles.blogDetailSubHeading}>{element.props.text}</h2>
        case "Paragraph":
            return <p>{element.props.text}</p>
        case "OrderedList":
            return <ol style={{ marginTop: 20 }}>
                {element.props.items.map((item, itemIndex) => <li style={{ marginTop: 10 }} key={itemIndex}>{item}</li>)}
            </ol>
        case "UnorderedList":
            return <ul style={{ marginTop: 20 }}>
                {element.props.items.map((item, itemIndex) => <li style={{ marginTop: 10 }} key={itemIndex}>{item}</li>)}
            </ul>
        case "Bold":
            return <div style={{ marginTop: 20, fontWeight: 600 }}>
                {element.props.text}
            </div>
        default:
            return <div> </div>
    }
}

function ElementRenderer({ elementTree }) {

    return (
        <div style={{ width: "100%", color: "white", wordBreak: "break-word" }}>
            {elementTree.map((element, index) => (
                <div className={Styles.blogContent} key={index}>
                    {selectElementRender(element)}
                </div>
            ))}
        </div>
    )
}


export function BlogDetailSkeleton() {
    return (
        <div className={Styles.blogDetailContainer}>
            <div className={Styles.blogDetailContent}>
                <div className={Styles.shimmer} style={{ width: "90%", height: 45, marginBottom: 25 }} />
                <div className={Styles.shimmer} style={{ width: "100%", height: 50 }} />
                <div className={Styles.shimmer} style={{ width: "100%", height: 329, borderRadius: 20, marginTop: 25, marginBottom: 25 }} />
                <div className={Styles.shimmer} style={{ width: "100%", height: 400 }} />
            </div>
        </div>
    )
}