import react, { useState } from 'react';
import Createpost from './components/Createpost';
import Postlist from './components/Postlist';
import './css/style.css';
function App() {
  const [allpost,setallpost] = useState([]);

  const updatepostList = (n) =>{
    setallpost([...allpost,n]);

  }
  return (
    <div className="App">
       <div className="post_wrapper">
          <Createpost updatepostList={updatepostList} />
          <Postlist allpost={allpost}/>
       </div>
    </div>
  );
}

export default App;
