import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect, useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './style.js';
import {Typography} from '@material-ui/core'


const alanKey = '6a56a6f5e810a8ef859adf5ba32e41142e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {

  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle , setActiveArticle]=useState(-1);
  const classes = useStyles();
  useEffect(()=>{
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        }else if(command==='highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
        }
      }

    })
  },[])
  return (
    <div>
      <Typography className={classes.title} variant="h3"><b>News Reader Artificial Intelligence</b></Typography>

      {/* <h3 className={classes.title}>News Reader Artificial IntelligenceI</h3> */}
      <div className={classes.logoContainer}>
        <img  src="https://th.bing.com/th/id/OIP.hpfA41UxWYp7BleWA_AoDAHaDt?pid=ImgDet&rs=1" className={classes.alanLogo} alt="alan logo"/>
      </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
