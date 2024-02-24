import React from 'react';

import Styles from "./BlogDetail.module.css";

export function BlogDetail({ resource }) {
    const blog = resource.read();
    const { heading, subHeading, content } = blog.data[0];
    const imageSrc = `var(--image-blogpost-${parseInt(Math.random() * 10) % 2})`
    return (
        <div className={Styles.blogDetailContainer}>
            <div className={Styles.blogDetailContent}>
                <h2 className={Styles.blogDetailHeading}>
                    {heading}
                </h2>
                <h3 className={Styles.blogDetailSubHeading}>
                    {subHeading}
                </h3>
                <div className={Styles.imageHeading} style={{ backgroundImage: imageSrc, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    {heading}
                </div>
                <div className={Styles.blogContent} dangerouslySetInnerHTML={{ __html: content }}>

                </div>

            </div>
        </div >
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