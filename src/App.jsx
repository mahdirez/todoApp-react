import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState([]);

  const [newTask, SetNewTask] = useState("");
  const [updateData, SetUpdateData] = useState("");

  function addTask(e) {
    e.preventDefault();
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      SetNewTask("");
    }
  }
  function deleteTask(id) {
    let trashTodo = toDo.filter((item) => item.id !== id);
    setToDo(trashTodo);
  }

  function markDone(id) {
    let isDone = toDo.map((item) => {
      if (item.id === id) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setToDo(isDone);
  }

  function cancelUpdate() {
    SetUpdateData("");
  }

  function changeTask(e) {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false,
    };
    SetUpdateData(newEntry);
  }

  function updateTask() {
    let filterTodo = [...toDo].filter((item) => item.id !== updateData.id);
    let update = [...filterTodo, updateData];
    setToDo(update);
  }
  return (
    <div className=" text-white h-screen  flex item-center justify-center container mx-auto flex-col gap-8">
      {updateData && updateData ? (
        <div className="w-full flex justify-between gap-8 text-xl text-black">
          <input
            type="text"
            className="w-full p-4 border-none outline-none"
            value={updateData && updateData.title}
            onChange={(e) => changeTask(e)}
          />
          <button
            className="w-1/3 bg-green-500 text-white"
            onClick={updateTask}
          >
            Update
          </button>
          <button className="w-1/3 bg-green-500 text-white">Cancel</button>
        </div>
      ) : (
        <form className="w-full flex justify-between gap-8 text-xl text-black">
          <input
            type="text"
            className="w-full p-4 border-none outline-none"
            value={newTask}
            onChange={(e) => SetNewTask(e.target.value)}
          />
          <button
            className="w-1/3 bg-green-500 text-white"
            type="submit"
            onClick={addTask}
          >
            Add Task
          </button>
        </form>
      )}

      {toDo && toDo.length ? "" : "no task"}
      {toDo &&
        toDo
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((item, index) => {
            return (
              <>
                <div
                  className="bg-gray-800 flex justify-between items-center p-4"
                  key={item.id}
                >
                  <div className="flex items-center gap-3 text-xl">
                    <span className=" text-gray-500 text-2xl">{index + 1}</span>
                    <span className={item.status ? "line-through" : ""}>
                      {item.title}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xl">
                    <button
                      className="hover:text-yellow-400"
                      onClick={() => markDone(item.id)}
                    >
                      <i class="bi bi-check-circle-fill"></i>
                    </button>
                    {item.status ? null : (
                      <button
                        className="hover:text-yellow-400"
                        onClick={() =>
                          SetUpdateData({
                            id: item.id,
                            title: item.title,
                            status: item.status ? true : false,
                          })
                        }
                      >
                        <i class="bi bi-pen-fill"></i>
                      </button>
                    )}
                    <button
                      className="hover:text-yellow-400"
                      onClick={() => deleteTask(item.id)}
                    >
                      <i class="bi bi-trash-fill"></i>
                    </button>
                  </div>
                </div>
              </>
            );
          })}
    </div>
  );
}

export default App;
