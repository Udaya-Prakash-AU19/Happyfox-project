/**
 * @file CardComponent
 * @description Implementation of each card shown in hierarchial representation
 * @author Happyfox
 * @version 1.0
 */

// Libraries
import "../Styles/CardComponent.scss";
import { Draggable } from "react-beautiful-dnd";

// Actual component
export default function CardComponent({ nodeData }) {
  const { id, name, designation, picture } = nodeData;

  return (
    <Draggable key={id} draggableId={id} index={parseInt(id)}>
      {(provided) => (
        <div
          className="card-container"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <div className="image-container">
            <img src={picture} alt={name} height={"100%"} width={"100%"} />
          </div>
          <div className="details">
            <div>{name}</div>
            <div>{designation}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
