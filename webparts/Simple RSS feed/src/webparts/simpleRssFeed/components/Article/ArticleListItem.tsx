import * as React from "react";
import styles from "../SimpleRssFeed.module.scss";
import { IArticle } from "./interfaces";

export interface IArticleListItem extends IArticle {}

const ArticleListItem: React.FC<IArticleListItem> = ({
  title,
  pubDate,
  summary,
  link,
}) => {
  return <div className={styles.articleCard}>
            <h2>{title}</h2>
        </div>;
};

export default ArticleListItem;
