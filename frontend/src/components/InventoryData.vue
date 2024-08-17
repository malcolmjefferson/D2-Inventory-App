<template>
    <div class="inventoryData">
        <h2>Character Inventory</h2>
        <ul v-if="inventory.length > 0">
            <li v-for="item in inventory" :key="item.itemHash">
                {{ item.name }} ({{ item.quantity }})
            </li>
        </ul>
        <div v-else>
            <p>No inventory data available</p>
        </div>
    </div>
</template>

<script>

export default {
    props: ['membershipId', 'membershipType', 'characterId', 'accessToken'],
    data() {
        return {
            inventory: [],
        };
    },
    methods: {
        async fetchInventory() {
            try {
                const response = await fetch(`/api/destiny/inventory/${this.membershipId}/${this.membershipType}/${this.characterId}`, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                });
                const data = await response.json();
                this.inventory = data;
            } catch (error) {
                console.error('Error fetching inventory:', error);
            }
        },
    },
    mounted() {
        this.fetchInventory();
    },
};
</script>

<style scoped>
.inventoryData {
    /* Add styling as needed */
}
</style>
