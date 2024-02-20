import React from 'react';

import Styles from "./BlogDetail.module.css";

export function BlogDetail({ resource }) {
    const blog = resource.read();
    const { heading, subHeading, content, imageSrc } = blog.data;
    return (
        <div className={Styles.blogDetailContainer}>
            <div className={Styles.blogDetailContent}>
                <div className={Styles.blogDetailHeading}>
                    {heading}
                </div>
                <div className={Styles.blogDetailSubHeading}>
                    {subHeading}
                </div>
                <div style={{ fontSize: 39, fontWeight: 600, display: "flex", width: "100%", height: 329, borderRadius: 20, marginTop: 25, justifyContent: "center", alignItems: "center", backgroundImage: imageSrc, backgroundRepeat: "no-repeat", backgroundSize: "cover", textAlign: "center" }}>
                    {heading}
                </div>
                <div dangerouslySetInnerHTML={{__html: content}}>

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