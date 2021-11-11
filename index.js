const express = require('express')
const app = express()
const request = require('request')
app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.render('index', {weather:null, error: null})
})

app.post('/',(req,res)=>{
    let city = req.body.city;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37d99f4c8bd8fa96d4509c54c8a262d7`;
    request(url, function(err,response, body){
        if(err){
            res.render('index',{weather: null, error: 'err, Please try again'})
        }else{
            let weather = JSON.parse(body)
            console.log(weather)
            if(weather.main == undefined){
                res.render('index',{weather: null, error: 'err, Please try again'})
            }else{
                let place = `${weather.name}, ${weather.sys.country}`,
                weatherTemp = `${((weather.main.temp)-273).toFixed(2)}`,
                weatherMin = `${((weather.main.temp_min)-273).toFixed(2)}`,
                weatherMax = `${((weather.main.temp_max)-273).toFixed(2)}`,
                weatherDescription = `${weather.weather[0].description}`;
                res.render('index', {
                    weather: weather,
                    place: place,
                    temp: weatherTemp,
                    description: weatherDescription,
                    min: weatherMin,
                    max: weatherMax,
                    error: null
                })
            }
        }
    })
})


app.listen(3007)