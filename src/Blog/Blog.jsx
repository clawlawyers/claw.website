import React from 'react'
import Header from '../Header/Header'
import FooterBanner from '../FooterBanner/FooterBanner'
import BlogDetail from './BlogDetail'

export default function Blog() {
    return (
        <div>
            <Header />
            <BlogDetail />
            <FooterBanner />
        </div>
    )
}
