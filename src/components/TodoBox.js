import { DeleteRounded, EditRounded } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import React from "react";

export default class TodoBox extends React.Component {
  render() {
    let { todo, onClick } = this.props

    return(
      <Box sx={{p: 2, border: '1px dashed grey', width: '70%'}}>
      <Button variant="contained" onClick={() => onClick(todo.id, 'complete')}>Done</Button> 
      {todo.title}
      <IconButton color="primary" aria-label="delete task" component="label" onClick={() => onClick(todo.id, 'delete')}>
        <input hidden />
        <DeleteRounded />
      </IconButton>
      <IconButton color="primary" aria-label="edit task" component="label" onClick={() => onClick(todo.id, 'edit')}>
        <input hidden />
        <EditRounded />
      </IconButton>
    </Box>
    )
  }
}