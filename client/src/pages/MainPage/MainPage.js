import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../../app/slices/todoSlice";
import { fetchTodobyId, todoDeleteById } from "../../app/slices/todoSlice";
import Tooltip from "@mui/material/Tooltip";
import info from "../../icon/text.png";
import deleteIcon from "../../icon/garbage.png";
import editIcon from "../../icon/pencil.png";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import styles from '../../styles/MainPage.module.css'

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

  const handleCreateClick = useCallback(() => {
    navigate("/create");
  }, [navigate]);

  const handleEditClick = useCallback((id) => {
    dispatch(fetchTodobyId(id));
    navigate(`/edit`);
  }, [dispatch, navigate]);

  const handleDelete = useCallback(() => {
    if (selectedId !== null) {
      dispatch(todoDeleteById(selectedId)).then(() => {
        setConfirmOpen(false);
        setSelectedId(null);
      });
    }
  }, [dispatch, selectedId]);
  
  const handleDeleteClick = useCallback((id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  }, []);

  const formatDate = useCallback((dateString) => {
    return dateString.slice(0, -14).split('-').reverse().join('.');

  }, []);

  return (
    <div className={styles.mainPage}>
      <div className={styles.main_title}>
        <h2>Список выпускаемой продукции</h2>
        <div onClick={handleCreateClick} className={styles.title_create}>
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
            <th className={styles.no_border_right}></th>
            <th className={styles.no_border_left}></th>
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
              <td className={styles.no_border_right}>
                <img
                  src={editIcon}
                  alt="Редактировать"
                  onClick={() => handleEditClick(todo.id)}
                />
              </td>
              <td className={styles.no_border_left}>
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

export default React.memo(MainPage);
