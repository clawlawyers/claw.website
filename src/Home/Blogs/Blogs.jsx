import React, { Suspense, forwardRef } from 'react';
import { BlogCard, BlogCardSkeleton } from '../../components/blogCard';
import { NODE_API_ENDPOINT } from '../../utils/utils';

import Styles from "./Blogs.module.css";
import {wrapPromise} from '../../utils/promiseWrapper';

export default forwardRef(function Blogs(props, ref) {
    return (
        <div ref={ref} className={Styles.blogsContainer}>
            <h1 className={Styles.blogsHeading}>
                Insights and
                <span style={{ position: "relative", display: "inline-block", backgroundColor: "transparent" }}>
                    <span style={{ position: "relative", background: "transparent", zIndex: 10 }}>Update</span>
                    <div style={{ position: "absolute", width: "96%", bottom: 15, left: "2%", height: 12, backgroundColor: "#8940FF" }} />
                </span>
            </h1>
            <Suspense fallback={<BlogCardsSkeleton />}>
                <BlogCards />
            </Suspense>
        </div>
    )
})

async function fetchBlogs() {
    const response = await fetch(`${NODE_API_ENDPOINT}/blog`);
    const parsed = await response.json();
    return parsed;
}

function fetchData() {
    return wrapPromise(fetchBlogs());
}

const resource = fetchData();

function BlogCards() {
    const blogs = resource.read();
    return <div style={{ width: "100%" }}>

        {blogs.data.map(({ heading, subHeading, _id }, idx) => {
            const temp = heading.split(" ");
            const imageHeading = temp[0];
            const imageSubHeading = temp.slice(1).join(" ");
            return <BlogCard
                key={_id}
                blogId={_id}
                imageHeading={imageHeading}
                imageSubHeading={imageSubHeading}
                heading={heading}
                blogNo={idx}
                subHeading={subHeading}
            />
        })}
    </div>
}

function BlogCardsSkeleton() {
    return (
        <div style={{ width: "100%" }}>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </div>
    )
}