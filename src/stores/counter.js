import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useColorStore = defineStore('color', {
  state: () => ({
    colors: {
      buttonHeight: '3rem',
      colorText: 'rgba(0, 0, 0, 0.25)',
      colorTextShadow: 'rgb(29, 28, 28)',
      colorPageBg: '#B9B5AA',
      colorBg: '#899095',
      colorBgLight: '#969DA3',
      colorBgDark: '#7D878F',
      colorOverlayLight: 'rgba(255, 255, 255, .2)',
      colorOverlayMedium: 'rgba(0, 0, 0, .1)',
      colorOverlayDark: 'rgba(0, 0, 0, .2)',
      colorTabFocus: 'rgba(255, 255, 255, .15)',
    },
  }),
});
