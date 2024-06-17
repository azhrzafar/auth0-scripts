## This repo contains Auth0 related scripts

### Project setup

Install dependencies

`npm i`

Create .env file from env.example and update the secrets

`cp env.example .env`

### Update user fields

`npm run update:users`

This script aims to update user attributes as following,

- Update user root properties `given_name`, `family_name` with `user_metadata.given_name` and `user_metadata.family_name` respectively.
- Remove attributes `given_name` and `family_name` from `user_metadata`
