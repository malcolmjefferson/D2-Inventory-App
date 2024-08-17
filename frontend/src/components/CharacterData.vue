<template>
    <div class="character-data">
        <h2>Character Data</h2>
        <div v-if="characterData">
            <p>Name: {{ characterData.name }}</p>
            <p>Class: {{ characterData.class }}</p>
            <p>Light Level: {{ characterData.lightLevel }}</p>
        </div>
        <div v-else>
            <p>No character data available</p>
        </div>
    </div>
</template>

<script>

export default {
    props: ['membershipId', 'membershipType', 'accessToken'],
    data() {
        return {
            characterData: null,
        };
    },
    methods: {
        async fetchCharacterData() {
            try {
                const response = await fetch(`/api/destiny/profile/${this.membershipId}/${this.membershipType}`, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                });
                const data = await response.json();
                this.characterData = data.characterData;
            } catch (error) {
                console.error('Error fetching character data:', error);
            }
        },
    },
    mounted() {
        this.fetchCharacterData();
    },
};
</script>

<style scoped>
.character-data {
    /* Add styling as needed */
}
</style>
