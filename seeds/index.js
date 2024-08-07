const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Databse connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: '66a05a6760a86a232fd7df71',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'This is test of description, is possible that is a bad idea but i dont know, i want try hahah',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        
        {
          url: 'https://res.cloudinary.com/dlxslka0z/image/upload/v1722483594/YelpCamp/xg8t13pwijtra5wno3wl.jpg',
          filename: 'YelpCamp/bu196hvhgbf5heyg0glg',
        },
        {
          url: 'https://res.cloudinary.com/dlxslka0z/image/upload/v1722385526/YelpCamp/fm2ljyinuyswiyqoemzc.jpg',
          filename: 'YelpCamp/aey4hx8zjk2s8no4scei',
        },
        {
          url: 'https://res.cloudinary.com/dlxslka0z/image/upload/v1722488541/YelpCamp/xxbpreyy5v3iqslnfkuw.jpg',
          filename: 'YelpCamp/ybeeeafgrlacyd0gxfq1',
        }
      ],
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})