const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors())

const dbUrl = "mongodb+srv://fardeen:Havind9123s@register-product.rtrbvqq.mongodb.net/?retryWrites=true&w=majority"

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const formDataSchema = new mongoose.Schema({
    title:String, prevPrice:String, newPrice:String, company:String, category:String, img:String, id: String, color:String, reviews:String,
  });
  
  const FormData = mongoose.model('FormData', formDataSchema);
  
  app.use(bodyParser.json());
  
  app.post('/api/saveFormData', async (req, res) => {
    const formData = new FormData(req.body);

    try {
        await formData.save();
        res.status(200).send('Data saved successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error saving data');
    }
});
app.get('/api/products', async (req, res) => {
    try {
      const products = await FormData.find();
      const prod = res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

mongoose.connect(dbUrl, connectionParams).then(() => {
    console.log("Connected to DB")
}).catch((e) => {
    console.log(e);
})
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });