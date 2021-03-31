const router = require('express').Router();
const { Zodiac } = require('../../models');

// GET all Zodiac Horoscopes
router.get('/', async (req, res) => {
  try {
    const ZodiacData = await Zodiac.findAll();
    res.status(200).json(ZodiacData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// DELETE a Zodiac Location
router.delete('/:id', async (req, res) => {
  try {
    const ZodiacData = await Zodiac.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!ZodiacData) {
      res.status(404).json({ message: 'No horoscope found with this id!' });
      return;
    }

    res.status(200).json(ZodiacData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
