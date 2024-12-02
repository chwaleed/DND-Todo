import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TodoProvider } from "./context/TodoContext.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <TodoProvider>
        <App />
      </TodoProvider>
    </DndProvider>
  </StrictMode>
);
