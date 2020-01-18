# News and Topics Management

**This API was created for the needs of the Bareksa Backend test.**

You can use this API to manage news and topics.

## Installation

```bash
$ git clone https://github.com/straf16/bareksaTest.git
```

## Running

```bash
$ cd bareksaTest
$ npm install
$ npm run dev

> NODE_ENV=development nodemon bin/http.js

[nodemon] 1.19.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] starting `node bin/http.js`
APP RUNNING ON PORT: 3000
MONGODB CONNECT

...
```

## Configuration

There are few environment variables that you must set

- **PORT** - server port to run
- **MONGODB_URL** - MongoDB Database URL, for local use: `mongodb://localhost/news-topic-management`

## Dependencies

- Look [package.json](https://github.com/straf16/bareksaTest/blob/master/package.json)