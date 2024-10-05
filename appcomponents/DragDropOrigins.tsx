'use client'
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type Props = {
    originWords: string[]
    correctOrder: string[]
}

const DragDropOrigins = ({ originWords, correctOrder }: Props) => {
    // Initial state for the two rows
    const [row1, setRow1] = useState(originWords || ['card 1', 'card 2']);
    const [row2, setRow2] = useState<Array<string>>([]);

    // Function to handle the drag result
    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // If no destination, exit the function
        if (!destination) return;

        // Moving items between rows
        let sourceList = source.droppableId === 'row1' ? row1 : row2;
        let destinationList = destination.droppableId === 'row1' ? row1 : row2;

        // Copy of the source item being dragged
        const [movedItem] = sourceList.splice(source.index, 1);
        destinationList.splice(destination.index, 0, movedItem);

        // Update rows after movement
        if (source.droppableId === 'row1') {
            setRow1([...sourceList]);
        } else {
            setRow2([...sourceList]);
        }

        if (destination.droppableId === 'row1') {
            setRow1([...destinationList]);
        } else {
            setRow2([...destinationList]);
        }
    };

    const handleSubmit = () => {
        const userOrder = row2.filter(Boolean).map((word) => word);
        if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
            toast({
                description: "Correct order."
            })
        } else {
            toast({
                description: "Incorrect order. Try again",
                variant: "destructive"
            })
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="flex flex-col gap-4">
                    <Droppable droppableId="row1" direction="horizontal">
                        {(provided) => (
                            <div
                                style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem', minHeight: '70px' }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {row1.map((card, index) => (
                                    <Draggable key={card} draggableId={card} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="bg-black text-white p-3 rounded-md cursor-move"

                                            >
                                                {card}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className="text-center">
                        Arrange the words in the correct order
                    </div>
                    <Droppable droppableId="row2" direction="horizontal">
                        {(provided) => (
                            <div
                                style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem', minHeight: '70px' }}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {row2.map((card, index) => (
                                    <div key={card} className="flex items-center gap-2">
                                        <Draggable draggableId={card} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="text-white p-3 rounded-md cursor-move bg-black"
                                               
                                                >
                                                    {card}
                                                </div>
                                            )}
                                        </Draggable>
                                        {/* Render arrow unless it's the last card */}
                                        {index < row2.length - 1 && (
                                            <span className="text-2xl pl-4 font-bold text-red-400" style={{ paddingLeft: "12px" }}>{'>'}</span>
                                        )}
                                    </div>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
            <div className="flex justify-center p-4">

                <Button onClick={handleSubmit} className="w-full">
                    Guess
                </Button>
            </div>
        </>
    );
};

export default DragDropOrigins;
