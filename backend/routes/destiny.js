const express = require('express');
const router = express.Router();
const destinyService = require('../services/destinyService');

router.get('/profile/:membershipId/:membershipType', async (req,res) => {
    try {
        const { membershipId, membershipType} = req.params;
        const accessToken = req.headers.authorization.split(' ')[1];
        const data = await destinyService.getDestinyData(membershipId, membershipType, accessToken);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve data'});
    }
});

router.get('/inventory/:membershipId/:membershipType/:characterId', async (req,res) => {
    try {
        const {membershipId, membershipType, characterId } = req.params;
        accessToken = req.headers.authorization.split(' ')[1];
        const inventory = await destinyService.getCharacterInventory(membershipId, membershipType, characterId, accessToken);
        res.json(inventory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory'});
    }
});

module.exports = router;
