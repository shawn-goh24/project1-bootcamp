import { DeleteRounded, EditRounded } from "@mui/icons-material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from "react";

import './todobox.css'

export default class TodoBox extends React.Component {
  render() {

    let { todo, onClick, status, sidebar } = this.props

    let task
    let textColor
    const now = new Date().toLocaleDateString()
    const taskDate = new Date(todo.date)

    if (todo.date === now) {
      textColor = 'green'
    } else {
      if (taskDate < (new Date())) {
        textColor = 'red'
      } else {
        textColor = 'grey'
      }
    }

    if (status === 'completed') {
      task = 
        <Box sx={{display: 'flex'}}>
          <div className="completed" onClick={() => onClick(todo.id, 'complete')} style={{marginRight: '15px'}}/>
          <div className="completedText">
            <p style={{margin: 0, textAlign: 'left'}}>{todo.title}</p>
            <p className="due" style={{margin: 0, textAlign: 'left', fontSize: '13px'}}><span>Due: </span>{todo.date}</p>
          </div>
        </Box>
    } else if (status === 'delete') {
      task = 
        <Box sx={{display: 'flex'}}>
          <div>
            <p style={{margin: 0, textAlign: 'left'}}>{todo.title}</p>
            <p className="due" style={{margin: 0, textAlign: 'left', fontSize: '13px'}}><span>Due: </span>{todo.date}</p>
          </div>
        </Box>
    } else {
      task = 
        <Box sx={{display: 'flex'}}>
          <div className="done" onClick={() => onClick(todo.id, 'complete')} style={{marginRight: '15px'}}/>
          <div>
            <p style={{margin: 0, textAlign: 'left'}}>{todo.title}</p>
            <p className="due" style={{margin: 0, textAlign: 'left', color: textColor}}><span>Due: </span>{todo.date}</p>
          </div>
        </Box>
    }


    return(
      <Box sx={{width: '75%', mb: 2, backgroundColor: '#EEEEEE', borderRadius: '20px', boxShadow: '1px 1px #888888'}}>
        <Box sx={{p: 2, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
          {task}
          {sidebar === 'Completed' || sidebar === 'Trash' ? '' : 
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <IconButton color="primary" aria-label="delete task" component="label" onClick={() => onClick(todo.id, 'delete')}>
                <input hidden />
                <DeleteRounded />
              </IconButton>
              <IconButton color="primary" aria-label="edit task" onClick={() => onClick(todo.id, 'edit')}>
                <input hidden />
                <EditRounded />
              </IconButton>
            </Box>
          }
        </Box>
      </Box>
    )
  }
}