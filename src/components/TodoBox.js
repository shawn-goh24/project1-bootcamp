import { DeleteRounded, EditRounded } from "@mui/icons-material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { style } from "@mui/system";
import React from "react";

import './todobox.css'

export default class TodoBox extends React.Component {
  render() {

    let { todo, onClick, status } = this.props

    let task;

    if (status === 'completed') {
      task = 
        <Box sx={{display: 'flex'}}>
          <div className="completed" onClick={() => onClick(todo.id, 'complete')} style={{marginRight: '15px'}}/>
          <div className="completedText">
            {todo.title}
          </div>
        </Box>
    } else if (status === 'delete') {
      task = 
        <Box sx={{display: 'flex'}}>
          {/* <div className="completed" onClick={() => onClick(todo.id, 'complete')} style={{marginRight: '15px'}}/> */}
          <div>
            {todo.title}
          </div>
        </Box>
    } else {
      task = 
        <Box sx={{display: 'flex'}}>
          <div className="done" onClick={() => onClick(todo.id, 'complete')} style={{marginRight: '15px'}}/>
          <div>
            {todo.title}
          </div>
        </Box>
    }

    // console.log(status)


    return(
      <Box sx={{p: 2, border: '1px dashed grey', width: '75%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
        {/* <Box sx={{display: 'flex'}}> */}
          {/* <div className="done" onClick={() => onClick(todo.id, 'complete')} style={{marginRight: '15px'}}/>  */}
          {/* {complete} */}
          {/* {todo.title} */}
        {/* </Box> */}
        {task}
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
      </Box>
    )
  }
}