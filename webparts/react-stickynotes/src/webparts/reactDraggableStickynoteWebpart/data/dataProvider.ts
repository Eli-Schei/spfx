import { Guid } from "@microsoft/sp-core-library";
import { sp } from "@pnp/sp";
// import "@pnp/sp/webs";
// import "@pnp/sp/lists";
// import "@pnp/sp/items";
import { IStickyNotesProps } from "../components/StickyNote";

export default class DataProvider {
  public initDataProvider(context) {
    sp.setup({
      spfxContext: context,
    });
  }

  public async getListItems(
    listGUID: string
  ): Promise<Array<IStickyNotesProps>> {
    // get all the items from a list
    if (listGUID) {
      const items: any[] = await sp.web.lists.getById(listGUID).items.get();
      const mappedItems = items.map((item) => {
        return {
          title: item.Title,
          content: item.Content,
          id: item.GUID,
        } as IStickyNotesProps;
      });
      return mappedItems;
    } else {
        return null;
    }
  }

  public saveListItems() {}
}
