import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import { Table, Checkbox } from 'semantic-ui-react'
import { ListItem } from './ListItem.js'


/*
const todos = [
  { title: 'Pet Kitties', completed: false},
  { title: 'Count FidSdies', completed: false},
  { title: 'Eat Corn', completed: false}
]
*/
const url_todos = '/todos/'
const headers = {'content-type': 'application/json'}

class TodoApp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      newItem: ''
    }
  }
  //Lifecycle method Runs when this component mounts the DOM
  componentDidMount(){
    this.fetchTodos()
  }

  fetchTodos = () => {
    fetch(url_todos)
      .then((response) => response.json()) //Convert data/response to JSON format
      .then((data) =>this.setState({todos: data}))
      .catch((err) => console.error({err}))
  }

  toggleAllHandler(allS){
    const list  = this.state.todos
    list.forEach((item, index) => {
      item.completed = !allS
    })
    this.setState({todos: list})
  }

  checboxClickHandler(item, index){

    let copy = this.state.todos     //copy the todo item list from app.state.todos
    copy[index].completed = !item.completed     //invert completed
    this.setState( {todos: copy })             //inject copy back into state

    /*
    const {id, completed} = item
    fetch(url_todos + id, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({completed: !completed})
    }).then(this.fetchTodos)
    */
  }

  deleteHandler = (id) => {
    console.log(url_todos + id);
    fetch(url_todos + id, {
      method: 'DELETE',
      headers,
    }).then(this.fetchTodos)
  }

  clearHandler = () => {
    let copy = this.state.todos
    let filteredCopy = copy.filter(target => target.completed)

    //Promise.all allows us to return an array of promises fro fetch requests
    Promise.all(
      filteredCopy.map(item =>
        fetch(url_todos + item.id, {
          method: 'DELETE',
          headers
        }).then(this.fetchTodos)
      )
    )
  }

  // event is auto passed to function on event
  inputChangeHandler = (event) => {
    this.setState( {newItem: event.target.value} )
  }

  keyHandler = (event) => {
    //If more than 1- todos, do nothing
    if(this.state.todos.length >= 10){
      return
    }
    if(event.keyCode !== 13){
      //keyCode 13 is enter key
      return
    }
    event.preventDefault()
    const {newItem} = this.state
    const val = newItem.trim() //Rids of white space at beginning and end
    const newEntry = {
      "title": val,
      "completed": false
    }
    if (val) {
      fetch(url_todos, {
        method: 'POST',
        headers, //Using our header variable
        body: JSON.stringify(newEntry)
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data)
          let copy = this.state.todos
          copy.push(newEntry)
          this.setState({todos: copy, newItem: '' })

        })
    }
  }

  render(){
    const { todos } = this.state
    const allS = todos.every((item) => item.completed)
    return (
      <div className='TodoApp'>

        {todos.length === 0 ? (<div>Nothing to see here.</div> ) :
        <div>
          <Table>
            <Table.Header >
              <Table.Row>
                <Table.Cell>
                  <Checkbox
                    id='select-all'
                    checked= {allS}
                    onChange= {() => this.toggleAllHandler(allS)}
                  />
                </Table.Cell>
                <Table.Cell>
                <label htmlFor="select-all">Select All</label>
                </Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {renderTodoList(this)}
            </Table.Body>
          </Table>
          <button
            className="ui button"
            onClick={() => this.clearHandler()}
          >Clear Completed
          </button>
        </div>
        }
        <div className="mid-col">
          <input
            id='new-item'
            className='new-item'
            placeholder='New item name'
            autoFocus
            value= {this.state.newItem}
            onChange= {this.inputChangeHandler /*event is auto passed into funciton}*/ }
            onKeyDown= {this.keyHandler}
          />
          <label
            htmlFor="new-item"
            style={{display: 'none'}}
          >
          New Item
          </label>
        </div>
      </div>
    )

  }
}

function renderTodoList(app){
  //Get todo list from app state
  return(
    app.state.todos.map((item, i) => (
      //Uses defined ListItem const, {item} > prop.children arg
      <ListItem
        key={i}
        item={item}
        handleToggle={() => app.checboxClickHandler(item, i)}
        handleDelete= {() => app.deleteHandler(item.id)}
      />
    ))
  )
}

export default TodoApp;
