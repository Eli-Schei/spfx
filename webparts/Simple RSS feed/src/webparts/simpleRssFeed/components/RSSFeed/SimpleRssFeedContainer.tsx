import * as React from "react";
import { IArticle } from "../Article/interfaces";
import ArticleCards from "../Article/ArticleCard";
import styles from "../SimpleRssFeed.module.scss";
import ArticleListItem from "../Article/ArticleListItem";

export interface ISimpleRssFeedProps {
  customHeader: string;
  articles: Array<IArticle>;
  numberToShow: number;
  displayCard: boolean;
}



const SimpleRssFeedContainer: React.FC<ISimpleRssFeedProps> = ({
  customHeader,
  articles,
  numberToShow,
  displayCard
}) => {
  const [header, setHeader] = React.useState(customHeader);
  //If you dont have an API key to set max articles use this state to set a max. 
  const [maxArticles, setMaxArticles] = React.useState(numberToShow);
  const [allArticles, setAllArticles] = React.useState(Array<any>());
  const [displayType, setDisplayType] = React.useState(displayCard);


  React.useEffect(() => {
    if (articles.length > 0) {
      const initialArticles = articles.map((article) => {
        if(displayCard) {
                  return (
          <ArticleCards
            key={article.link}
            title={article.title}
            summary={article.summary}
            link={article.link}
            pubDate={article.pubDate}
          ></ArticleCards>
        );
        }else{
          return (
            <ArticleListItem
              key={article.link}
              title={article.title}
              summary={article.summary}
              link={article.link}
              pubDate={article.pubDate}
            ></ArticleListItem>
          );
        }

      });

      /** 
       * TODO: Add filter for max articles
       */

      setAllArticles(initialArticles);
    }
  }, []);

  React.useEffect(() => {
    console.log(displayType);
  }, [displayType])


  return (
    <div className={styles.container}>
      <h1>{header}</h1>
      <div>{allArticles}</div>
    </div>
  );
};

export default SimpleRssFeedContainer;
