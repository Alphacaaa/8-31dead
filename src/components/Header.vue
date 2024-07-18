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
    .header{
        width: 100dvw;
        height: 100px;
    }
</style>