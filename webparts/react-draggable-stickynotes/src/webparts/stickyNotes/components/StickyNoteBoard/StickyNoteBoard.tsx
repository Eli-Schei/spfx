import * as React from "react";
import StickyNote, { IStickyNotesProps } from "../StickyNote/StickyNote";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./StickyNoteBoard.module.scss";

export interface IStickyNoteBoardProps {
  title: string;
  description: string;
  listItems: Array<IStickyNotesProps>;
}

const StickyNoteBoard: React.FC<IStickyNoteBoardProps> = ({
  title,
  description,
  listItems,
}) => {
  let notes;
  if (listItems) {
    notes = listItems.map((item, index) => {
      return (
        <Draggable
          key={item.id}
          draggableId={item.id}
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <StickyNote id={item.id} title={item.title} content={item.content} />
            </div>
          )}
        </Draggable>
      );
    });
  }

  return (
    <div className={styles.stickyNoteBoard}>
      <h2>{title}</h2>
      {description}
      <button>Add new note</button>
      <DragDropContext>
        <Droppable droppableId="stickynotes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} >
              {notes ? notes : "There are no notes"}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default StickyNoteBoard;
