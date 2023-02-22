import React from 'react'
import NewsCard from './news-card'
type Props = {}

export default function RecommendNews({}: Props) {
  return (
    <div className='px-xl-3 px-lg-0 news-recommend' >
    <h5>Other News</h5>
    <NewsCard isDetailPageRendering={true}/>
    </div>
  )
}