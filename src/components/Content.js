import React from "react";
import data from '../todos.json';
import EditDialog from "./EditDialog";
import TodoBox from './TodoBox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: data,
      wordInput: '',
      openPopup: false, 
      selectedTask: [],
      selectedList: 'Inbox',
      openDeleteDialog: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.wordInput !== '') {
      const newTodos = {
        id: this.state.list[this.state.list.length - 1].id + 1,
        title: this.state.wordInput,
        completed: false,
        deleted: false,
        date: new Date().toLocaleDateString()
      };
      this.setState({
        list: [...this.state.list, newTodos],
        wordInput: ''
      })
    }
  }
  
  handleChange = (e) => {
    let { value } = e.target
    
    this.setState({
      wordInput: value
    })
  }

  onTodoItemClicked = (id, selected, newTitle, newDate) => {
    if (selected === 'delete') {
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id);
      todo.deleted = !todo.deleted
      this.setState({
        list: newTodos
      })
    } else if (selected === 'complete') {
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id);
      todo.completed = !todo.completed
      this.setState({
        list: newTodos
      })
    } else if (selected === 'done') {
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id)
      todo.title = newTitle
      if (newDate !== null) {
        todo.date = newDate['$d'].toLocaleDateString()
      }
      this.setState({
        openPopup: false,
        list: newTodos
      })
    } else if (selected === 'cancel') {
      this.setState({
        openPopup: false,
      })
    } 
    else if (selected === 'edit') {
      const newTodos = [...this.state.list]
      const todo = newTodos.find((todo) => todo.id === id)
      this.setState({
        openPopup: !this.state.openPopup,
        selectedTask: todo
      })
    }
  }
  

  completedList = (searchValue) => {
    const list = this.state.list.filter((todo) => {
      if (todo.completed) {
        return true
      }
      return false
    })

    if (searchValue) {
      const list2 = list.filter((todo) => {
        return todo.title?.toLowerCase().includes(searchValue?.toLowerCase())
      })

      const search = list2.map((todo) => {
        return(
          <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked} status='completed'/>
        )
      })
      return search
    }

    const completed = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked} status='completed'/>
      )
    })

    return completed
  }
  
  trashList = (searchValue) => {
    const list = this.state.list.filter((todo) => {
      if (todo.deleted) {
        return true
      }
      return false
    })

    if (searchValue) {
      const list2 = list.filter((todo) => {
        return todo.title?.toLowerCase().includes(searchValue?.toLowerCase())
      })

      const search = list2.map((todo) => {
        return(
          <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked} status='delete'/>
        )
      })
      return search
    }

    const trash = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked} status='delete'/>
      )
    })

    return trash
  }

  inboxList = (searchValue) => {
    const list = this.state.list.filter((todo) => {
      if (todo.completed === false && todo.deleted === false) {
        return true
      }
      return false
    })

    if (searchValue) {
      const list2 = list.filter((todo) => {
        return todo.title?.toLowerCase().includes(searchValue?.toLowerCase())
      })

      const search = list2.map((todo) => {
        return(
          <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
        )
      })
      return search
    }

    const inbox = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
      )
    })

    return inbox
  }

  todayList = (searchValue) => {

    const currDate = new Date().toLocaleDateString()
    
    const list = this.state.list.filter((todo) => {
      if (todo.date === currDate && todo.completed === false && todo.deleted === false) {
        return true
      }
      return false
    })

    if (searchValue) {
      const list2 = list.filter((todo) => {
        return todo.title?.toLowerCase().includes(searchValue?.toLowerCase())
      })

      const search = list2.map((todo) => {
        return(
          <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
        )
      })
      return search
    }

    const today = list.map((todo) => {
      return(
        <TodoBox key={todo.id} todo={todo} onClick={this.onTodoItemClicked}/>
      )
    })

    return today
  }


  render() {
    
    let { selectedDrawer, searchValue } = this.props

    const showSelectedList = (searchValue) => {
      if (selectedDrawer === 'Inbox') {
        return this.inboxList(searchValue)
      } else if (selectedDrawer === 'Completed') {
        return this.completedList(searchValue)
      } else if (selectedDrawer === 'Trash') {
        return this.trashList(searchValue)
      } else if (selectedDrawer === 'Today') {
        return this.todayList(searchValue)
      } 
    }

    return(
      <div>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
          {showSelectedList(searchValue)}
        </Box>
        {
          selectedDrawer === 'Completed' || selectedDrawer === 'Trash' ? '' : 
          <form onSubmit={this.handleSubmit}>
            <TextField
              required
              id="outlined-required"
              label="Task"
              value={this.state.wordInput}
              onChange={this.handleChange}
              sx={{marginRight: '10px', width: '65%'}}
              onKeyPress={this.onTodoItemClicked}
            />
            <Button variant="contained" onClick={this.handleSubmit} sx={{height: '55px'}}>Submit</Button>
          </form>
        }
        <EditDialog openPopup={this.state.openPopup} selectedTask={this.state.selectedTask} onClick={this.onTodoItemClicked} />
      </div>
    )
  }
}