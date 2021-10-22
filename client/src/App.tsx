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
  const [address, setAddress] = useState({});
  // interface output {
  //   data: {
  //     [propName: string]: any;
  //   }
  // }

  // const getBlocks = async() => {
  //   const blockRes:output = await axios.get('eth/transactions');
  //   const { data: {
  //     body
  //   } } = blockRes;
  //   console.log(body)
  //   setBlock(body)
  // }

  // useEffect(() => {
  //   getBlocks();
  // }, [])


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
    // event.preventDefault();
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

  interface Ievent {
    target: string;
    value: string;
    name: string;
  }

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
