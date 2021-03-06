import styled from "styled-components";
import Input from '../common/Input';

const StyledInput = styled(Input)`
    height: 2rem;
    width: 15rem;
    border: 1px solid skyblue;
`;



const AddressInput =(props:any)=>{
  const { handleInputChange, search, handleKeypress } = props;
    return(
              <StyledInput
              type="text"
              placeholder="Enter Transaction Address"
              value={search.address}
              onChange={handleInputChange}
              onKeyPress={handleKeypress}
              name="address"
              />
    )
}

export default AddressInput;