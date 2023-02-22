import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { fetchNews } from "../apicalls/api";
import { useParams } from "react-router-dom";
import type { NewsTypes } from "../types/api-types";
type Props = {
  isDetailPageRendering: boolean;
};
export default function NewsCard({ isDetailPageRendering }: Props) {
  const { data, isLoading, isError } = useQuery(["fetchnewsdetail", ""], () =>
    fetchNews("")
  );
  const { id } = useParams();
  const showNewsOtherThanDisplayedNewsOnDetailPage: NewsTypes[] =
    isDetailPageRendering
      ? data?.filter((news: any) => news.id !== Number(id))
      : data;

  return (
    <>
      <Row xs={1} md={1} lg={isDetailPageRendering ? 1 : 2} className="g-4">
        {showNewsOtherThanDisplayedNewsOnDetailPage?.map((news: NewsTypes) => (
          <Link
            to={`/news/${news.id}`}
            style={{ textDecoration: "none", color: "black" }}
            key={news.id}
          >
            <Col>
              <Card style={{ height: isDetailPageRendering ? "auto" : 490 }} className={!isDetailPageRendering ? "news-card" : ""}>
                <Card.Img
                  variant="top"
                  src={news.image}
                  style={{
                    objectFit: "fill",
                    height: isDetailPageRendering ? 275 : 350,
                  }}
                />
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text>
                    {parse(`${news?.desc?.slice(0, 60)}...` || "loading")}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Link>
        ))}
      </Row>
    </>
  );
}
