<script>
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink
    }
}
</script>

<template>
    <div class="header">
        <RouterLink to="/">動態問卷</RouterLink>
    </div>

</template>

<style scoped lang="scss">
*{
    box-sizing: border-box;
    border: 1px solid rgb(18, 80, 92);
}

    .header{
        background-color: rgb(212, 247, 253);
        width: 100vw;
        height: 15vh;
    }
</style>