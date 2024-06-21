import { JSX } from "react";
import { Droppable } from "react-beautiful-dnd";
import { SelectedPair } from "@/@types/Game";

type Props = {
  selectedPair: SelectedPair;
};

const DropArea = ({ selectedPair }: Props): JSX.Element => {
  return (
    <Droppable droppableId="dropArea">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-full max-w-2xl p-4 m-2 border-2 border-dashed rounded h-32 flex flex-col items-center justify-center"
          data-testid="dropArea"
        >
          <div className="flex justify-center gap-4">
            {selectedPair.country && (
              <div className="p-4 m-2 border rounded bg-green-500 text-white">
                {selectedPair.country}
              </div>
            )}
            {selectedPair.capital && (
              <div className="p-4 m-2 border rounded bg-blue-500 text-white">
                {selectedPair.capital}
              </div>
            )}
          </div>
          <p className="text-lg">Drag and drop here to match</p>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropArea;
