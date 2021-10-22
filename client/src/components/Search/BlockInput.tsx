import styled from "styled-components";
import Input from '../common/Input';

const StyledInput = styled(Input)`
    height: 2rem;
    width: 10rem;
    border: 1px solid skyblue;
`;


const BlockInput =(props:any)=>{
  const { handleInputChange, search, handleKeypress } = props;
    return(
    <StyledInput
        type="text"
        placeholder="Enter Block Number"
        value={search.block}
        onChange={handleInputChange}
        onKeyPress={handleKeypress}
        name="block"
        />
  
    )
}

export default BlockInput;