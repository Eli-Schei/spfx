import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";

import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IArticle } from "./components/Article/interfaces";
import * as $ from "jquery";
import * as strings from "SimpleRssFeedWebPartStrings";
import SimpleRssFeed, {
  ISimpleRssFeedProps,
} from "./components/RSSFeed/SimpleRssFeedContainer";

export interface ISimpleRssFeedWebPartProps {
  articles: Array<IArticle>;
  maxArticles: number;
  rssURL: string;
  customHeader: string;
  selectDisplayType: string;
}

export default class SimpleRssFeedWebPart extends BaseClientSideWebPart<ISimpleRssFeedWebPartProps> {
  public render(): void {
    if (this.properties.rssURL != undefined) {
      this.getRssFeedAsJson(this.properties.rssURL);
    }
  }

  /* Uses the URL from the propertypane to get the RSS feed as JSON through rss2json.com
  To use the "count" parameter you need to register with rss2json and get an API key */
  private getRssFeedAsJson(rssURL: string) {
    $.ajax({
      url: "https://api.rss2json.com/v1/api.json",
      method: "GET",
      dataType: "json",
      data: {
        rss_url: rssURL,
        //, api_key: '0000000000000000000000000000000000000000', // put your api key here
        //count: 6
      },
    }).done((response) => {
      if (response.status != "ok") {
        throw response.message;
      }

      const rssArticles = response.items.map((item) => {
        return {
          title: item.title,
          summary: item.description,
          pubDate: item.pubDate,
          link: item.link,
        } as IArticle;
      });
      this.properties.articles = rssArticles;
      console.log("got feed, rendering element")
      const element: React.ReactElement<ISimpleRssFeedProps> = React.createElement(
        SimpleRssFeed,
        {
          customHeader: this.properties.customHeader,
          articles: this.properties.articles,
          numberToShow: this.properties.maxArticles,
          displayCard: (this.properties.selectDisplayType === "DISPLAY_CARD") ? true : false,
        }
      );
      ReactDom.render(element, this.domElement);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //@ts-ignore
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("customHeader", {
                  label: strings.custom_header,
                }),
                PropertyPaneTextField("rssURL", {
                  label: strings.rss_URL_Label,
                }),
                PropertyPaneSlider("maxArticles", {
                  label: strings.max_articles,
                  min: 1,
                  max: 10,
                  value: 3,
                  showValue: true,
                  step: 1,
                }),
                PropertyPaneDropdown("selectDisplayType", {
                  label: strings.select_type,
                  options: [
                    { key: "DISPLAY_CARD", text: "Cards" },
                    { key: "DISPLAY_LIST", text: "List Items" },
                  ],
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
