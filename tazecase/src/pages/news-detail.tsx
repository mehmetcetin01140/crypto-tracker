import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { fetchNews } from "../apicalls/api";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import RecommendNews from "../components/recommend-news";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Transition from "../animations/transition";
import { Helmet, HelmetProvider } from "react-helmet-async";
type Props = {};

export default function NewsDetail({}: Props) {
  const { id } = useParams<{ id: string | undefined }>();

  const { data, isLoading, isError } = useQuery(["fetchnewsdetail", id], () =>
    fetchNews(id)
  );

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);
  return (
    <HelmetProvider>
    <Helmet>
      <title>{data?.title}</title>
      <meta name="description" content={data?.title} />
    </Helmet>
    <Transition>
      <Container fluid className="news-detail">
        <Row>
          <Col xl={8} lg={12} className="news-detail-first-column">
            <div className="news-detail-header">
              <div className="news-detail-header-top">
                <span>{data?.date}</span>
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  onClick={() => navigate(-1)}
                />
              </div>
              <h3>{data?.title}</h3>
              <img
                src={data?.image}
                style={{ width: "100%", height: "400px" }}
                alt="news"
              />
            </div>
            <div className="news-detail-content">
              {parse(data?.desc || "Loading...")}
            </div>
          </Col>
          <Col xl={4} lg={12}>
            <RecommendNews />
          </Col>
        </Row>
      </Container>
    </Transition>
    </HelmetProvider>
  );
}
