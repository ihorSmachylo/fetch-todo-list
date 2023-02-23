import React, { useState, useEffect } from "react"


const TodolistFetch = () => {
  
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  const url = "https://assets.breatheco.de/apis/fake/todos/user/ihor2"
  

  const fetchGetTodos = async () => {
    const request = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(url, request);
    if(response.ok){
      const responseJSON = await response.json();
      responseJSON.map( (item) => {setList((e) => [...e, item.label]);} )
    }else {
      console.log("error")
    }
   
  };

useEffect(() => {
    fetchGetTodos();
  }, [])

 

  // const deleteTask = (index) => {
  //   setList(list.filter((element, id) => index !== id));
  // };

  const putFetchTodos = async (todos) => {
    const request = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todos),
    };
    const response = await fetch(url, request);
    
    if (response.ok) {
      const responseJSON = await response.json(); 
      console.log("todo ok");
    } else {
      console.log('error');
    }
  }


  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") {
      return;
    }else {
      let arrayTodos = [];
      for (let i = 0 ; i < list.length; i++){
        const element = list[i];
        let item = {};
        item['label'] = element;
        item['done'] = false;
        arrayTodos.push(item);
      };
      arrayTodos.push({'label': inputValue, 'done': false})
      putFetchTodos(arrayTodos);
      setList([...list, inputValue]);
      setInputValue("");
    }
  
  };

  return (
    <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
      <h1 className="text-center text-primary">Todos</h1>
      <div className="mb-3">
        <form onSubmit={addTask}>
          <input
            className="form-control"
            placeholder="Write a new task"
            type="text"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </form>
      </div>
      <h2 className="text-primary">Todos List</h2>
      <div className="list">
        <ul className="list-group">
        {/* {list.map( (listElement, index) => {
            return  <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                        {listElement}
                    </li>
            })} */}
          {list.map((listElement, index) => (
            <li
              key={index}className="list-group-item d-flex justify-content-between hidden-icon">
              {listElement.label}
            </li>
          ))}
          <span className="list-group-item bg-light text-end fw-lighter">
            {list.length === 0
              ? "No tasks, add a task"
              : `${list.length} Item Left`}
          </span>
        </ul>
      </div>
    </div>
  );
};

export default TodolistFetch;