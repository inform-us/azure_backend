# azure_backend

A repo for getting a basic backend prototype working in Azure using FastAPI

# Requirements

## Environment variables

Copy the `.env.example` file to `.env` file:

`cp .env.example .env`

Set the `FRONTEND_URL` to the URL of where your frontend is deployed.

Set the `MONGODB_URI` to the URI of where your mongodb instance is deployed.

## Install packages

`pip install fastapi uvicorn`

## Start up the backend

`uvicorn main:app --reload`
