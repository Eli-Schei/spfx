import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "ReactDraggableStickynoteWebpartWebPartStrings";

import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import StickyNotesBoard, {
  IStickyNotesBoardProps,
} from "./components/StickyNotesBoard";
import { IStickyNotesProps } from "./components/StickyNote";
import DataProvider from "./data/dataProvider";

export interface IReactDraggableStickynoteWebpartProps {
  title: string;
  description: string;
  lists: string | string[];
}

export default class ReactDraggableStickynoteWebpart extends BaseClientSideWebPart<IReactDraggableStickynoteWebpartProps> {
  public render(): void {
    this.getListItems()
      .then((results) => {      
        if (results) {
          const element: React.ReactElement<IStickyNotesBoardProps> =
            React.createElement(StickyNotesBoard, {
              title: this.properties.title,
              boardDescription: this.properties.description,
              listItems: results,
            });
          ReactDom.render(element, this.domElement);
        }else{
          const element =
            React.createElement("h2", {}, "You must select a list");
          ReactDom.render(element, this.domElement);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private async getListItems(): Promise<Array<IStickyNotesProps>> {
    const dataProvider = new DataProvider();
    const listGUID = this.properties.lists ? this.properties.lists.toString() : ""
    const items = await dataProvider.getListItems(
      listGUID
    );
    return items;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyFieldListPicker("lists", {
                  label: "Select a list",
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: "listPickerFieldId",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
