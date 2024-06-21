import { JSX } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { EntityData } from "@/@types/Game";

type Props = {
  type: "countries" | "capitals";
  data: EntityData[];
};

const PickableData = ({ data, type }: Props): JSX.Element => {
  return (
    <Droppable droppableId={type}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col"
        >
          <h2 className="text-2xl text-center font-semibold mb-4">
            {type.substring(0, 1).toUpperCase() + type.substring(1)}
          </h2>
          <div className="overflow-y-auto max-h-96">
            {data?.map(({ name, disabled }, index) => (
              <Draggable
                key={name}
                draggableId={name}
                index={index}
                isDragDisabled={disabled}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    data-testid={name}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 m-2 border rounded cursor-pointer bg-white dark:bg-gray-700 dark:text-white ${disabled ? "opacity-50 !cursor-not-allowed" : ""}`}
                  >
                    {name}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default PickableData;
