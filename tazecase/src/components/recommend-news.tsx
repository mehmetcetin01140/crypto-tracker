import NewsCard from './news-card'


export default function RecommendNews() {
  return (
    <div className='px-xl-3 px-lg-0 news-recommend' >
    <h5>Other News</h5>
    <NewsCard isDetailPageRendering={true}/>
    </div>
  )
}