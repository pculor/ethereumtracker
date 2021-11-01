# Getting Started

This project is monolithic web app that fetchs records from
an Ethereum block base on the wallets address and block number

## Tech Stack
Backend and APIs are built with NodeJS while client-side is built with
React (Typescript)

## API Routes
view transactions associated with the address  and block number
[GET] `BASE_URL/api/v1/eth/wallet/:address?startBlock=blocknumber`

Sample Request
[GET] `http://localhost:4000/api/v1/eth/wallet/0xa4341fb5429246265f933C8709dd4d3BDb5B2789?startBlock=9512017`

Response


[GET] `BASE_URL/api/v1/eth/block`
Returns block numbers

[GET] `BASE_URL/api/v1/eth/transactions`
Return transactions

## HOW To RUN
Development ENV
**npm run dev**
