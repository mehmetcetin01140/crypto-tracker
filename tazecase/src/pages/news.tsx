import React from "react";
import NewsCard from "../components/news-card";
import Transition from "../animations/transition";
import { Helmet, HelmetProvider } from "react-helmet-async";
type Props = {};

export default function News({}: Props) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>News</title>
          <meta name="description" content="Crypto News" />
        </Helmet>
        
        </HelmetProvider>
    <Transition>
      <div className="news-page">
        <div className="news-page-title">
          <h4>Latest Crypto Currency News</h4>
        </div>
        <NewsCard isDetailPageRendering={false} />
      </div>
    </Transition>
    </>
  );
}
