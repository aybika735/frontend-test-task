import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../../app/slices/todoSlice";
import { useNavigate } from "react-router-dom";
import CustomForm from "../../components/CustomForm/CustomForm";
import styles from '../../styles/CreatePage.module.css'
const CreatePage = () => {
  const [packsNumber, setPacksNumber] = useState("");
  const [packageType, setPackageType] = useState("компрессия");
  const [isArchived, setIsArchived] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createTodo({ packsNumber, packageType, isArchived, description }));
    navigate("/");
  };

  const handleCancel = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className={styles.create_page}>
      <h2>Создание типа продукции</h2>
      <form onSubmit={handleSubmit}>
      <CustomForm
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
          <button type="button" onClick={handleCancel}>
            Отмена
          </button>
          <button type="submit">Создать</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
