import React from 'react';


const CustomForm = ({
  packsNumber,
  setPacksNumber,
  packageType,
  setPackageType,
  isArchived,
  setIsArchived,
  description,
  setDescription,
}) => {
  return (
    <div>
      <div className="form-row">
        <span>Кол-во пачек *</span>
        <input
          type="text"
          value={packsNumber}
          onChange={(e) => setPacksNumber(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <span>Тип упаковки *</span>
        <select
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="компрессия">компрессия</option>
          <option value="некомпрессия">некомпрессия</option>
        </select>
      </div>
      <div className="form-row">
        <span>Архивировано</span>
        <input
          type="checkbox"
          checked={isArchived}
          onChange={(e) => setIsArchived(e.target.checked)}
        />
      </div>
      <div className="form-row">
        <span>Описание</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomForm;