const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://passme:passgosi1q2w@cluster0-qwj1k.mongodb.net/test?retryWrites=true&w=majority", 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    )
    .then(() => console.log('MongoDB connected..'))
    .catch(err => console.log(err.message));
