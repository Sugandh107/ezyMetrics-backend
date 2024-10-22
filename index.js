const express=require('express')
const mongoose =require('mongoose')
const cors=require('cors')
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const app=express();
const Lead=require('./models/Lead')
const Campaign=require('./models/Campaign')
const nodemailer = require('nodemailer');


PORT=process.env.PORT || 5000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(console.log("Mongo connected")).catch((er)=>console.log(er)
)

app.get('/api/crm/leads',async (req, res) => {
   const leads = await Lead.find();
    res.json(leads);
  });
  
  app.get('/api/marketing/campaigns', async (req, res) => {
    const campaign = await Campaign.find();
    console.log(campaign);
    
    res.json(campaign);
  });

  app.get('/api/report/pdf', async (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(res);
  
    const leads = await Lead.find();
    doc.text('Leads Report');
    leads.forEach((lead) => doc.text(`${lead.name} - ${lead.email}`));
  
    doc.end();
  });

  // CSV Report
  app.get('/api/report/csv', async (req, res) => {
    const leads = await Lead.find();    
    
    const fields = ['name', 'email'];
    const parser = new Parser({ fields });
    const csv = parser.parse(leads);
  
    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nick107911@gmail.com',
      pass: '1234567890',
    },
  });
  
  app.get('/api/alerts', async (req, res) => {
    const campaigns = await Campaign.find();
    campaigns.forEach((campaign) => {
      const conversionRate = (campaign.conversions / campaign.clicks) * 100;
      if (conversionRate < 10) {
        transporter.sendMail({
          from: 'nick107911@gmail.com',
          to: 'riderghost10791@gmail.com',
          subject: 'Low Conversion Alert',
          text: `Campaign ${campaign.name} has a low conversion rate: ${conversionRate}%`,
        });
      }
    });
    res.send('Alerts sent');
  });

  app.post('/leads',async (req,res)=>{
    try {
      const leads=req.body;
      console.log(leads);
      
      const savedLeads= await Lead.insertMany(leads);
      res.status(200).json(savedLeads);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  })
  app.post('/campaign',async (req,res)=>{
    try {
      const campaign=req.body;
      console.log(campaign);
      
      const savedCampaign= await Campaign.insertMany(campaign);
      res.status(200).json(savedCampaign);
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
      
    }
  })


app.listen(5000, () => console.log(
`Server running on port 5000`))