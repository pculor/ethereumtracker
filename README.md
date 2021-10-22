# Getting Started

This project is monolithic web app that fetchs records from
an Ethereum block base on the wallets address and block number

## Tech Stack
Backend and APIs are built with NodeJS while client-side is built with
React (Typescript)

## API Routes
view transactions associated with the address  and block number
[GET] `BASE_URL/api/v1/eth/wallet/:address?startBlock=blocknumber`


[GET] `BASE_URL/api/v1/eth/block`
Returns block numbers

[GET] `BASE_URL/api/v1/eth/transactions`
Return transactions

## HOW To RUN
Development ENV
**npm run dev**
