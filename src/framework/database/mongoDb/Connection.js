export default function connection(mongoose, config, options) {
    function connectToMongo() {
        mongoose.connect(config.mongo.uri, options).then(
            () => { },
            (err) => {
                console.info('Mongodb error ', err);
            }
        )
            .catch((err) => {
                console.log('ERROR:', err);
            });
    }

    mongoose.connection.on('connected', () => {
        console.info('Connected to MongoDB!');
    });


    return {
        connectToMongo
    };
}