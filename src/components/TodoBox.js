import { DeleteRounded, EditRounded } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from "react";

import './todobox.css'

export default class TodoBox extends React.Component {
  render() {
    let { todo, onClick } = this.props

    const handleClick = () => {
      console.log('I am div')
    }

    return(
      <Box sx={{p: 2, border: '1px dashed grey', width: '50%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {/* <Button variant="contained" onClick={() => onClick(todo.id, 'complete')}>Done</Button> */}
        <div className="done" onClick={() => onClick(todo.id, 'complete')}/> 
        {todo.title}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <IconButton color="primary" aria-label="delete task" component="label" onClick={() => onClick(todo.id, 'delete')}>
            <input hidden />
            <DeleteRounded />
          </IconButton>
          <IconButton color="primary" aria-label="edit task" component="label" onClick={() => onClick(todo.id, 'edit')}>
            <input hidden />
            <EditRounded />
          </IconButton>
        </Box>
      </Box>
    )
  }
}