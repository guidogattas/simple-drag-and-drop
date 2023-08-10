import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { useState, useEffect } from "react"

const initialTodos = JSON.parse(localStorage.getItem('todos')) ||
  [
    { id: 1, text: "Drag" },
    { id: 2, text: "And" },
    { id: 3, text: "Drop" },
  ]

const App = () => {

  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
    const items = localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  const handleDragEnd = result => {
    if (!result.destination) return;
    const startIndex = result.source.index
    const endIndex = result.destination.index
    const copyArray = [...todos]
    const [reorderedItem] = copyArray.splice(startIndex, 1)
    copyArray.splice(endIndex, 0, reorderedItem)

    setTodos(copyArray)
  }



  return (
    <>
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <h1>Drag and Drop</h1>
        <Droppable droppableId="todos">
          {(droppableProvider) => (
            <ul ref=
              {droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {todos.map((todo, index) => (
                <Draggable
                  index={index}
                  key={todo.id}
                  draggableId={`${todo.id}`}>
                  {(draggableProvider) => (
                    <li
                      ref={draggableProvider.innerRef}
                      {...draggableProvider.dragHandleProps}
                      {...draggableProvider.draggableProps}
                    >
                      {todo.text}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvider.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}

export default App