const express = require('express');
const router = express.Router('');

const notesModels = require('../models/notes');

router.get('/', (req, res, next) => {
    notesModels
    .obtain()
    .then(notesData => {
        res.render('notesData/view', {
            notes: notesData,
        });
    })
    .catch(err => {
        return res.status(500).send("<h1>Error obteniendo los datos</h1>");
    });
});

router.get('/agregar', (res, req, next) => {
    res.render('notes/agregar');
});

router.post('/insert', (req, res, next) => {
    const {
        note
    } = req.body;
    if (!note) {
        return res.render(500).send('No hay datos');
    }

    notesModels
    .insert(note)
    .then(idNoteInsert => {
        res.redirect('/notes');
    })
    .catch(err => {
      return res.status(500).send('Error insertando los datos');
    });
});

router.get('/delete/:id', (req, res, next) => {
  notesModels
  .obtainForId(req.params.id)
  .then(() => {
    res.redirect('/notes');
  })
  .catch(err => {
    return res.status(500).send('Error eliminando los datos');
  });
});

router.post('/update/', (req, res, next) => {
  const {id, notes} = req.body;
  if(!note || !id){
    return res.status(500).send('No hay datos');
  }

  notesModels
  .update(id, notes)
  .then(() => {
    res.redirect('/notes');
  })
  .catch(err => {
    return res.status(500).send('Error actualizando los datos');
  });
});

module.exports = router;
