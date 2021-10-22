import React from 'react';
import styled from "styled-components";
import Row from './Row';


const Container = styled.div`
max-width: 900px;
width: 100%;
padding: 30px 20px;
border: 1px solid #C3CFD9;
box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
border-radius: 6px;
margin: 0 auto;
.table {
	font-family: 'Lato', sans-serif;	
}
`;

const StyledHeader = styled.div`
box-shadow: 0 1px 2px 0 #E9EFFA;
text-transform: uppercase;
font-size: 12px;
font-weight: bold;
`;
const HeaderLabels = {fromAddress:'From Address', 
                        toAddress:'To Address', 
                        amountETH:'Amount in Eth', 
                        timestamp:'Time Stamp'};

const Table = (props:any) => {
    const { trx } = props;
    return (
        <Container className="table">
            <StyledHeader>
                <Row
                fromAddress={HeaderLabels.fromAddress}
                toAddress={HeaderLabels.toAddress}
                amountETH={HeaderLabels.amountETH}
                timestamp={HeaderLabels.timestamp}
                />
            </StyledHeader>
               
            {trx.map((item:any, index:number) => {
               return (<Row key={index} 
                fromAddress={item.fromAddress}
                toAddress={item.toAddress}
                amountETH={item.amountETH}
                timestamp={item.timestamp}
                fontSize={8}/>)
            })}
        </Container>
    ) 
}

export default Table;