// importing express, path, novelcovid
const express = require('express')
const path = require('path')
const api = require('novelcovid');

//Creating an express app
const app = express()
 
api.settings({
    baseUrl: 'https://disease.sh'
})

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static('public'));


//Get methods
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/searchCountry',(req,res)=>{
    
    let searchedCountry = req.query.country;
    api.countries({country:searchedCountry}).then((data)=>{
        console.log(data)
        if(data.hasOwnProperty("message")){
            res.render('error',{error_message:data.message})
        } else {
            res.render('results',{result_data: data,image_url:data.countryInfo.flag});
        }
    })
})

//Listen to the port 3000
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server Up and running.');
})
