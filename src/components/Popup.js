import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import React from "react";

export default class Popup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newLabel: ''
    }
  }

  handleChange = (e) => {

    let { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  render() {

    const { openPopup, selectedTask, onClick } = this.props

    return(
      <Dialog open={openPopup}>
        <DialogTitle>
          Edit Task
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                name="newTitle"
                id="standard-required"
                label="Task Name"
                defaultValue={selectedTask.title}
                variant="standard"
                onChange={this.handleChange}
                />
              <TextField
                id="standard"
                name="newLabel"
                label="Label"
                defaultValue={selectedTask.labels}
                variant="standard"
                onChange={this.handleChange}
              />
            </div>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => onClick(selectedTask.id, 'done', this.state.newTitle, this.state.newLabel)}
            >
              Done
            </Button> 
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => onClick(selectedTask.id, 'cancel', this.state.newTitle, this.state.newLabel)}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    )
  }
}