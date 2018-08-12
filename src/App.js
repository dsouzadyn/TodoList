import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let id = 0;

const Todo = props => (
  <li key={props.todo.id} className={props.todo.isDone ? 'done' : 'pending'}>
    <input type="checkbox" checked={props.todo.isDone} onChange={props.onToggle} />
    {props.todo.isDone ? <strike> {props.todo.text} </strike> : props.todo.text }
    <button onClick={props.onDelete} className={'delete'}>
      <img src="x.svg" alt={'Delete Todo'}/>
    </button>
  </li>
)

class App extends Component {
  
  constructor() {
    super()
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  addTodo() {
    if(this.state.newTodo !== "") {
      this.setState({
        todos: [
          ...this.state.todos,
          { text: this.state.newTodo, id: id++, isDone: false}
        ]
      })
    }
    this.setState({
      newTodo: ""
    })
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }
  
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          return {
            text: todo.text,
            id: todo.id,
            isDone: !todo.isDone
          }
        } else {
          return todo
        }
      })
    })
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    })
  }

  render() {
    return (
      <div className={'container'}>
        <div>
          <h1>Todolist</h1>
        </div>
        <div>
          <input type="text" value={this.state.newTodo} onChange={(e) => this.handleChange(e)} placeholder={'type in something...'}/>
          <button onClick={() => this.addTodo()} className={'full-width'}>+ Add Todo</button>
          </div>
        <ul>
          {this.state.todos.map(todo => 
          <Todo key={todo.id} todo={todo} 
          onDelete={() => this.deleteTodo(todo.id)} 
          onToggle={() => this.toggleTodo(todo.id)} />)}
        </ul>
      </div>
    );
  }
}

export default App;
