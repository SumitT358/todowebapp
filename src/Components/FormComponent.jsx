import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DoneOutlineOutlined } from "@mui/icons-material";
import { DeleteForever } from "@mui/icons-material";
import { AddTask } from "@mui/icons-material";

export const FormComponent = () => {
  const [inputData, setInputData] = useState("");
  const [inputError, setInputError] = useState("");
  const [remainingTaskList, setRemainingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([
    // {
    //   id: Math.random(),
    //   title: "day of the task",
    //   currentTime: "12:30",
    // },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData !== "") {
      const tasklist = {
        id: Math.random(),
        title: inputData,
      };
      const list = [...remainingTaskList];
      list.push(tasklist);
      //updating the task list
      setRemainingTaskList(list);
      setInputData("");
    }
  };
  const handleOnChange = ({ target }) => {
    target.value.length <= 5
      ? setInputError("Task Must atleat 5 Char")
      : setInputError("");
    setInputData(target.value);
  };
  const handleCheck = (id) => {
    const initial = [...remainingTaskList];
    const initialCompleteTask = [...completedTaskList];
    const currentTime = getCurrentTime(new Date());

    const Index = initial.findIndex((item) => item.id === id);
    //current time
    remainingTaskList[Index].currentTime = currentTime;
    initialCompleteTask.push(remainingTaskList[Index]);

    //deleting item from remaining task
    const updatedRemainingTask = initial.filter((item) => item.id !== id);

    //update the complete task state
    setRemainingTaskList(updatedRemainingTask);
    setCompletedTaskList(initialCompleteTask);
  };
  const handleDelete = (id) => {
    const initial = [...remainingTaskList];
    const updated = initial.filter((item) => item.id !== id);
    setRemainingTaskList(updated);
  };

  const getCurrentTime = (date) => {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hour >= 12 ? "pm" : "am";
    //formatting date
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour "0" should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let currentTime = hour + ":" + minutes + ampm;
    return currentTime;
  };

  return (
    <Box className="container">
      <Grid container>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <form className="formContainer">
              <Typography variant="h5" color="primary" className="heading">
                TODO Web App
              </Typography>
              <Grid container justifyContent="center">
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    label="Enter A Task"
                    fullWidth
                    value={inputData}
                    onChange={handleOnChange}
                    error={inputError ? true : false}
                    helperText={inputError}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton style={{ color: "blue" }} onClick={handleSubmit}>
                    <AddTask fontSize="large" />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        {/* task grid container */}
        <Grid item xs={12}>
          <Grid container className="secondColoum">
            <Grid item xs={12} sm={6} lg={6} style={{ padding: "10px" }}>
              <List className="listContainer" dense={true}>
                <Typography className="listContainerTitle" variant="h5">
                  Remaining Task
                </Typography>
                {/* //Mapping remaining list task */}
                {remainingTaskList.length > 0 ? (
                  remainingTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className="remainTaskAvatar">
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} />
                      <ListItemSecondaryAction>
                        <IconButton
                          style={{ color: "green" }}
                          onClick={() => handleCheck(item.id)}
                        >
                          <DoneOutlineOutlined />
                        </IconButton>
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => handleDelete(item.id)}
                        >
                          <DeleteForever />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography className="emptymsg">
                    No Task Added Yet.....
                  </Typography>
                )}
              </List>
            </Grid>
            {/* Completed task */}
            <Grid item xs={12} sm={6} lg={6} style={{ padding: "10px" }}>
              <List className="listContainer" dense={true}>
                <Typography className="listContainerTitle" variant="h5">
                  Completed Task
                </Typography>
                {/* //Mapping complete list task */}
                {completedTaskList.length > 0 ? (
                  completedTaskList.map((item, i) => (
                    <ListItem key={i}>
                      <ListItemAvatar>
                        <Avatar className="completeTaskAvatar">
                          {item.title[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        secondary={item.currentTime}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography className="emptymsg">
                    No Task Added Yet.....
                  </Typography>
                )}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
