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
  const [allItems, setAllItems] = React.useState(listItems);

  // let notes;
  // if (allItems) {
  //   notes =
  // }

  return (
    <div className={styles.stickyNoteBoard}>
      <h2>{title}</h2>
      <p>{description}</p>
      <button>Add new note</button>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="stickynotes">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {allItems.length == 0
                ? "No notes available"
                : allItems.map((item, index) => {
                    return (
                      <Draggable
                        key={item.title + item.id}
                        draggableId={item.title + item.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <StickyNote
                              id={item.id}
                              title={item.title}
                              content={item.content}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;
   
    const items = allItems;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAllItems(items);
  }
};

export default StickyNoteBoard;
