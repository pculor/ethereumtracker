import React from 'react';
import styled from "styled-components";

const StyledRow = styled.div`
display: flex;
flex-direction: row;
flex-wrap: no-wrap;
width: 100%;
padding: 12px;
border-bottom: 1px solid #BCE1EA;
box-sizing: border-box;
margin: 0 auto;
`;

// interface col {
//     size: number;
// }
const StyledList = styled.li`
list-style: none;
flex-grow: 0;
flex-shrink: 0;
vertical-align: top;
color: #8798AB;
margin:0 2rem 0 0;
justify-content: center;
overflow-x: hidden;
width: 100%;
`;


const Wrapper = styled.div`
display: grid;
grid-template-columns: 20% 20% 20% 20%;
grid-gap: 5rem;
margin: 0 auto;
`;
interface rowData {
    fromAddress: string;
    toAddress: string;
    amountETH: number|string;
    date: string;
    width?: number;
    fontSize?: number;
}
const Row = (props:rowData)=>{
    const { fromAddress, toAddress, amountETH,  date, width, fontSize } = props;
return (
    <StyledRow>
        <Wrapper>
            <StyledList style={{ width, fontSize }}>{fromAddress}</StyledList>
            <StyledList style={{ width, fontSize }}>{toAddress}</StyledList>
            <StyledList style={{ width, fontSize }}>{amountETH}</StyledList>
            <StyledList style={{ width, fontSize }}>{date}</StyledList>
        </Wrapper>
    </StyledRow>
)
};


export default Row;