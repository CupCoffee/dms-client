<template>
    <div class="chat-box small-12 medium-6 large-4">
        <input class="chat-box__input large" v-model="message" type="text" @keydown.enter.prevent="sendMessage">
        <button class="chat-box__button" @click="sendMessage">
            <i class="fa fa-send"></i>
        </button>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
    	data() {
    		return {
    			message: ''
            };
        },

        methods: {
            sendMessage()
            {
            	this.$store.dispatch('sendMessage', {
            		author: '1337dr@w3r',
            		message: this.message
            	});
                this.clear();
            },

            clear()
            {
            	this.message = '';
            }
        }
    }
</script>