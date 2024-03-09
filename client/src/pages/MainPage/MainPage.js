import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../../app/slices/todoSlice";
import { fetchTodobyId, todoDeleteById } from "../../app/slices/todoSlice";
import Tooltip from "@mui/material/Tooltip";
import info from "../../icon/text.png";
import deleteIcon from "../../icon/garbage.png";
import editIcon from "../../icon/pencil.png";
import ConfirmDialog from "../../components/ConfirmDialog";

const MainPage = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(false);
  const fetchedTodos = useSelector((state) => state.todosSlice.todos);
  const [todos, setTodos] = useState(fetchedTodos);
  console.log(todos)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos()).then((action) => {
      setTodos(action.payload);
    });
  }, [dispatch]);

  const handleCreateClick = () => {
    navigate("/create");
  };

  const handleEditClick = (id) => {
    dispatch(fetchTodobyId(id));
    navigate(`/edit`);
  };

  const handleDelete = () => {
    if (selectedId !== false) {
      dispatch(todoDeleteById(selectedId)).then(() => {
        setTodos(todos.filter((todo) => todo.id !== selectedId));
        setConfirmOpen(false);
        setSelectedId(false);
      });
    }
  };
  
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const formatDate = useCallback((dateString) => {
    return dateString.slice(0, -14).split('-').reverse().join('.');

  }, []);

  return (
    <div className="mainPage">
      <div className="main_title">
        <h2>Список выпускаемой продукции</h2>
        <div onClick={handleCreateClick} className="title_create">
          Создать тип продукции
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Кол-во пачек</th>
            <th>Тип упаковки</th>
            <th>Дата создания</th>
            <th>Статус</th>
            <th></th>
            <th className="no-border-right"></th>
            <th className="no-border-left"></th>
          </tr>
        </thead>
        <tbody>
          {todos?.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td>{todo.packsNumber}</td>
              <td>{todo.packageType}</td>
              <td>{formatDate(todo.createdAt)}</td>
              <td>{todo.isArchived ? "Архив" : "Активно"}</td>
              <td>
                <Tooltip
                  title={todo.description || "Описание отсутствует"}
                  placement="top"
                >
                  <img src={info} alt="Инфо" style={{ cursor: "pointer" }} />
                </Tooltip>
              </td>
              <td className="no-border-right">
                <img
                  src={editIcon}
                  alt="Редактировать"
                  onClick={() => handleEditClick(todo.id)}
                />
              </td>
              <td className="no-border-left">
                <img
                  src={deleteIcon}
                  alt="Удалить"
                  onClick={() => handleDeleteClick(todo.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Подтверждение удаления"
        message="Вы действительно хотите удалить этот продукт?"
      />
    </div>
  );
};

export default MainPage;
