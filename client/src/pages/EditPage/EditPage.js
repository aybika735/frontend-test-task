import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodobyId, todoDeleteById } from "../../app/slices/todoSlice";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";
import CustomForm from "../../components/CustomForm";
import styles from '../../styles/CreatePage.module.css'
const EditPage = () => {
  const [packsNumber, setPacksNumber] = useState("");
  const [packageType, setPackageType] = useState("");
  const [isArchived, setIsArchived] = useState(false);
  const [description, setDescription] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const todo = useSelector((state) => state.todosSlice.todosId);
  const todos = useSelector((state) => state.todosSlice.todos);
  const todoToEdit = todos.find((item) => item.id === todo.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (todoToEdit) {
      setPacksNumber(todoToEdit.packsNumber || "");
      setPackageType(todoToEdit.packageType || "");
      setIsArchived(todoToEdit.isArchived || false);
      setDescription(todoToEdit.description || "");
    }
  }, [todoToEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      editTodobyId({
        id: todo.id,
        packsNumber,
        packageType,
        isArchived,
        description,
      })
    );

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleDelete = () => {
    dispatch(todoDeleteById(todo.id));
    setConfirmOpen(false); 
    navigate("/"); 
  };

  return (
    <div className={styles.edit_page}>
      <h2>Редактирование типа продукции</h2>
      <form onSubmit={handleSubmit}>
      <CustomForm
      key ={todo.id}
      packsNumber={packsNumber}
      setPacksNumber={setPacksNumber}
      packageType={packageType}
      setPackageType={setPackageType}
      isArchived={isArchived}
      setIsArchived={setIsArchived}
      description={description}
      setDescription={setDescription}
    />
        <div className={styles.buttons}>
          <button type="button" onClick={() => setConfirmOpen(true)}>
            Удалить
          </button>
          <button type="button" onClick={handleCancel}>
            Отмена
          </button>
          <button type="submit">Сохранить</button>
        </div>
        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Подтверждение удаления"
          message="Вы действительно хотите удалить этот продукт?"
        />
      </form>
    </div>
  );
};

export default EditPage;
