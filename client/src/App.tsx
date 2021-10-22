import React, { useState, useEffect } from 'react';
import './App.css';
import { axios } from './utils/axios';
import Table from './components/Table';
import Search from './components/Search';

function App() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState({
    block: "",
    address: ""
  });

  interface Irecords {
    [propName: string]: any;
  }

  const getRecords = () => {
    axios
      .get(`eth/transactions`)
      .then((res:Irecords) => {
        const { data: {
          body
        }} = res;
        console.log(body, '<<==')
        setRecords(body)
      })
      .catch(error => {
        return error.statusText;
      });
  };

  const searchRecords = (event:any) => {
    axios
      .get(`eth/wallet/${search.address}?startBlock=${search.block}`)
      .then((res:Irecords) => {
        const { data: {
          body
        }} = res;
        console.log(body, '<<==')
        setRecords(body)
      })
      .catch(error => {
        return error.statusText;
      });
  };

  const handleKeypress = (e:any) => {
    if (e.keyCode === 13) {
      searchRecords(e)
    }
  };



  useEffect(getRecords,[])


  interface Isearch {
    block: string;
    address: string;
  }

  const handleInputChange =(event:any)=>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setSearch((search:Isearch) => ({ ...search, [name]: value}))
  }


  return (
    <div className="App">
      <Search 
      searchRecords={searchRecords}
      handleInputChange={handleInputChange}
      onKeyPress={handleKeypress}
      search={search}
      />
      <Table trx={records}/>
    </div>
  );
}

export default App;
