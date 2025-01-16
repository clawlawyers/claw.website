import React from "react";
import { Helmet } from "react-helmet";

import Styles from "./BlogDetail.module.css";

export function BlogDetail({ resource }) {
  const blog = resource.read();
  console.log(blog.data);
  const { html, heading, subHeading } = blog.data[0];

  return (
    <div className={Styles.blogDetailContainer}>
      <Helmet>
        <title>{heading}</title>
        <meta charSet="utf-8" name="description" content={subHeading} />
        <meta charSet="utf-8" name="keywords" content={subHeading} />
      </Helmet>
      <div
        className={`${Styles.blogDetailContent} rounded-none`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className={Styles.blogDetailContainer}>
      <div className={Styles.blogDetailContent}>
        <div
          className={Styles.shimmer}
          style={{ width: "90%", height: 45, marginBottom: 25 }}
        />
        <div className={Styles.shimmer} style={{ width: "100%", height: 50 }} />
        <div
          className={Styles.shimmer}
          style={{
            width: "100%",
            height: 329,
            borderRadius: 20,
            marginTop: 25,
            marginBottom: 25,
          }}
        />
        <div
          className={Styles.shimmer}
          style={{ width: "100%", height: 400 }}
        />
      </div>
    </div>
  );
}
