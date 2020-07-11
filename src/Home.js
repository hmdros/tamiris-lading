import React, { useState, useEffect } from 'react';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Grid,
  GridListTile,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PdfFile from './assets/07_dicas_de_cuidados_Dra_Tamiris.pdf';
import fileDownload  from 'js-file-download';
import { db } from './services/firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f09f97',
    margin: 0,
    padding: 0,
    outline: 0,
    boxSizing: 'border-box',
    minHeight: '98vh',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    marginTop: '10%',
    marginLeft: '10%',
    borderRadius: '15px',
  },
  formWrapper: {
    margin: '25px',
    minWidth: '350px'
  }
}));

function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState('2020-01-01')
  const [category, setCategory] = useState(0)
  const [blockDownload, setBlockDownload] = useState(true)

  const validEmailRegex = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

  const handleSubmit = async (event) => {
    event.preventDefault();
    fileDownload(PdfFile, '07_dicas_de_cuidados_Dra_Tamiris.pdf')
    await db.collection("lead").add({
      name: name,
      email: email,
      birthDate: birthDate,
      category: category
    }).then((docRef) => {
      console.log('Created doc', docRef.id)
      setName('')
      setEmail('')
      setBirthDate('2020-01-01')
      setCategory(0)
      setBlockDownload(true)
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
      if ((name, email, birthDate, category)) {
        if (validEmailRegex.test(email)) {
          setBlockDownload(false);
        }
      }
  }, [name, email, birthDate, category, validEmailRegex])

  const classes = useStyles();

  return (
    <>
      <Grid
        direction="row"
        justify="center"
        alignItems="center"
        container
        className={classes.root}
      >
        <Grid item md={8} xs={12} sm={12} >
          <img
            className={classes.image}
            src="https://res.cloudinary.com/djz3dt7lc/image/upload/v1593971995/background.png"
            alt="Capa do Ebook"
            width="80%"
          />
        </Grid>
        <Grid item md={4} xs={12} sm={12} >
          <Grid
            direction="column"
            justify="center"
            alignItems="center"
            container
          >
            <form onSubmit={handleSubmit}>
              <GridListTile component="div">
                <TextField id="name" value={name} onChange={e => setName(e.target.value)} label="Nome" style={{ marginTop: 10, minWidth: '280px' }} />
              </GridListTile>
              <GridListTile component="div">
                <TextField style={{ marginTop: 10, minWidth: '280px' }} id="email" value={email} onChange={e => setEmail(e.target.value)} label="Email" />
              </GridListTile>
              <GridListTile component="div">
                <TextField
                  id="date"
                  style={{ marginTop: 10, minWidth: '280px' }}
                  label="Data de Nascimento"
                  type="date"
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </GridListTile>
              <GridListTile component="div">
                <InputLabel style={{ marginTop: 10, minWidth: '280px' }} id="label">Como você se classifica?</InputLabel>
              </GridListTile>
              <GridListTile component="div">
                <Select
                  style={{ marginTop: 10, minWidth: '280px' }}
                  displayEmpty
                  onChange={handleSelectChange}
                  value={category}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={0} disabled>Selecione</MenuItem>
                  <MenuItem value={1}>Estou grávida</MenuItem>
                  <MenuItem value={2}>Estou tentando engravidar</MenuItem>
                  <MenuItem value={3}>Meu bebê já nasceu</MenuItem>
                  <MenuItem value={4}>Quero saber mais sobre o assunto</MenuItem>
                </Select>
              </GridListTile>
              <GridListTile component="div" style={{ textAlign: 'center' }}>
                <Button
                  type="submit"
                  style={{ marginTop: 20 }}
                  variant="contained"
                  color="primary"
                  disabled={blockDownload}
                >
                  Baixar o e-Book
              </Button>
              </GridListTile>
            </form>
            <h3>Visite meu <a href="http://dratamirisbaptista.com.br/">site</a></h3>
            <h3>Visite meu <a href="https://www.youtube.com/channel/UCyMJbM8b40vj5fRtDQ4erVg">YouTube</a></h3>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
