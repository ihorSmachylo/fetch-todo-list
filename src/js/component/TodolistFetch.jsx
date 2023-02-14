import React, { useState, useEffect } from "react"
 
export const TodolistFetch = () => {

  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);

//   const getList = async () => {
//     fetch("http://assets.breatheco.de/apis/fake/todos/user/ihor2", {
//        method :"GET",
//        redirect: "follow",
//    })
//    .then((response) => {
//                return response.json();
//            })
//    .then((data) => {
//        setlist(data);
//    })
//    .catch((error) => {
//        console.error(error);
//    });
// };
//  useEffect(() => {
//   getList();
//  }, [])


 const url = 'http://assets.breatheco.de/apis/fake/todos/user/ihor2';
 const requestOptions = { method: 'GET',redirect: "follow", };
 const fetchApi = async () => {
   const response = await fetch(url, requestOptions);
   const responseJSON = await response.json();
   setList(responseJSON);
 };

 useEffect(() => {
  fetchApi();
}, []);



 
 fetch("http://assets.breatheco.de/apis/fake/todos/user/ihor", requestOptions)
   .then(response => response.json())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));


  const deleteTask = (index) => {
    setList(list.filter((element, id) => index !== id));
  };

  const addTask = (event) => {
    event.preventDefault();
    if (inputValue === "") return;
    setList([...list, inputValue]);
    setInputValue("");
  };
  useEffect(() => {
    console.log(list)
  }, [list])
 
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
          {list.map((listElement, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between hidden-icon"
            >
              {listElement}
              <span onClick={() => deleteTask(index)}>
                <i className="fas fa-trash"></i>
              </span>
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