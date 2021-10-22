import React from 'react';
import styled from "styled-components";
import Input from '../common/Input';

const StyledInput = styled(Input)`
    height: 2rem;
    width: 10rem;
    border: 1px solid skyblue;
`;



const StyledDiv = styled.div`
display: inline-block;
`;

const AddressInput =(props:any)=>{
  const { handleInputChange, search } = props;
    return(
              <StyledInput
              type="text"
              placeholder="Enter Transaction Address"
              value={search.address}
              onChange={handleInputChange}
              name="address"
              />
    )
}

export default AddressInput;