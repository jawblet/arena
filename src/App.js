import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Paginate from './components/Paginate';
import Card from './components/Card';

function App() {
  const postsPerPage = 10;
  const [phrases, setPhrases] = useState(null);
  const [total, setTotal] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get('https://api.are.na/v2/channels/shea-phrases-from-my-dreams', 
    { params: {
      per: postsPerPage,
      page: page}
    }).then(res => {
      setPhrases(res.data.contents);
      setTotal(Math.ceil(res.data.length / postsPerPage));
    }).catch(err => console.log(err));
  }, [page]);

  return (
    <div className="page">
        <h3>phrases from shea's dreams</h3>
        <div className="page__counter">
          <Paginate page={page} total={total} setPage={setPage}/>
          </div>
        <div className="page__content">
          {phrases && phrases.map((el, i) => {
            return (<Card key={i} text={el.content}/>)
          })}
        </div>
    </div>
  );
}

export default App;
