<!-- src/components/ScrollingDivs.vue -->
<template>
  <div class="container">
    <div
      v-for="(div, index) in divs"
      :key="index"
      class="scrolling-div"
      :style="{ backgroundColor: div.color, left: div.left, animationDelay: div.delay }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ScrollingDivs',
  data() {
    return {
      divs: this.createDivs()
    }
  },
  methods: {
    createDivs() {
      const numDivs = 50
      const divs = []
      for (let i = 0; i < numDivs; i++) {
        divs.push({
          color: this.getRandomColor(),
          left: `${Math.random() * 100}vw`, 
          delay: `${Math.random() * 10}s`
        })
      }
      return divs
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.scrolling-div {
  position: absolute;
  top: 0px;
  width: 1%;
  height: 10%; 
  animation: scroll 1s linear infinite;
}

@keyframes scroll {
  from {
    top: -100px; 
  }
  to {
    bottom:-500px;
    height: 100%;
  }
}
</style>