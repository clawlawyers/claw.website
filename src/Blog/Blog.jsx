import React, { Suspense } from 'react'
import Header from '../Header/Header'
import FooterBanner from '../FooterBanner/FooterBanner'
import { BlogDetail, BlogDetailSkeleton } from './BlogDetail';
import { NODE_API_ENDPOINT } from '../utils/utils';
import { useParams } from 'react-router-dom';


import "./Blog.module.css";
import { createResource } from '../utils/promiseWrapper';
import { ExpandedBlogCard, ExpandedBlogCardSkeleton } from '../components/ExpandedBlogCard';
import { CardsGroup, CardsGroupSkeleton } from '../components/CardsGroup';



async function getBlog(blogName) {
    const response = await fetch(`${NODE_API_ENDPOINT}/blog/${blogName}`);
    const parsed = response.json();
    return parsed;
}

async function getLinkingBlogs(excludedBlogName) {
    const response = await fetch(`${NODE_API_ENDPOINT}/blog/linkingBlogs/${excludedBlogName}`);
    return response.json();
}

const mapping = [
    {
        key: "blogId",
        value: "_id"
    },
    {
        key: "imageHeading",
        value: "heading",
        transform: (value) => value.split(" ")[0]
    },
    {
        key: "imageSubHeading",
        value: "heading",
        transform: (value) => value.split(" ").slice(1).join(" ")
    },
    {
        key: "heading",
        value: "heading"
    },
    {
        key: "subHeading",
        value: "subHeading"
    },
]

export default function Blog() {
    const { blogName } = useParams();
    const getBlogResource = createResource(getBlog, blogName);
    const getLinkingBlogResource = createResource(getLinkingBlogs, blogName);
    return (
        <div>
            <Suspense fallback={<BlogDetailSkeleton />}>
                <BlogDetail resource={getBlogResource} />
            </Suspense>
            <Suspense fallback={<CardsGroupSkeleton component={ExpandedBlogCardSkeleton} count={2} />}>
                <CardsGroup
                    component={ExpandedBlogCard}
                    resource={getLinkingBlogResource}
                    propsDataMapping={mapping}
                />
            </Suspense>
        </div>
    )
}
