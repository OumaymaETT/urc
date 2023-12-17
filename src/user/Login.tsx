import React, { useState } from "react";
import { loginUser } from "./loginApi";
import { Session } from "../model/common";
import { CustomError } from "../model/CustomError";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 
type LoggedInUser = {
    id: number; // ou le type approprié pour l'ID de l'utilisateur
    username: string;
  };

  
export function Login() {
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto' };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };
  const [error, setError] = useState({} as CustomError);
  const [session, setSession] = useState({} as Session);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>({ id: 0, username: '' }); 
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    loginUser(
      { user_id: -1, username: data.get('login') as string, password: data.get('password') as string },
      (result: Session) => {
        console.log(result);
        setSession(result);
        form.reset();
        setError(new CustomError(""));
        setLoggedInUser({ id: result.id ?? 0, username: result.username ?? '' }); 
        console.log(result.id);
        console.log(result.username);
        navigate('/users-and-rooms'); 
      },
      (loginError: CustomError) => {
        console.log(loginError);
        setError(loginError);
        setSession({} as Session);
      }
    );
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid >
          <Avatar style={avatarStyle}>
          </Avatar>
          <Typography variant="h2">Connexion</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField label="login" name="login" placeholder="Entrer le nom d\'utilisateur" fullWidth required />
          <TextField label="Password" name="password" placeholder="Entrer le mot de passe" type="password" fullWidth required />
          <FormControlLabel
            control={
              <Checkbox name="checkedB" color="primary" />
            }
            label="Se souvenir de moi"
          />
          <Button type="submit" color="success" variant="contained" style={btnstyle} fullWidth>
            Sign in
          </Button>
        </form>
        <Typography>
          <Link href="#">Mot de passe oublié ?</Link>
        </Typography>
        <Typography>
          Vous n avez pas de compte ?
          <Link href="#">Inscrire</Link>
        </Typography>
      </Paper>
      {session.token &&
        <span>{session.username} : {session.token}</span>
      }
      {error.message &&
        <span>{error.message}</span>
      }
      {loggedInUser &&
        <span>Utilisateur connecté : {loggedInUser.username}</span>
    }
    </Grid>
  );
}
