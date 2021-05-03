declare interface ISimpleRssFeedWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  rss_URL_Label: string;
  custom_header: string;
  max_articles: string;
  select_type: string;
  
}

declare module 'SimpleRssFeedWebPartStrings' {
  const strings: ISimpleRssFeedWebPartStrings;
  export = strings;
}
