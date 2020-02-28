import "date-fns";
import React,{useEffect} from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./saleTest.css";
import SaveIcon from "@material-ui/icons/Save";
import ModalBox from "./ModalBox";

const axios = require('axios');

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));
export default function SaleTest() {
  const classes = useStyles();
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [open, setOpen] = React.useState(false);
  const [event, setEvent] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
    setEvent("");
    window.location.reload();
  };


  const handleSubmit = () => {
    const FormData = event;
    console.log("date ==>",FormData);
    const user = {};
    for (let entry of FormData.elements) {
      user[entry.name] = entry.value;
    }
    axios
      .post("http://localhost:3001/save", user)
      .then(res => {res.data.success === true? alert("data save successfully"):alert("Error while saving data")})
      .catch(err => console.log(err.data));
  };

  /* const handleSubmit = event => {
    const FormData = event.target;
    const user = {};
    event.preventDefault();
    for (let entry of FormData.elements) {
      user[entry.name] = entry.value;
    }
    axios
      .post("http://localhost:3001/save", user)
      .then(res => console.log("Data send"))
      .catch(err => console.log(err.data));
  }; */

  const saveData = () =>{
    handleClose();
    handleSubmit(event);
  }
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const beforeSubmit=(e)=>{
    setOpen(true);
    setEvent(e.target);
    e.preventDefault();
  }


  return (
    <React.Fragment>
      
    <form className="form" onSubmit={(e)=>{beforeSubmit(e) }}>
    <h2>Sales Test</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
       
          <label style={{ position: "relative", left: "6px", top: "6px" }}>
            1. Today's Date
          </label>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            name="todayDate"
          />
        
      </MuiPickersUtilsProvider>
      <div className="div">
        <label className="label">2.Client Name</label>
        <br />
        <input className="inputField" name="clientName" placeholder="Blair Stopnik" required/>
      </div>
      <div className="div">
        <label className="label">3.Profile Name</label>
        <br />
        <input className="inputField" name="profileName" placeholder="Ali" required/>
      </div>
      <div className="div">
        <label className="label">4.Company Name</label>
        <br />
        <input className="inputField" name="companyName" placeholder="sbExperiential,LIC" required/>
      </div>
      <div className="div">
        <label className="label">5.Job Title / Nature of Job</label>
        <br />
        <input className="inputField"  name="jobTitle" placeholder="Front End Developer" required/>
      </div>
      <div className="div">
        <label className="label">
          6.Type of Test(Technology recommended / online or small project etc)
        </label>
        <br />
        <input className="inputField" name="testType"  placeholder="Project(3 to 4 hours)" required/>
      </div>
      <div className="div">
        <label className="label">
          7.Did we have a call with client if yes then how many
        </label>
        <br />
        <input className="inputField" name="callConfirmation"  placeholder="Yes 1" required/>
      </div>
      <div className="div">
        <label className="label">
          8.Gmail thread where Client assigned the test or provide details for
          the test
        </label>
        <br />
        <input
          className="inputField"
          placeholder="https:/mail.google.com/mail/u/1/?zx=3iwil2ghaumy#inbox/FMfcgxwGDWlvRHhvxxBMKqvfslLnwXRhN"
          name="gmailThread" 
          required/>
      </div>
      <div className="div">
        <label className="label">
          9.Agenda Link (if we did a call with client)
        </label>
        <br />
        <input
          className="inputField"
          placeholder="https:/mail.google.com/mail/u/1/?zx=3iwil2ghaumy#inbox/FMfcgxwGDWlvRHhvxxBMKqvfslLnwXRhN"
          name="agendaLink"
          required/>
      </div>
      <div className="div">
        <label className="label">
          10.Did client inform date of submission? if yes then please mention
        </label>
        <br />
        <input className="inputField" placeholder="21/02/2020"  name="dateSubmission" required/>
      </div>
      <div className="div">
        <label className="label">
          11.Notes (if anything else you want to mention)
        </label>
        <br />
        <input
          className="inputField"
          placeholder="this test is part of clients orignal project, so he want us to out 3 to 4 hours at max"
          name="Notes" 
          required/>
      </div>
      <div className="div">
        <label className="label">12. Approved by CTO and Manager</label>
        <br />
        <span className="span">For the PM Department</span>
        <br />
        <input className="inputField" placeholder=""  name="AprrovedBy"  required/>
      </div>
      <div className="div">
        <label className="label">
          13. Engineer Assigned by Project Manager{" "}
        </label>
        <br />
         <span className="span">For the PM Department</span>
        <br />
        <input className="inputField" placeholder=""  name="engineerAssign" required/>
      </div>
      <div className="div">
        <label className="label">14.Time of submission </label>
        <br />
         <span className="span">For the PM Department</span>
        <br />
        <input className="inputField" placeholder=""  name="submissionTime" required/>
      </div>
      <div className="div">
        <label className="label">15.Test success Report</label>
        <br />
         <span className="span">For the PM Department</span>
        <br />
        <input className="inputField" placeholder=""  name="testSuccessReport" required/>
      </div>
      <input type="checkbox" required />I agreed to term and condition
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        type="submit"
        startIcon={<SaveIcon />}
      >
        Save
      </Button>
      <ModalBox open={open} handleOpen={handleOpen} saveData={saveData} handleClose={handleClose} />
    </form>
    </React.Fragment>
  );
}
