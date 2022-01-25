# monolithic-service-example

## Description
Ini merupakan contoh sederhana dari aplikasi monolithic. Aplikasi ini menggunakan jwt untuk mengakses beberapa `protected` resource / endpoint. Jika `access_token` yang sudah didapatkan lewat login sudah expired, maka cukup melakukan login ulang.

Aplikasi ini mensimulasikan proses manajemen suatu event / acara hingga pemesanan tiket. Setiap orang bisa menjadi event creator dengan cara mendaftarkan diri pada aplikasi ini agar memiliki akun. Suatu event bisa memiliki beberapa tiket. Suatu tiket memiliki harga. Tiket dengan harga 0 merupakan tiket gratis. Pada aplikasi ini, setiap user akan memiliki sebuah `dompet` virtual. Dompet ini digunakan sebagai alat pembayaran untuk membeli tiket. Dompet hanya bisa diisi / di-topup melalui akun admin. Setiap orang bisa membeli beberapa tiket pada suatu event, namun 1 tiket yang sama hanya bisa dibeli 1x.

## Setup
```bash
docker-compose up
```

## Endpoints

Semua endpoint yang pada service ini membutuhkan `access_token` jwt yang didapatkan ketika login, kecuali endpoint `POST /auth/login` dan `POST /users`.

### POST /users
Register user baru dengan role `user`

```json
{
  "username": "",
  "password": "",
}
```

Register user dengan role `admin`:
```json
{
  "username": "",
  "password": "",
  "role": "admin"
}
```

### POST /auth/login
Login menggunakan `username` dan `password` untuk mendapatkan `access_token` yang akan digunakan untuk mengakses `protected` endpoint.

```json
{
  "username": "",
  "password": "",
}
```

Contoh response:
```json
{
  "data": {
    "id": "61e43daf827f37001e8247d2",
    "username": "admin1",
    "role": "admin",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZ...."
  }
}
```

### POST /events
Membuat event baru.

```json
{
  "name": "",
  "description: ""
}
```

### POST /events/:id/tickets
Menambah tiket ke suatu event. Harga tiket bisa senilai `0` yang artinya free ticket.

```json
{
  "name": "Seminar ...",
  "price": 0,
  "date": "2021-01-31 10:00"
}
```

### GET /events/:id/tickets
Mengambil semua ticket pada suatu event

### POST /events/:id/register

Mendaftarkan diri ke suatu event dengan ticket tertentu.

```json
{
  "ticketId": ""
}
```

### GET /wallets

Mendapatkan semua dompet user. Hanya admin yang bisa mengakses ini.


### POST /wallets/topup

Mengisi uang pada dompet user. Hanya admin yang bisa mengakses ini.

```json
{
  "userId": "",
  "amount" : ""
}
```

