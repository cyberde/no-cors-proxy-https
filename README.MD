# no-cors-proxy-https

HTTPS-прокси, который добавляет заголовок cors в ответы сервера.
Полезно, если вам нужно использовать API, который не разрешает запросы из разных источников.


### Глобальное использование модуля

```
$ npm install no-cors-proxy-https -g

$ no-cors-proxy-https -p 8000 -t https://site.api.com
```

##### Опции:

  * -h _host_  (default: 127.0.0.1)
  * -p _port_  (default: 8000)
  * -t _target_  (default: 127.0.0.1)
  * -k _key_  ключ ssl (path/to/key.pem)
  * -c _cert_  сертификат ssl (path/to/cert.pem)

### Установка

```
npm install no-cors-proxy --save-dev
```

```
"scripts": {
    "start": "no-cors-proxy-https -c path/to/cert.pem -k path/to/key.pem -h 127.0.0.1 -p 8000 -t https://server.api.ru"
}
```