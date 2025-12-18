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
