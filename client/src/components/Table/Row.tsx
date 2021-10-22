import React from 'react';
import styled from "styled-components";
import classNames from "classnames";

const StyledRow = styled.div`
display: flex;
flex-direction: row;
flex-wrap: no-wrap;
width: 100%;
padding: 12px;
border-bottom: 1px solid #DCE1EA;
box-sizing: border-box;



.wrapper {
	display: flex;
	flex-direction: row;
}

`;

const StyleUl = styled.ul`
display: flex;
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
margin:0 auto;
justify-content: center;
overflow-x: hidden;
`;

interface rowData {
    fromAddress: string;
    toAddress: string;
    amountETH: number|string;
    timestamp: string;
    width?: number;
    fontSize?: number;
}
const Row = (props:rowData)=>{
    const { fromAddress, toAddress, amountETH,  timestamp, width, fontSize } = props;
return (
    <StyledRow className="wrapper">
        <StyledList className="column" style={{ width, fontSize }}>{fromAddress}</StyledList>
        <StyledList className="column" style={{ width, fontSize }}>{toAddress}</StyledList>
        <StyledList className="column" style={{ width, fontSize }}>{amountETH}</StyledList>
        <StyledList className="column" style={{ width, fontSize }}>{timestamp}</StyledList>
    </StyledRow>
)
};


export default Row;