// import './App.css';
// import alanBtn from '@alan-ai/alan-sdk-web';
// import { useEffect, useState } from 'react';
// import NewsCards from './components/NewsCards/NewsCards';
// import useStyles from './style.js';
// import {Typography} from '@material-ui/core'


// const alanKey = '6a56a6f5e810a8ef859adf5ba32e41142e956eca572e1d8b807a3e2338fdd0dc/stage';

// function App() {

//   const [newsArticles, setNewsArticles] = useState([])
//   const [activeArticle , setActiveArticle]=useState(-1);
//   const classes = useStyles();
//   useEffect(()=>{
//     alanBtn({
//       key: alanKey,
//       onCommand: ({command, articles}) => {
//         if(command === 'newHeadlines'){
//           setNewsArticles(articles);
//           setActiveArticle(-1);
//         }else if(command==='highlight'){
//           setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
//         }
//       }

//     })
//   },[])
//   return (
//     <div>
//       <Typography className={classes.title} variant="h3"><b>News Reader Artificial Intelligence</b></Typography>

//       {/* <h3 className={classes.title}>News Reader Artificial IntelligenceI</h3> */}
//       <div className={classes.logoContainer}>
//         <img  src="https://th.bing.com/th/id/OIP.hpfA41UxWYp7BleWA_AoDAHaDt?pid=ImgDet&rs=1" className={classes.alanLogo} alt="alan logo"/>
//       </div>
//         <NewsCards articles={newsArticles} activeArticle={activeArticle} />
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from 'react';
import NewsCards from './components/NewsCards/NewsCards.component';
import Footer from './components/Footer/Footer';
import alanBtn from '@alan-ai/alan-sdk-web';
import useStyles from './app.styles.js';
import wordsToNumbers from 'words-to-numbers';
import Modal from './components/Modal/Modal.component';
import { Typography } from '@material-ui/core';
import AlanLogo from './AlanLogo.png';

const App = () => {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const alanKey =
    '6a56a6f5e810a8ef859adf5ba32e41142e956eca572e1d8b807a3e2338fdd0dc/stage';
  useEffect(() => {
    let alanBtnInstance = alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newsHeadlines') {
          // console.log('these are the articles: ', articles);
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'instructions') {
          setIsOpen(true);
        } else if (command === 'highlight') {
          setActiveArticle((prevactiveArticle) => prevactiveArticle + 1);
        } else if (command === 'open') {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again!');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening');
          } else {
            alanBtn().playText('Please try that again!');
          }
        }
      },
      onConnectionStatus: async function (status) {
        if (status === 'authorized') {
          await alanBtnInstance.activate();
          alanBtnInstance.playText(
            'Welcome to the Alan AI News Reader App by Rehan Khalil'
          );
        }
      },
    });
  }, []);

  // <img src={AlanLogo} className={classes.alanLogo} alt='Alan Logo' />
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant='h5' component='h2' style={{ fontSize: 15 }}>
                Try saying: <br />
                <br />
                Open the article number 2 or 3 or 4 etc
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant='h5' component='h2' style={{ fontSize: 15 }}>
                Try saying: <br />
                <br />
                Go back
                <br />
                or
                <br />
                Give me the Instructions
              </Typography>
            </div>
          </div>
        ) : null}
        <img src="https://th.bing.com/th/id/OIP.hpfA41UxWYp7BleWA_AoDAHaDt?pid=ImgDet&rs=1" className={classes.alanLogo} alt='logo' />
      </div>{' '}
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer />
    </div>
  );
};

export default App;