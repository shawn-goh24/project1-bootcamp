import React from "react";
// import TodoList from './TodoList';
import data from '../todos.json';
import Popup from "./Popup";
import TodoBox from './TodoBox';
// import { Modal, Box } from "@mui/material";


export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      wordInput: '',
      openPopup: false, 
      selectedTask: [],
      selectedList: 'Inbox'
    }
  }

  componentDidMount() {
    this.setState({
      list: data
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newTodos = {
      id: this.state.list[this.state.list.length - 1].id + 1,
      title: this.state.wordInput,
      completed: false,
      deleted: false
    };
    this.setState({
      list: [...this.state.list, newTodos],
      wordInput: ''
    })
  }
  
  handleChange = (e) => {
    let { value } = e.target
    
    this.setState({
      wordInput: value
    })
  }

  onTodoItemClicked = (id, selected, newTitle, newLabel) => {
    if (selected === 'delete') {
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id);
      todo.deleted = true
      this.setState({
        list: newTodos
      })
    } else if (selected === 'complete') {
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id);
      todo.completed = true
      this.setState({
        list: newTodos
      })
    } else if (selected === 'edit') {
      console.log("Edit task")
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id)
      this.setState({
        openPopup: true,
        selectedTask: todo
      })
    } else if (selected === 'done') {
      console.log("Done editting")
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id)
      todo.title = newTitle
      todo.labels = newLabel
      this.setState({
        openPopup: false,
        list: newTodos
      })
    } else if (selected === 'cancel') {
      console.log("Cancel dialog")
      this.setState({
        openPopup: false,
      })
    } 
    // else if (selected === 'edit') {
    //   console.log("Edit task")
    //   const newTodos = [...this.state.list]
    //   const todo = newTodos.find((todo) => todo.id === id)
    //   this.setState({
    //     openPopup: !this.state.openPopup,
    //     selectedTask: todo
    //   })
    // }
  }
  

  completedList = () => {
    const list = this.state.list.filter((todo) => {
      if (todo.completed) {
        return true
      }
      return false
    })

    const completed = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
      )
    })

    return completed
  }
  
  trashList = () => {
    const list = this.state.list.filter((todo) => {
      if (todo.deleted) {
        return true
      }
      return false
    })

    const trash = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
      )
    })

    return trash
  }

  inboxList = () => {
    const list = this.state.list.filter((todo) => {
      if (todo.completed === false && todo.deleted === false) {
        return true
      }
      return false
    })

    const inbox = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
      )
    })

    return inbox
  }

  

  render() {
    
    let { selectedDrawer } = this.props

    // const filteredList = this.state.list.filter((todo) => {
    //   if (todo.completed === false && todo.deleted === false) {
    //     return true
    //   }
    //   return false
    // })

    // const todoList = filteredList.map((todo) => {
    //   return(
    //     <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
    //   )
    // })

    const showSelectedList = () => {
      if (selectedDrawer === 'Inbox') {
        return this.inboxList()
      } else if (selectedDrawer === 'Completed') {
        return this.completedList()
      } else if (selectedDrawer === 'Trash') {
        return this.trashList()
      }
    }

    return(
      <div>
        {console.log(this.state.list)}
        {showSelectedList()}
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='wordInput' value={this.state.wordInput} onChange={this.handleChange}/>
          <input type='submit' value='Submit'/>
        </form>
        <Popup openPopup={this.state.openPopup} selectedTask={this.state.selectedTask} onClick={this.onTodoItemClicked} />
      </div>
    )
  }
}