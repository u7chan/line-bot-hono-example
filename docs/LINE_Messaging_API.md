# LINE_Messaging_API 覚書

## Webhook 仕様

### 検証ボタン押下時のリクエストパラメーター

```yaml
{
  destination: "U12z3456zz78901zzzzzzz2z3z4567890", // IDはダミー (※全て同じID)
  events: [],
}
```

### ユーザーが公式アカウントを追加やブロックを解除した時

```yaml
{
  destination: "U12z3456zz78901zzzzzzz2z3z4567890", // IDはダミー (※全て同じID)
  events: [
    {
      type: "follow",
      follow: {
        isUnblocked: true,
      },
      webhookEventId: "00Z0ZZ0ZZ0ZZZZZ0Z0Z000ZZZ0", // IDはダミー（※毎回変化する）
      deliveryContext: {
        isRedelivery: false,
      },
      timestamp: 1719755041668,
      source: {
        type: "user",
        userId: "U999z99z9999z999zz999999999z9z99z",　// IDはダミー（※ユーザーID、再フォローでも変化しない）
      },
      replyToken: "xxx1x11111xx111x1x11x11111xx111x", // IDはダミー（※毎回変化する）
      mode: "active",
    }
  ],
}
```

### ユーザーが公式アカウントをブロックした時

```yaml
{
  destination: "U12z3456zz78901zzzzzzz2z3z4567890", // IDはダミー (※全て同じID)
  events: [
    {
      type: "unfollow",
      webhookEventId: "11Z1ZZ1ZZ1ZZZZZ1Z1Z111ZZZ1", // IDはダミー（※毎回変化する）
      deliveryContext: {
        isRedelivery: false,
      },
      timestamp: 1719755271031,
      source: {
        type: "user",
        userId: "U999z99z9999z999zz999999999z9z99z",　// IDはダミー（※ユーザーID、再フォローでも変化しない）
      },
      mode: "active",
    }
  ],
}
```

### ユーザーがメッセージを入力した時

入力内容: `test@example.com`

```yaml
{
  destination: "U12z3456zz78901zzzzzzz2z3z4567890", // IDはダミー (※全て同じID)
  events: [
    {
      type: "message",
      message: {
        type: "text",
        id: "123456789012345678",　// IDはダミー（※毎回変化する）
        quoteToken: "zNqi1zKx1O4HWIpABCDEFG ... ", // トークンはダミー（※150文字）
        text: "test@example.com", // メッセージ内容
      },
      webhookEventId: "22Z2ZZ2ZZ2ZZZZZ2Z2Z222ZZZ2", // IDはダミー（※毎回変化する）
      deliveryContext: {
        isRedelivery: false,
      },
      timestamp: 1719755822955,
      source: {
        type: "user",
        userId: "U999z99z9999z999zz999999999z9z99z",　// IDはダミー（※ユーザーID、再フォローでも変化しない）
      },
      replyToken: "xxx2x22222xx222x2x22x22222xx222x", // IDはダミー（※毎回変化する）
      mode: "active",
    }
  ],
}
```

## 公式ドキュメント

<https://developers.line.biz/ja/reference/messaging-api/#follow-event>
