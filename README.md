# XAPI DB Viewer

- Open XAPI DB XML file in a browser and navigate through it.

## Setup

### Deno

- We are using [deno](https://docs.deno.com)
  - build: `deno task build`
  - run & test: `firefox --devtools "file://$(realpath ./index.html)"`

### npm (former)
- `npm init -y`
- `npm install --save-dev typescript typescript-language-server prettier`

## Dev
- *...Work in progress...*
  - We are currently following the [tutorial](https://www.typescripttutorial.net/typescript-tutorial/)
- build: `npx tsc` or `npx tsc --watch`
- run & test: `firefox --devtools "file://$(realpath ./index.html)"`
