# istoocold
El proyecto funciona con una RaspberryPi 2 Modelo B.

Se utiliza nodejs6 con los modulos:
"bme280-sensor": "^0.1.6",
"i2c-bus": "^1.2.1",
"nodemailer": "^3.1.8",
"nodemailer-smtp-transport": "^2.7.2",
"wiring-pi": ">=2.1.1"
    
Se necesita 5 cables hembra/macho que van del gpio en la rpi al protoboard y 2 cables macho macho en el protoboard. A demas de un sensor de
temperatura, un led y una resistencia.

El sensor de temperatura es el adafruit bme280. [https://goo.gl/yn7K15]

Si la temperatura es mayor a 24 grados centigrados este enciende el led. Si es menor lo apaga y envia un correo notificandolo.
De igual manera si la temperatura sube a por encima de los 24 grados el led se reestablece y notificara por correo electronico.

Para instalarlo solo necesitas hacer un 'npm install y el packages.json se encargara'.

Ahora bien, para ejecutarlo utilizas un simple 'sudo nodejs tempLed.js' y listo...
