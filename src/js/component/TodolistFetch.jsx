import React, { useState, useEffect } from "react"

export const TodolistFetch = () => {

  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);


  let host = 'http://assets.breatheco.de/apis/fake/todos/user/';
  let user = 'ihor5';
  let url = 'http://assets.breatheco.de/apis/fake/todos/user/ihor5'

  //  intento codigo 1
  // const fetchGetTodos = async () => {
  //   const url = host + user;
  //   const request = {
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
  //   const response = await fetch(url, request);
  //   console.log(response);
  //   if (response.ok) {
  //     const responseJSON = await response.json();
  //     console.log("responseJSON", responseJSON);
  //     responseJSON.map((item) => { setList((e) => [...e, item.label]); })
  //     setIsActive(true);
  //   } else {
  //     setInputValue('');
  //   }
  // };

  // useEffect(() => {
  //   fetchGetTodos();
  // }, [])




  //  intento codigo 2 
  //     const getList = async () => {
  //     fetch("http://assets.breatheco.de/apis/fake/todos/user/ihor5", {
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


  // intento codigo 3

  //  const url = 'http://assets.breatheco.de/apis/fake/todos/user/ihor5';
  //  const requestOptions = { method: 'GET',redirect: "follow", };
  //  const fetchGet = async () => {
  //    const response = await fetch(url, requestOptions);
  //    const responseJSON = await response.json();
  //    setList(responseJSON);
  //  };

  //  useEffect(() => {
  //   fetchGet();
  // }, []);

  // intento codigo get 4 

  const gettodo = async () => {
    const request = {
      method: 'GET',
      redirect: 'follow'
    };
    const response = await fetch(url, request);
    //confirmar que el response me trajo los datos 
    const responseJSON = await response.json();
    //setTodos(responseJSON);
    console.log(responseJSON)
    //armar nueva lista que muestra la lista de tareas del response jason (map)
    responseJSON.map((item) => { setList((e) => [...e, item.label]) })

  };
  useEffect(() => {
    gettodo();
  }, []);


  const addTask = async (event) => {
    event.preventDefault();
    if (inputValue === "") return;
    setList([...list, inputValue]);
    setInputValue("");
    // Genero un array vacio
    let arraydeObjetos = [];

    for (let index = 0; index < list.length; index++) {
      miObjeto = {};
      miObjeto["label"] = list[index];
      miObjeto["done"] = false;
      arraydeObjetos.push(miObjeto);
    }
    // metodo PUT para guardar el "ARRAY DE OBJETOS" a la lista de la api     
    const request = {
      method: 'PUT',
      redirect: 'follow',
      body: JSON.stringify(arraydeObjetos),
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(url, request);
    if (response.ok) {
      const responseJSON = await responde.json();
    }
  };



  return (
    <div className="container ">
      <h1 className="text-center ">Todos</h1>
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
      <div className="list">
        <ul className="list-group">
          {list.map((listElement, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between hidden-icon">
              {listElement}
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