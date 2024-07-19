<script>
import { RouterLink } from 'vue-router'
import QuestionaireSetFirst from '../components/QuestionaireSetFirst.vue'
import breadCrum from '../components/breadCrum.vue'
import Header from '../components/Header.vue'
export default {
    components: {
        RouterLink,
        QuestionaireSetFirst,
        breadCrum,
        Header
    }
}
</script>

<template>
<Header />
<!-- <breadCrum /> -->
<div class="Main">
        <breadCrum />
        
    <QuestionaireSetFirst />
</div>
</template>

<style scoped lang="scss">
*{
    border:1px solid black;
    // display: flex;
    // flex-wrap: wrap;
}
.Main{
    width: 90vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    // align-items: center;
}
</style>