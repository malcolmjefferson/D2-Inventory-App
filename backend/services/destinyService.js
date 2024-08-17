const axios = require('axios');

const apiKey = '';

async function getDestinyData(membershipId, membershipType, accessToken)
{
    try {
        const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/?components=Profiles,Characters`, {
            headers: {
                'X-API-Key': process.env.BUNGIE_API_KEY,
                Authorization: `Bearer ${accessToken}`
        },
            params: {
                components: 'Profiles, Characters'
            }
        });
        return response.data.Response;
    } catch (error){
        console.error('Error fetching Destiny 2 data:', error);
        throw error;
    }
};

async function getCharacterInventory(membershipId, membershipType, characterId, accessToken)
{
    const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/`, {
        headers: {
            'X-API-Key': process.env.BUNGIE_API_KEY,
            Authorization: `Bearer ${accessToken}`
        },
        params: {
            components: 'CharacterInventories'
        }
    });
    return response.data.Response.characterInventories.data.items;
}

module.exports = {
    getDestinyData,
    getCharacterInventory
};
