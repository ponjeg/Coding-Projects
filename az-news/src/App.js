import React, { useState } from 'react';
import './App.css';
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
import avatarImg from './blackavatar.png';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ac28fb52dad246a68773dba5a56f9b2d', { corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });

const useStyles = makeStyles((theme) => ({
  searchBar: {
    [`& fieldset`]: {
      borderRadius: 100,
    },
    width: theme.spacing(80),
  },
  searchButton: {
    borderRadius: 100,
    border: '1px solid black',
    fontWeight: 'bold',
    marginLeft: theme.spacing(2),
  },
  newsCard: {
    maxWidth: 800,
    borderRadius: 20,
    border: '1px solid #f0f0f0',
    boxShadow: 'none',
  },
  cardTitle: {
    spacing: theme.spacing(3),
  },
  avatar: {
    marginRight: theme.spacing(3),
  },
  newsBody: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      results: null,
      searched: false,
      error: null,
      }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(submission) {
    return () => {
      console.log(submission);
      this.setState({searched: false});
      newsapi.v2.everything({
        q: submission,
      })
      .then(response => {
        this.setState({results: response.articles});
        this.setState({searched: true});
        console.log(this.state.results);
      }).catch(error => {
        this.setState({searched: true});
        this.setState({error: error});
      })
    }
  }

  render(){
    const {results, searched, error} = this.state;
    if (error) {
      return <div className="App">API error</div>;
    } else {
      let renderList = "";
      if (searched) {
        if (results.length === 0){
          renderList = "No results."
        } else {
          renderList = results.map(article => (
           <ListItem>
             <Article article={article}/>
           </ListItem>
        ));
        }
    }
      return (
        <div className="App">
          <Grid>
            <Box>
              <SearchBar handleSubmit={this.handleSubmit}/>
            </Box>
            <Box display="flex" fullWidth alignItems="center" justifyContent="center">
              <List>
                {renderList}
              </List>
            </Box>
          </Grid>
        </div>
      );
    }
  }
}


export function SearchBar(props) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
			return(
        <div>
        <Grid container direction="row" justify="center" >
            <Box display="flex" width="auto" alignItems="center" pt={5} borderBottom="2px solid #f0f0f0" pb={2} px={50}>
              <TextField className={classes.searchBar} variant="outlined" pl={3} id="search" placeholder="Search for news..." onChange={(e) => setSearch(e.target.value)}/>
              <Button className={classes.searchButton} variant="outlined" onClick={props.handleSubmit(search)}>search</Button>
            </Box>
          </Grid>
        </div>
			);
}


export function Article(props){
    const classes = useStyles();
    const {title, author, source, publishedAt, description, url} = props.article;
    return (
      <Link href={url} underline="none">
      <Card className={classes.newsCard}>
        <CardContent>
        <Box className={classes.cardTitle} display="flex" fontWeight="fontWeightBold">
        <Avatar className={classes.avatar} alt="black" src={avatarImg}/>
          <Typography gutterBottom variant="h5" component="h5" ml={5}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {publishedAt} {"    -    "} {author} {"    -    "} {source.name}
          </Typography>
          <Typography className={classes.newsBody} variant="body1" component="p">
            {description}
          </Typography>
          </Box>
        </CardContent>
    </Card>
    </Link>
    );
}





export default App;
