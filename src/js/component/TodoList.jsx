import React, { useState, useEffect } from "react";

const Todolist = () => {
    // estados
    const [inputValue, setInputValue] = useState("");
    const [list, setList] = useState([]);
    const url = "http://assets.breatheco.de/apis/fake/todos/user/ihor5";
    const agregarTarea = async (event) => {
        event.preventDefault();
        if (inputValue === "") return;
        console.log(list)
        //Genero el array de objetos
        let arraydeObjetos = [];
        for (let index = 0; index < list.length; index++) {
            let miObjeto = {}
            miObjeto["label"] = list[index];
            miObjeto["done"] = false;
            arraydeObjetos.push(miObjeto);
        };
        arraydeObjetos.push({ "label": inputValue, "done": false })
        console.log(arraydeObjetos)
        // METODO PUT PARA GUARDAR EL "ARRAY DE OBJETOS" EN LA API
        const request = {
            method: 'PUT',
            redirect: 'follow',
            body: JSON.stringify(arraydeObjetos),
            headers: { 'Content-Type': "application/json" },
        };
        const response = await fetch(url, request);
        if (response.ok) {
            const responseJSON = await response.json();
        }
        setList([...list, inputValue]);
        setInputValue("");
    }
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
    return (
        <div className="container col-xs-10 col-md-8 col-lg-6 my-3">
            <h1 className="text-center text-primary">Todos</h1>
            <div className="mb-3">
                <form onSubmit={agregarTarea}>
                    <input className="form-control"
                        placeholder="Write a new task"
                        type="text"
                        value={inputValue}
                        onChange={(event) => { setInputValue(event.target.value); }}
                    />
                </form>
            </div>
            <h2 className="text-primary">Todos List</h2>
            <div className="list">
                <ul className="list-group">
                    {list.map((listElement, index) => {
                        return <li key={index} className="list-group-item d-flex justify-content-between hidden-icon">
                            {listElement}
                        </li>
                    })
                    }
                    <span className="list-group-item bg-light text-end fw-lighter">
                        {list.length === 0 ? "No tasks, add a task" : list.length + " Item Left"}
                    </span>
                </ul>
            </div>
        </div>
    );
};
export default Todolist;