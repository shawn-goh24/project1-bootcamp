import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import React from "react";

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default class EditDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newDate: null
    }
  }


  handleChange = (e) => {

    let { name, value } = e.target

      this.setState({
        [name]: value
      })
  }

  handleDateChange = (newValue) => {
    this.setState({
      newDate: newValue
    })
  }

  handleReset = () => {
    this.setState({
      newTitle: '',
      newDate: null
    })
  }

  render() {

    const { openPopup, selectedTask, onClick } = this.props

    let currDate = selectedTask.date
    let currTitle = selectedTask.title

    if (this.state.newTitle !== '') {
      currTitle = this.state.newTitle
    }

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
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
                <DesktopDatePicker
                  label="Date desktop"
                  value={this.state.newDate === null ? currDate : this.state.newDate}
                  onChange={this.handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  showDaysOutsideCurrentMonth
                />
              </LocalizationProvider>
            </div>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => {
                onClick(selectedTask.id, 'done', currTitle, this.state.newDate)
                this.handleReset()
              }}
              sx={{mr: '10px'}}
            >
              Done
            </Button> 
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => {
                onClick(selectedTask.id, 'cancel', currTitle, this.state.newDate)
                this.handleReset()
              }}
            >
              Cancel
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    )
  }
}