# cors-proxy-with-https

HTTPS-прокси, который добавляет заголовок cors в ответы сервера.
Полезно, если вам нужно использовать API, который не разрешает запросы из разных источников.

##### Опции:

  * -h _host_  (default: 127.0.0.1)
  * -p _port_  (default: 8000)
  * -t _target_  (default: 127.0.0.1)
  * -k _key_  ключ ssl (path/to/key.pem)
  * -c _cert_  сертификат ssl (path/to/cert.pem)

### Установка

```
npm i git+ssh://github.com/cyberde/no-cors-proxy-https --save-dev
```

package.json
```
"scripts": {
    ....
    "startNoCorsProxy": "cors-proxy-with-https -c path/to/cert.pem -k path/to/key.pem -h 127.0.0.1 -p 8000 -t https://server.api.ru"
    ....
}
```