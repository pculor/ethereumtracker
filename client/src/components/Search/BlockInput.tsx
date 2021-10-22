import React from 'react';
import styled from "styled-components";
import Input from '../common/Input';

const StyledInput = styled(Input)`
    height: 2rem;
    width: 5rem;
    border: 1px solid skyblue;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 10rem;
  padding: 2rem;
  button {
    background-color: skyblue;
    border-radius: 8px;
    width: 5rem;
    height: 2rem;
  }
`;

const StyledDiv = styled.div`
display: inline-block;
`;

const BlockInput =(props:any)=>{
  const { handleInputChange, search } = props;
    return(
    <StyledInput
        type="text"
        placeholder="Enter Transaction Block Number"
        value={search.block}
        onChange={handleInputChange}
        name="block"
        />
  
    )
}

export default BlockInput;