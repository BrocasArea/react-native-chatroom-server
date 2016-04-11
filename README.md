# react-native-chatroom-server

### 設定與啟動

```
$ export RN_CHATROOM_GCMKEY=YOUR_KEY
$ node src/app.js
```

### API

#### POST /api/v1/room

request

```json
{
  "roomId": "roomId_a001",
  "username": "jack",
  "gcmId": "qwerty"
}
```

reqponse

```json
{
  "roomId": "roomId_a001",
  "username": "jack",
  "gcmId": "qwerty"
}
```

#### POST /api/v1/message


request

```json
{
  "roomId": "roomId_a001",
  "username": "jack",
  "message": "message"
}
```

reqponse

```json
{
  "roomId": "roomId_a001",
  "username": "jack",
  "message": "message"
}
```
