var wpi = require('wiring-pi');

// GPIO pin of the led
var configPin = 7;
// Blinking interval in usec
var configTimeout = 200;

wpi.setup('wpi');
wpi.pinMode(configPin, wpi.OUTPUT);
const BME280 = require('bme280-sensor');

const options = {
	i2cBusNo:1,
	i2cAddress: 0X77
};

const bme280 = new BME280(options);

var nodemailer = require('nodemailer');
var smtpTransporter = require('nodemailer-smtp-transport');
var transport = nodemailer.createTransport(smtpTransporter({
	service: 'Gmail',
	auth: {
		user: 'account@gmail.com',
		pass: 'password'
	}
}));
var ledStatus = 0;
const readSensor = () => {
	bme280.readSensorData().then((data)=> {
		data.temp_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
		console.log('data = ',JSON.stringify(data, null, 2));
		if(data.temperature_C > 24){
			if(ledStatus === 0){
				 transport.sendMail({
                                	from: 'from@gmail.com',
                        	        to: 'to@gmail.com',
                	                subject: 'it is a nice temp',
        	                        html: '<b>we are over the 24 grades</b>',
	                                text: JSON.stringify(data, null, 2)
                        	});
			}
			ledStatus = 1;
		}else{
			if(ledStatus === 1){
				transport.sendMail({
					from: 'from@gmail.com',
					to: 'to@gmail.com',
					subject: 'is too cold',
					html: '<b>we are at less than 24 grades</b>',
					text: JSON.stringify(data, null, 2)		
				});
			}
			ledStatus = 0;
		}
		wpi.digitalWrite(configPin, ledStatus);
		setTimeout(readSensor, 5000);
	}).catch((err)=>{
		console.log('BME280 ERROR: ', err);
		setTimeout(readSensor, 1000);
	});
}

bme280.init()
	.then(()=>{
		console.log('BME280 INITIALIAZED');
		readSensor();
	})
	.catch((err) => {
		console.error('error init bme280: ', err);
	});
