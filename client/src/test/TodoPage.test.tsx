import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import TodoPage from "../pages/TodoPage/TodoPage";
import { requestAddTodo, toggleTodoDone, requestDeleteTodo, requestAllTodos } from "../api/todoOperations";
import userEvent from "@testing-library/user-event";

jest.mock("../api/todoOperations", () => ({
  requestAddTodo: jest.fn(),
  toggleTodoDone: jest.fn(),
  requestDeleteTodo: jest.fn(),
  requestAllTodos: jest.fn(),
}));

const mockTodos = [
  { id: 1, title: "Test Todo 1", completed: false },
  { id: 2, title: "Test Todo 2", completed: true },
];

describe("TodoPage Component", () => {

  beforeEach(() => {
    cleanup(); // Clears the DOM between tests
    jest.clearAllMocks(); // Resets any mocked functions
    (requestAllTodos as jest.Mock).mockResolvedValue(mockTodos);
  });
  

  test("renders TodoPage component", async () => {
    render(<TodoPage />);
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("Test Todo 1")).toBeInTheDocument());
  });

  test("adds a new todo", async () => {
    (requestAddTodo as jest.Mock).mockResolvedValue({ data: { id: 3 } });

    render(<TodoPage />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add");

    const taskName = "cool new todo";

    await userEvent.type(input, taskName);
    fireEvent.click(addButton);

    await waitFor(() => expect(requestAddTodo).toHaveBeenCalledWith(taskName));
  });

  test("toggles a todo as completed", async () => {
    render(<TodoPage />);
    await waitFor(() => expect(screen.getByText("Test Todo 1")).toBeInTheDocument());

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    await waitFor(() => expect(toggleTodoDone).toHaveBeenCalledWith(mockTodos[0], 1));
  });

  test("deletes a todo", async () => {
    render(<TodoPage />);
    await waitFor(() => expect(screen.getByText("Test Todo 1")).toBeInTheDocument());

    const deleteButton = screen.getAllByText("delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => expect(requestDeleteTodo).toHaveBeenCalledWith(1));
  });

  test("filters active todos", async () => {
    render(<TodoPage />);
    await waitFor(() => expect(screen.getByText("Test Todo 1")).toBeInTheDocument());

    const activeButton = screen.getByText("Active");
    fireEvent.click(activeButton);

    await waitFor(() => expect(screen.queryByText("Test Todo 2")).not.toBeInTheDocument());
  });

  test("filters completed todos", async () => {
    render(<TodoPage />);
    await waitFor(() => expect(screen.getByText("Test Todo 2")).toBeInTheDocument());

    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);

    await waitFor(() => expect(screen.queryByText("Test Todo 1")).not.toBeInTheDocument());
  });

  test("clears completed todos", async () => {
    render(<TodoPage />);
    await waitFor(() => expect(screen.getByText("Test Todo 2")).toBeInTheDocument());

    const clearButton = screen.getByText("Clear completed todos");
    fireEvent.click(clearButton);

    await waitFor(() => expect(requestDeleteTodo).toHaveBeenCalledWith(2));
  });

  test("fails to add an empty todo", async () => {
    render(<TodoPage />);
    const addButton = screen.getByText("Add");
  
    fireEvent.click(addButton);
  
    await waitFor(() => expect(requestAddTodo).not.toHaveBeenCalled()); // This should fail
  });


  test("fails to delete a non-existent todo", async () => {
    render(<TodoPage />);
  
    const nonExistentId = 400;
    const deleteButtons = screen.queryAllByText("delete");
    
    if (deleteButtons.length > 0) {
      fireEvent.click(deleteButtons[0]);
    } // if no buttons exists, we can't click it
  
    await waitFor(() => expect(requestDeleteTodo).not.toHaveBeenCalledWith(nonExistentId)); // This should pass
  });
  
  test("fails to add a todo with only spaces", async () => {
    render(<TodoPage />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const addButton = screen.getByText("Add");

    await userEvent.type(input, "       ");
    fireEvent.click(addButton);
    
    fireEvent.click(addButton);
  
    await waitFor(() => expect(requestAddTodo).not.toHaveBeenCalled()); // Should not call API
  });
});
