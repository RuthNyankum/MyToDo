import React, { useState } from 'react';
import Styles from '../component/taskList.module.css';

function TaskItems({
  taskText,
  taskId,
  completed,
  onDelete,
  onEdit,
  onToggle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(taskText);

  const handleSave = () => {
    // Validate that the text is not empty
    if (editText.trim() === '') {
      alert('Task cannot be empty!');
      return;
    }

    onEdit(taskId, editText.trim()); // call parent update
    setIsEditing(false); // exit edit mode
  };

  const handleCancel = () => {
    setEditText(taskText); // Reset to original text
    setIsEditing(false); // exit edit mode
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={Styles.taskItem}>
      <div className={Styles.left}>
        <input
          type="checkbox"
          className={Styles.squareCheck}
          checked={completed}
          onChange={() => onToggle(taskId, !completed)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className={Styles.editInput}
            autoFocus
          />
        ) : (
          <span className={completed ? Styles.completedText : ''}>
            {taskText}
          </span>
        )}
      </div>
      <div className={Styles.btnGroup}>
        {isEditing ? (
          <>
            <p className={Styles.save} onClick={handleSave}>
              save
            </p>
            <p className={Styles.cancel} onClick={handleCancel}>
              cancel
            </p>
          </>
        ) : (
          <>
            {!completed && ( //  only show edit if not completed
              <p className={Styles.edit} onClick={() => setIsEditing(true)}>
                Edit
              </p>
            )}
            <p className={Styles.delete} onClick={() => onDelete(taskId)}>
              Delete
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskItems;
