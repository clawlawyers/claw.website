import { BlogCard, BlogCardSkeleton } from "../components/blogCard";

export function LinkingBlogs({ resource }) {
    const blogs = resource.read();
    return (
        <div style={{ width: "100%" }}>
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
    )
}

export function LinkingBlogsSkeleton() {
    return <div>
        <BlogCardSkeleton />
        <BlogCardSkeleton />
    </div>
}