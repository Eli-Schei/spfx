import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import StickyNotesBoard, {
  IStickyNoteBoardProps,
} from "./components/StickyNoteBoard/StickyNoteBoard";
import * as strings from "StickyNotesWebPartStrings";
import DataProvider from "./data/dataprovider";
import { IStickyNotesProps } from "./components/StickyNote/StickyNote";

export interface IStickyNotesWebPartProps {
  description: string;
  lists: string | string[];
  title: string;
}

export default class StickyNotesWebPart extends BaseClientSideWebPart<IStickyNotesWebPartProps> {
  public render(): void {
    this.getListItems().then((results) => {
      console.log(results);
      const element: React.ReactElement<IStickyNoteBoardProps> =
        React.createElement(StickyNotesBoard, {
          description: this.properties.description,
          listItems: results,
          title: this.properties.title
        });

      ReactDom.render(element, this.domElement);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  private async getListItems(): Promise<Array<IStickyNotesProps>> {
    const dataProvider = new DataProvider();
    const items = await dataProvider.getListItems(
      this.properties.lists.toString()
    );

    return items;
  }

  //@ts-ignore
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
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
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
