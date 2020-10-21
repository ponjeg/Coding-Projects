import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';


const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();
const limit = 5;
const upperLimit = 643;

const useStyles = makeStyles((theme) => ({

  navButton: {
    borderRadius: 100,
    fontWeight: 'bold',
    backgroundColor: '#ffcc00',
    width: theme.spacing(12),
  },
  pokemonCard: {
    minWidth: 800,
    borderRadius: 10,
    border: '1px solid #f0f0f0',
    boxShadow: 'none',
    spacing: theme.spacing(3),
  },
  navCard: {
    paddingBottom: theme.spacing(2),
    minWidth: 800,
    border: 'none',
    boxShadow: 'none',
  },
  dialog: {
    midWidth: 1000,
  },
  avatar: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  id: {
    marginLeft: theme.spacing(45),
  },
}));



export function App(){
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemonData, setSelectedPokemonData] = useState({});
  const classes = useStyles();

  useEffect(() => {
    getPokemon(offset, limit);
  }, [offset])

  const prev = (offset) => {
    if (offset >= limit) {
      setOffset(offset => offset - limit);
    }
  }

  const next = (offset) => {
    if (offset <= upperLimit) {
      setOffset(offset => offset + limit);
    }
  }

  const getPokemon = (offset, limit) => {
    const interval = {
      limit: limit,
      offset: offset,
    }
    P.getPokemonsList(interval)
      .then(function(response) {
        if (response.results){
          setPokemon(response.results)
        }
      });
    }

  const getPokemonInfo = (pokemonName) => {
    P.getPokemonByName(pokemonName)
    .then(function(response) {
      if (response) {
        setSelectedPokemonData(response);
      }
    });
  }


  const pokemonDialog = () => {
    const { name, id, stats=[], types=[], weight, sprites=[]} = selectedPokemonData;

    const renderStats = stats.map(stat => (
        <ListItem>
          <Typography gutterBottom variant="h5" component="h5">
            {stat.stat.name} {" : "} {stat.base_stat}
          </Typography>
        </ListItem>
      ));

      const renderTypes = types.map(type => (
          <ListItem>
            <Typography gutterBottom variant="h5" component="h5">
              {type.type.name}
            </Typography>
          </ListItem>
        ));

    return (
      <div>
        <Dialog className={classes.dialog} fullWidth="true" open={Object.keys(selectedPokemonData).length > 0} onClose={(e) => setSelectedPokemonData({})} onBackdropClick={(e) => setSelectedPokemonData({})}>
          <Grid container direction="column" justify="center">
            <Box display="flex" flexDirection="row" my="auto" py={3}>
              <Avatar className={classes.avatar} src={sprites.front_default} />
              <Typography variant="h5" component="h5">
                {name}
              </Typography>
              <Typography className={classes.id} variant="h5" component="h5" color="textSecondary" align='right'>
                {id}
              </Typography>
            </Box>
          </Grid>
          <Card>
            <CardContent>
              <List>
                {renderStats}
                {renderTypes}
                <ListItem>
                  <Typography gutterBottom variant="h5" component="h5">
                    {"weight : "}{weight}
                  </Typography>
                </ListItem>
              </List>
              <Box display="flex" flexDirection="row-reverse">
                <Button className={classes.navButton} onClick={(e) => setSelectedPokemonData({})}>close</Button>
              </Box>
            </CardContent>
          </Card>
        </Dialog>
      </div>
    );
  }

  const pokemonEntry = (pokemonName, pokemonId) => {

    return (
      <div>
        <Card className={classes.pokemonCard}>
          <CardContent>
            <Grid container direction="row" justify="center" >
              <Box display="flex" flexDirection="row" fontWeight="fontWeightBold" my="auto" mr="auto">
                <Button onClick={(e) => getPokemonInfo(pokemonName)} >
                  <Typography variant="h5" component="h5">
                    {pokemonName}
                  </Typography>
                </Button>
              </Box>
              <Box display="flex" my="auto" ml="auto" flexDirection="row-reverse">
                <Typography variant="h5" component="h5" color="textSecondary">
                  {pokemonId}
                </Typography>
              </Box>
            </Grid>
          </CardContent>
        </Card>
        {pokemonDialog()}
      </div>
    );
  }

  return (
    <div className="App">
      <Grid container justify="center">
        <Box>
          <Box display="flex" fullWidth alignItems="center" justifyContent="center">
            <List>
              {pokemon.map((pokemon, id) => (
                <ListItem>
                  {pokemonEntry(pokemon.name, offset + id + 1)}
                </ListItem>
              ))}
            </List>
          </Box>
          <Card className={classes.navCard}>
            <Grid container direction="row" justify="center" >
              <Box display="flex" flexDirection="row" my="auto" mr="auto">
                <Button className={classes.navButton} variant="contained" onClick={(e) => prev(offset)}>prev</Button>
              </Box>
              <Box display="flex" flexDirection="row-reverse" my="auto" ml="auto">
                <Button className={classes.navButton} variant="contained" onClick={(e) => next(offset)}>next</Button>
              </Box>
            </Grid>
          </Card>
        </Box>
      </Grid>

    </div>
  );
}

export default App;
