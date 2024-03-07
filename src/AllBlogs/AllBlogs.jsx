import React, { Suspense } from 'react'
import Header from '../Header/Header'
import { createResource } from '../utils/promiseWrapper'
import { NODE_API_ENDPOINT } from '../utils/utils'
import { CardsGroup, CardsGroupGrid, CardsGroupSkeleton } from '../components/CardsGroup';
import { ExpandedBlogCard, ExpandedBlogCardSkeleton } from '../components/ExpandedBlogCard';
import { CollapsedBlogCard, CollapsedBlogCardSkeleton } from '../components/CollapsedBlogCard';
import FooterBanner from '../FooterBanner/FooterBanner';
import Styles from "./AllBlogs.module.css";

async function getIntroBlog() {
    const response = await fetch(`${NODE_API_ENDPOINT}/blog/Quick Guide`);
    return response.json();
}

async function getAllBlogs() {
    const response = await fetch(`${NODE_API_ENDPOINT}/blog`);
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
    {
        key: "createdAt",
        value: "createdAt",
        transform: (date) => new Date(date).toDateString(),
    }
]


export default function AllBlogs() {
    const introBlogResource = createResource(getIntroBlog);
    const allBlogsResource = createResource(getAllBlogs);

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ width: "80%", margin: "auto", zIndex: 2, position: "relative" }}>
                <h1 className={Styles.animatedText}>The Legal Pioneer</h1>
                <h3 className={Styles.subHeading} >Navigating the Future of Legal Services – Insights from Claw and Our Global Legal Community</h3>
                <h1 className={Styles.contentHeader}>Featured</h1>
            </div>

            <Suspense fallback={<CardsGroupSkeleton component={ExpandedBlogCardSkeleton} count={1} />}>
                <CardsGroup
                    resource={introBlogResource}
                    propsDataMapping={mapping}
                    component={ExpandedBlogCard}
                />
            </Suspense>

            <div className={Styles.recentContainer} >
                <h1 style={{ backgroundColor: "transparent", fontSize: 52, fontWeight: 600 }}>Recent</h1>
                <Suspense fallback={<CardsGroupSkeleton layoutStyles={{ backgroundColor: "transparent", display: "flex", flexWrap: "wrap" }} component={CollapsedBlogCardSkeleton} count={3} />}>
                    <CardsGroupGrid
                        layoutStyles={{ backgroundColor: "transparent" }}
                        component={CollapsedBlogCard}
                        propsDataMapping={mapping}
                        resource={allBlogsResource}
                    />
                </Suspense>
            </div>
        </div>
    )
}
