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
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header />
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
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 428, width: 428, left: 50, top: "-214px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <div style={{ position: "absolute", height: 428, width: 428, right: "-200px", top: "-200px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <FooterBanner />
            </div>
        </div>
    )
}
