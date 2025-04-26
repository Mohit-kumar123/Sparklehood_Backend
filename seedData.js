const mongoose=require('mongoose');
const dotenv=require('dotenv');
const Incident=require('./models/Incident');

dotenv.config();

const sampleIncidents=[
    {
        title: 'Model Bias Detected',
        description: 'The AI model showed significant bias in predictions.',
        severity: 'High',
    },
    {
        title: 'Data Breach',
        description: 'A data breach exposed training data.',
        severity: 'Medium',
    },
    {
        title: 'Unauthorized Access',
        description: 'An unauthorized user accessed the system.',
        severity: 'Low',
    },
];

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(async()=>{
    console.log('MogoDB connected');
    await Incident.deleteMany();
    await Incident.insertMany(sampleIncidents);
    console.log('sample inserted');
    mongoose.disconnect();
}).catch((err)=>{
    console.error('Error while connecting DB: ',err);
    mongoose.disconnect();
});