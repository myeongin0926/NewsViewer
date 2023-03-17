import { useParams } from "react-router";
import Navigation from "../components/Navigation";
import NewsListTemplate from "../components/NewsListTemplate";

const NewsPage = () => {
  const params = useParams();
  const category = params.category || "all";

  return (
    <>
      <Navigation />
      <NewsListTemplate category={category} />
    </>
  );
};

export default NewsPage;
