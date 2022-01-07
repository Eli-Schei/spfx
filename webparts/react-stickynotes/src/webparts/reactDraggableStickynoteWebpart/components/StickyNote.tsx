import * as React from "react";
import styles from "./ReactDraggableStickynoteWebpart.module.scss";

export interface IStickyNotesProps {
  title: string;
  content: string;
  id: number;
}

const StickyNote: React.FC<IStickyNotesProps> = ({ title, content, id }) => {
  //const [itemId, setItemId] = React.useState(id);

  return (
    <div className={styles.stickyNote}>
      {/* <i onClick={()=>{deleteItem(itemId)}}>X</i> */}
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );

  function deleteItem(id: number){
   // console.log("delete" + itemId)
  }
};

export default StickyNote;
