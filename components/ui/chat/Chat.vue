<template>
    <div class="chat medium-3 large-2">
        <transition-group @after-enter="updateScroll" enter-active-class="animated fadeInUp" tag="div" class="chat__box" ref="chatbox">
            <message v-for="(item, key) in messages" :key="key" class="chat__message" :author="item.author" :content="item.message"></message>
        </transition-group>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import Message from './Message.vue';

    export default {
    	components: {
    		Message
        },

        computed: {
    		...mapGetters(['messages'])
        },

        watch: {
    		messages() {
    			//this.updateScroll();
            }
        },

        methods: {
    		updateScroll()
            {
	            this.$refs.chatbox.$el.scrollTop = this.$refs.chatbox.$el.scrollHeight;
            }
        }
    }
</script>