import React, { useState } from 'react';

function TodoList() {
  const [activity, setActivity] = useState("");
  const [listData, setListData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  function addActivity() {
    if(activity.length === 0){
      return;
    }
    if (editIndex === -1) {
      const updatedList = [...listData, { text: activity, completed: false }];
      setListData(updatedList);
    } else {
      const updatedList = [...listData];
      updatedList[editIndex] = { text: activity, completed: false };
      setListData(updatedList);
      setEditIndex(-1);
    }
    setActivity('');
  }

  function editActivity(i) {
    setActivity(listData[i].text);
    setEditIndex(i);
  }

  function removeActivity(i) {
    const updatedListData = listData.filter((elem, id) => i !== id);
    setListData(updatedListData);
  }

  function removeAll() {
    setListData([]);
  }

  function moveItemUp(i) {
    if (i > 0) {
      const updatedList = [...listData];
      const temp = updatedList[i];
      updatedList[i] = updatedList[i - 1];
      updatedList[i - 1] = temp;
      setListData(updatedList);
    }
  }

  function moveItemDown(i) {
    if (i < listData.length - 1) {
      const updatedList = [...listData];
      const temp = updatedList[i];
      updatedList[i] = updatedList[i + 1];
      updatedList[i + 1] = temp;
      setListData(updatedList);
    }
  }

  function completeOrUndoActivity(i) {
    const updatedList = [...listData];
    updatedList[i].completed = !listData[i].completed;
    setListData(updatedList);
  }

  return (
    <>
      <div className='container'>
        <div className='header'>TODO LIST</div>
        <input type='text' placeholder='Add Activity' value={activity} 
          onChange={(e) => setActivity(e.target.value)}/>
        <button onClick={addActivity}>{editIndex === -1 ? 'Add' : 'Update'}</button>
        {listData.length > 0 && <p className='List-heading'>List for Today {":)"}</p>}
        {listData.length > 0 && listData.map((data, i) => (
          <div key={i}>
            <div className={`listData ${data.completed ? 'completed' : ''}`}>
              {data.completed ? '✓ ' : ''} {data.text}
            </div>
            <div className='btn-position'>
              <button className='btn-position2' onClick={() => editActivity(i)}>Edit</button>
              <button className='btn-position2' onClick={() => moveItemUp(i)} disabled={i === 0}>Up</button>
              <button className='btn-position2' onClick={() => moveItemDown(i)} disabled={i === listData.length - 1}>Down</button>
              <button className='btn-position2' onClick={() => removeActivity(i)}>Remove</button>
              <button className={`btn-position2 ${data.completed ? 'completed' : ''}`}
                onClick={() => completeOrUndoActivity(i)}>{data.completed ? 'Undo' : 'Complete'}</button>
            </div>
          </div>
        ))}
        {listData.length >= 1 && <button onClick={removeAll}>Remove All</button>}
      </div>
    </>
  );
}

export default TodoList;