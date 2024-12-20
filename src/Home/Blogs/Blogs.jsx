import React, { Suspense, forwardRef } from "react";
import {
  ExpandedBlogCard,
  ExpandedBlogCardSkeleton,
} from "../../components/ExpandedBlogCard";
import { NODE_API_ENDPOINT } from "../../utils/utils";

import Styles from "./Blogs.module.css";
import { createResource } from "../../utils/promiseWrapper";
import {
  CardsGroup,
  CardsGroupSkeleton,
} from "../../components/CardsGroup/index";

async function fetchBlogs() {
  const response = await fetch(
    `${NODE_API_ENDPOINT}/blog?limit=${2}&page=${1}`
  );
  const parsed = await response.json();
  return parsed;
}

const mapping = [
  {
    key: "blogId",
    value: "_id",
  },
  {
    key: "imageHeading",
    value: "heading",
    transform: (value) => value.split(" ")[0],
  },
  {
    key: "imageSubHeading",
    value: "heading",
    transform: (value) => value.split(" ").slice(1).join(" "),
  },
  {
    key: "heading",
    value: "heading",
  },
  {
    key: "subHeading",
    value: "subHeading",
  },
];
export default forwardRef(function Blogs(props, ref) {
  const fetchBlogsResource = createResource(fetchBlogs);
  return (
    <div ref={ref} className={Styles.blogsContainer}>
      <h1 className={Styles.blogsHeading}>
        Insights and
        <span
          style={{
            position: "relative",
            display: "inline-block",
            backgroundColor: "transparent",
          }}>
          <span
            style={{
              position: "relative",
              background: "transparent",
              zIndex: 10,
            }}>
            Update
          </span>
          <div
            style={{
              position: "absolute",
              width: "96%",
              bottom: "8%",
              left: "2%",
              height: 12,
              backgroundColor: "#008080",
            }}
          />
        </span>
      </h1>
      <Suspense
        fallback={
          <CardsGroupSkeleton component={ExpandedBlogCardSkeleton} count={2} />
        }>
        <CardsGroup
          component={ExpandedBlogCard}
          resource={fetchBlogsResource}
          propsDataMapping={mapping}
        />
      </Suspense>
    </div>
  );
});
