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
        <div style={{ position: "relative", backgroundColor: "#13161f" }}>
            <div style={{ position: "absolute", marginLeft: "calc(50vw - 400px)", height: 943, width: 761, background: "radial-gradient(circle, rgba(137, 64, 255,0.45) 0%, rgba(137, 64, 255, 0.15) 65%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.15)", top: "-500px", borderRadius: 500 }} />
            <Header />
            <div style={{ width: "80%", margin: "auto", color: "white", zIndex: 2, position: "inherit", background: "transparent" }}>
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
                <Suspense fallback={<CardsGroupSkeleton component={CollapsedBlogCardSkeleton} count={3} />}>
                    <CardsGroupGrid
                        layoutStyles={{ backgroundColor: "transparent" }}
                        component={CollapsedBlogCard}
                        propsDataMapping={mapping}
                        resource={allBlogsResource}
                    />
                </Suspense>
            </div>
            <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", height: 428, width: 428, left: 50, top: "-214px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <div style={{ position: "absolute", height: 428, width: 428, right: "-200px", top: "-200px", background: "radial-gradient(circle, rgba(137, 64, 255,0.1) 0%, rgba(137, 64, 255, 0.05) 70%)", boxShadow: "0 0 100px 100px rgba(137, 64, 255, 0.05)", borderRadius: 428 }} />
                <FooterBanner />
            </div>
        </div>
    )
}
