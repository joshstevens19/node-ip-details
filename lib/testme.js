const ipdetails = require('./ipdetails');
const ipInitialise = ipdetails.initialise({ip: "1.1.1.1"});

ipInitialise.allInformation()
         .then(r => console.log(r))
         .catch(err => console.log(err))