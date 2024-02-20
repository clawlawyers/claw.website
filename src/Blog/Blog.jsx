import React, { Suspense } from 'react'
import Header from '../Header/Header'
import FooterBanner from '../FooterBanner/FooterBanner'
import { BlogDetail, BlogDetailSkeleton } from './BlogDetail';
import { NODE_API_ENDPOINT } from '../utils/utils';
import { useParams } from 'react-router-dom';


import "./Blog.module.css";
import { createResource } from '../utils/promiseWrapper';



async function getBlog(blogId) {
    const response = await fetch(`${NODE_API_ENDPOINT}/blog/${blogId}`);
    const parsed = response.json();
    return parsed;
}

export default function Blog() {
    const { blogId } = useParams();
    const resource = createResource(getBlog, blogId);
    return (
        <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header />
            <Suspense fallback={<BlogDetailSkeleton />}>
                <BlogDetail resource={resource} />
            </Suspense>
            <FooterBanner />
        </div>
    )
}
