import React from 'react';
import styled from "styled-components";
import AddressInput from './AddressInput';
import BlockInput from './BlockInput';

const StyledDiv = styled.div`
display: flex;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: space-around;
  height: 10rem;
  padding: 2rem;
  margin: 0 auto;
  button {
    background-color: skyblue;
    border-radius: 8px;
    width: 5rem;
    height: 3rem;
    padding: 2rem;
  }
  input {
    margin: 10px  10px 10px 6px;
  }
`;

const Search =(props:any)=>{
    const { searchRecords, handleInputChange, search } = props;
    return (
        <StyledDiv>
            <StyledForm onSubmit={searchRecords}>
                <AddressInput {...props}/>
                <BlockInput {...props}/>
            <button type="submit">Submit</button>
            </StyledForm> 
        </StyledDiv>
    )
}

export default Search;