# line-bot-hono-example

To run: open <http://localhost:3000>

```sh
bun dev
```

To lint:

```sh
bun lint
```

## Webhook の動作確認について

`bun dev`コマンドで開発サーバー起動後は、LINE Developer の Webhook URL を設定するために [ngrok](https://ngrok.com/) で https の URL を発行します。

Setup ngrok token:

```sh
ngrok config add-authtoken <NGROK_TOKEN>
```

To run:

```sh
ngrok http 3000
```
