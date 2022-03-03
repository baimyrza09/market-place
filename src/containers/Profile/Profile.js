
import React, { useState, useEffect } from 'react';
import { Avatar, TextField, Button } from '@material-ui/core'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import './style.css'
import { PROFILE_API } from "../../helpers/constants";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    margin: 'auto',
  },
  inp: {
    margin: '15px',
    color: '#000'
  }
}));



const Profile = () => {

  const classes = useStyles();
  const [state, setState] = useState({})
  const [isEdit, setEdit] = useState(false)

  async function showProfile() {
    const {data} = await axios(`${PROFILE_API}`);
    setState(data)
  }

  useEffect(() => {
    showProfile()
  }, [])

  function handle(e) {
    let obj = {
      ...state,
      [e.target.name]: e.target.value
    }
    setState(obj)
  }

  async function saveDb() {
    await axios.put(`${PROFILE_API}`, state)
    setEdit(false)
  }

  return (
    <div className="copy-body">
      <div className="main">
        <div className="row">

          {!isEdit ?
            <>
              <div >
                <div className="ava" >
                  <Avatar alt="Remy Sharp" src={state.avatar} className={classes.large} />
                </div>
                <div className="info">
                  <span> <TextField name='name'  disabled id="standard-disabled" value={state.name} variant="outlined" /></span>
                  <span><TextField name='lastname' disabled id="standard-disabled" value={state.lastName} variant="outlined" /></span>
                  <span><TextField name='address' disabled id="standard-disabled" value={state.address} variant="outlined" /></span>
                  <span> <TextField name='email'  disabled id="standard-disabled" value={state.email} variant="outlined" /></span>
                  <span><TextField name='password'  disabled id="standard-disabled" value={state.password} variant="outlined" /></span>
                  <ul>
                      {state?.cart?.map((item)=>(
                          <li>1</li>
                      ))}
                  </ul>
                </div>
              </div>
            </> :
            <>
              <div container spacing={3}>
                <div className="ava" >
                  <Avatar alt="Remy Sharp" src={state.avatar} className={classes.large} />
                </div>
                <div className="info">
                  <TextField onChange={handle}  name='name' id="outlined-basic" value={state.name} className={classes.inp} variant="outlined" />
                  <TextField onChange={handle}  name='lastName' id="outlined-basic" value={state.lastName} className={classes.inp} variant="outlined" />
                  <TextField onChange={handle}  name='address' id="outlined-basic" value={state.address} className={classes.inp} variant="outlined" />
                  <TextField onChange={handle} name='email' id="outlined-basic" value={state.email} className={classes.inp} variant="outlined" />
                  <TextField onChange={handle}  name='password' id="outlined-basic" value={state.password} className={classes.inp} variant="outlined" />
                </div>
              </div>
            </>}
          {isEdit ?
            <Button variant="contained" color="primary" onClick={saveDb}>SAVE</Button> :
            <Button variant="contained" color="primary" onClick={() => setEdit(true)}>EDIT</Button>}
        </div>
      </div >
    </div >
  );
};

export default Profile;