# line-bot-hono-example

To install dependencies:
```sh
bun i
```

To run:
```sh
bun dev
```

To check(lint and apply format):
```sh
bun check
```

open http://localhost:3000

## Webhook の動作確認について

開発サーバー起動後は、LINE Developer の Webhook URL に設定するために [ngrok](https://ngrok.com/) で https の URL を発行します。

Command:
```sh
ngrok http 3000
```