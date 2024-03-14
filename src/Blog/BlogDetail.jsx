import React from 'react';
import { Helmet } from "react-helmet";

import Styles from "./BlogDetail.module.css";



export function BlogDetail({ resource }) {
    const blog = resource.read();
    const { html, heading, subHeading } = blog.data[0];

    return (
        <div className={Styles.blogDetailContainer}>
            <Helmet>
                <meta charSet='utf-8' />
                <title>{heading}: {subHeading}</title>
            </Helmet>
            <div className={Styles.blogDetailContent} dangerouslySetInnerHTML={{ __html: html }} />
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