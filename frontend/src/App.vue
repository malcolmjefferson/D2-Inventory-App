<template>
  <div id="app">
    <h1>Destiny 2 Character Data</h1>
    <div>
      <input v-model="membershipId" placeholder="Membership ID" />
      <input v-model="membershipType" placeholder="Membership Type" />
      <input v-model="characterId" placeholder="Character ID" />
      <button @click="loginWithBungie">Login with Bungie</button>
    </div>
    <div v-if="isLoggedIn">
      <p>You are logged in!</p>
      <p>Access Token: {{ accessToken }}</p>
    </div>
    <character-data
      v-if="isLoggedIn"
      :membership-id="membershipId"
      :membership-type="membershipType"
      :access-token="accessToken"
    />
    <inventory-data
      v-if="isLoggedIn"
      :membership-id="membershipId"
      :membership-type="membershipType"
      :character-id="characterId"
      :access-token="accessToken"
    />
  </div>
</template>

<script>
import CharacterData from './components/CharacterData.vue';
import InventoryData from './components/InventoryData.vue';

export default {
  components: {
    CharacterData,
    InventoryData,
  },
  data() {
    return {
      membershipId: '',
      membershipType: '',
      characterId: '',
      accessToken: null,
      isLoggedIn: false,
    };
  },
  methods: {
    async loginWithBungie() {
      try {
        const response = await fetch('/auth/bungie');
        const data = await response.json();
        this.accessToken = data.accessToken;
        this.isLoggedIn = true;
      } catch (error) {
        console.error('Error logging in: ', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add global styles here */
</style>
