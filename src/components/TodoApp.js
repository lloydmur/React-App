import React from 'react';
//import logo from './logo.svg';
import '../App.css';
import { Table, Checkbox } from 'semantic-ui-react'
import { ListItem } from './ListItem.js'

const todos = [
  { title: 'Pet Kitties', completed: false},
  { title: 'Count Fiddies', completed: false},
  { title: 'Eat Corn', completed: false}
]


class TodoApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todos: todos,
      newItem: '',
      allSelected: false
    }
  }
  checboxClickHandler(item, index){
    let copy = this.state.todos     //copy the todo item list from app.state.todos
    copy[index].completed = !item.completed     //invert completed
    this.setState( {todos: copy })             //inject copy back into state
  }

  masterCheckboxHandler(){
    let copy = this.state.todos
    let allS = this.state.allSelected
    allS = !allS
    copy.forEach((item) => {
      item.completed = allS
    })
    this.setState({todos: copy, allSelected: allS})
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
    const {todos, newItem} = this.state
    const val = newItem.trim() //Rids of white space at beginning and end
    if(val){
      let copy = todos
      let newEntry = {
        title: val,
        completed: false
      }
      copy.push(newEntry)
      this.setState({todos: copy, newItem: ''})
    }
  }

  deleteHandler = (i) => {
    let copy = this.state.todos
    //Filters out the element in index matching item of interest
    const filteredCopy = copy.filter(
      (target, index) => index !== i
    )
    this.setState({todos: filteredCopy})
  }

  render(){
    const {todos} = this.state
    return (
      <div className='TodoApp'>

        {todos.length === 0 ? (<div>Nothing to see here.</div> ) :
        <Table>
          <Table.Header >
            <Table.Row>
              <Table.Cell>
                <Checkbox
                  id='select-all'
                  checked= {this.state.allSelected}
                  onChange= {() => this.masterCheckboxHandler()}
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
        </Table>}
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
  const list = app.state.todos
  return(
    list.map((item, i) => (
      //Uses defined ListItem const, {item} > prop.children arg
      <ListItem
        key={i}
        item={item}
        handleToggle={() => app.checboxClickHandler(item, i)}
        hendleDelete={() => app.deleteHandler(i)}
      />

    ))
  )
}

export default TodoApp;
