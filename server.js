const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now  = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);

    fs.appendFile('server.log', log+'\n', (err)=>{
        if(err)
            console.error(err);
    });
    next();     
});

// app.use((req, res, next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});
app.get('/', (req, res)=>{
    res.render('home.hbs', {
        pageTitle:'Home Page',
        welcomeMessage:'Welcome to Home Page',
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle:'About Page',
        welcomeMessage:'Welcome to About Page'
    });
});

app.get('/project', (req, res)=>{
    res.render('project.hbs',{
        pageTitle:'My Project',
        welcomeMessage:'Welcome to my Project Section'
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage:'Unable to handle /bad resource'
    });
});

app.listen(port,()=>{
    console.log(`running on ${port}`);
});