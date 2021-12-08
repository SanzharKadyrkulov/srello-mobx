import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import boardStore from "./store/boards";
function App() {
  useEffect(() => {
    boardStore.fetchBoards();
  }, []);
  const [boards, setBoards] = useState(boardStore.boards);
  useEffect(() => {
    setBoards(boardStore.boards);
  }, [boardStore.boards]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className == "item") {
      e.target.style.boxShadow = "0 2px 3px gray";
    } else {
      e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    }
  };
  const dragLeaveHandler = (e) => {
    if (e.target.className == "board") {
      e.target.style.backgroundColor = "transparent";
    }
    e.target.style.boxShadow = "none";
  };
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board);
    setCurrentItem(item);
  };
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };
  const dropHandler = (e, board, item) => {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);
    boardStore.saveBoard(currentBoard.id, currentBoard);
    boardStore.saveBoard(board.id, board);
  };
  const dropCardHandler = (e, board) => {
    e.target.style.backgroundColor = "transparent";
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    // setBoards(
    //   boards.map((b) => {
    //     if (b.id === board.id) {
    //       return board;
    //     }
    //     if (b.id === currentBoard.id) {
    //       return currentBoard;
    //     }
    //     return b;
    //   })
    // );
    boardStore.saveBoard(currentBoard.id, currentBoard);
    boardStore.saveBoard(board.id, board);
  };
  const [newBoard, setNewBoard] = useState("");
  const handleChangeBoardInput = (e) => {
    setNewBoard(e.target.value);
  };
  const handleSubmitBoard = (e) => {
    e.preventDefault();
    boardStore.addBoard(newBoard);
    setNewBoard("");
  };
  const [newItem, setNewItem] = useState("");
  const handleChangeItemInput = (e) => {
    setNewItem(e.target.value);
  };
  const handleSubmitItem = (e, board) => {
    e.preventDefault();
    if (e.target[0].value == "") return;
    board.items.push({ id: Date.now(), title: newItem });
    boardStore.saveBoard(board.id, board);
    e.target[0].value = "";
    setNewItem("");
  };
  const handleDeleteItem = (board, item) => {
    board.items = board.items.filter((i) => i.id != item.id);
    boardStore.saveBoard(board.id, board);
  };
  const changeStatus = (board, item) => {
    board.items = board.items.map((i) =>
      i.id === item.id ? { ...item, completed: !item.completed } : i
    );
    boardStore.saveBoard(board.id, board);
  };
  return (
    <>
      <Header />
      <div className="App">
        {boards &&
          boards.map((board) => (
            <div
              onDrop={(e) => dropCardHandler(e, board)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragEnd={(e) => dragEndHandler(e)}
              className="board"
            >
              <div className="board__title">
                {board.title}
                {"   "}
                <span
                  onClick={() => {
                    let flag = true;
                    if (board.items.length > 0) {
                      flag = window.confirm("Are you sure?");
                    }
                    if (flag) {
                      boardStore.deleteBoard(board.id);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  -
                </span>
              </div>

              {board.items.map((item) => (
                <>
                  <div
                    key={item.id}
                    onDragOver={(e) => dragOverHandler(e)}
                    onDragLeave={(e) => dragLeaveHandler(e)}
                    onDragEnd={(e) => dragEndHandler(e)}
                    onDragStart={(e) => dragStartHandler(e, board, item)}
                    onDrop={(e) => dropHandler(e, board, item)}
                    draggable={true}
                    className="item"
                    style={
                      item.completed ? { textDecoration: "line-through" } : {}
                    }
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => changeStatus(board, item)}
                    />
                    {item.title}
                    <button
                      className="btn-del"
                      onClick={() => handleDeleteItem(board, item)}
                      onMouseOver={(e) => (e.target.style.display = "inline")}
                    >
                      X
                    </button>
                  </div>
                </>
              ))}
              <form
                style={{ marginTop: "auto" }}
                onSubmit={(e) => handleSubmitItem(e, board)}
              >
                <input
                  type="text"
                  className="input"
                  onChange={(e) => handleChangeItemInput(e)}
                  placeholder="Add todo..."
                />
              </form>
            </div>
          ))}
        <div className="board">
          <div className="board__title">Add board</div>

          <form onSubmit={(e) => handleSubmitBoard(e)}>
            <input
              className="input"
              type="text"
              value={newBoard}
              onChange={(e) => handleChangeBoardInput(e)}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default observer(App);
