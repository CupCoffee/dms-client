<template>
    <div class="message">
        <span class="message__author" v-text="author"></span>
        <p class="message__content" v-text="content"></p>
    </div>
</template>

<script>
    export default {
        props: ['author', 'content']
    }
</script>