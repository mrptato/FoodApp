const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Diet_type } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console

    try {
      let catGlutenFree = Diet_type.create({ name: "Gluten Free" });
      let catKetogenic = Diet_type.create({ name: 'Ketogenic' });
      let catVegetarian = Diet_type.create({ name: 'Vegetarian' });
      let catLactoVegetarian = Diet_type.create({ name: 'LactoVegetarian' });
      let catOvoVegetarian = Diet_type.create({ name: 'OvoVegetarian' });
      let catVegan = Diet_type.create({ name: 'Vegan' });
      let catPescetarian = Diet_type.create({ name: 'Pescetarian' });
      let catPaleo = Diet_type.create({ name: 'Paleo' });
      let catPrimal = Diet_type.create({ name: 'Primal' });
      let catWhole30 = Diet_type.create({ name: 'Whole30' });

      Promise.all([catGlutenFree, catKetogenic, catVegetarian, catLactoVegetarian, catOvoVegetarian,
        catVegan, catPescetarian, catPaleo, catPrimal, catWhole30]).then(res => {
          // console.log('Categorías de dietas precargadas')
        })
        .catch(err => console.log('Categorías precargadas'));
    } catch (e) {
      // console.log('Categorías de dietas precargadas');
      // console.log('Ya están precargadas, error:', e)
    }
    // console.log('Categorías de dietas precargadas')
  });
});
