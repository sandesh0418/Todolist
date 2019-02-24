import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../index.css';
const Todo = props =>(
    <tr>
        <td className={props.todo.todo_completed === '1' ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed === '1' ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed === '1' ? 'completed' : ''}> {props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo.id}>Edit</Link>
        </td>

    </tr>
)
class TodosList extends Component{

    constructor(props){
        super(props);
        this.state ={todos: []};
    }

    componentDidMount(){
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({todos: response.data});
             })
             .catch(function(err){
                 console.log(err);
             })
    }

    componentDidUpdate(){
        axios.get('http://localhost:4000/')
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(function(err){
            console.log(err);
        })
    }

    todoList(){
        return this.state.todos.map(function(currentTodo, index){
            return <Todo todo={currentTodo} key={index} />
        })
    }
    render(){

        return (
            <div>
                <h3>Todo List</h3>
                <table className ="table table-striped" style={{marginTop:20}}>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Actions</th>
                        </tr>


                </thead>
                <tbody>
                    {this.todoList()}
                </tbody>
                
                
                </table>
                </div>
            );
    }
}


export default TodosList;