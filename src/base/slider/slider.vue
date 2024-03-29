<template>
  <div class="slide" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        class="dot"
        :class="{active: currentPageIndex === index }"
        v-for="(item, index) in dots" :key="index"
      ></span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BScroll from "better-scroll";

export default {
  name: "slider",
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();

      if (this.autoPlay) {
        this._play();
      }
    }, 20);

    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  activated() {
    if (this.autoPlay) {
      this._play();
    }
    //切换路由时 当keep-alive 组件激活时调用。
  },
  deactivated() {
    clearTimeout(this.timer);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      });

      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;

        this.currentPageIndex = pageIndex;

        if (this.autoPlay) {
          this._play();
        }
      });

      this.slider.on("beforeScrollStart", () => {
        if (this.autoPlay) {
          clearTimeout(this.timer);
        }
      });
    },
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      if (pageIndex >= this.dots.length) {
        pageIndex = 0;
      }
      this.timer = setTimeout(() => {
        if (this.loop) {
          this.slider.next();
        } else {
          this.slider.goToPage(pageIndex, 0, 400);
        }
      }, this.interval);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/css/variable";
.slide {
  position: relative;
  .slider-group {
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      float: left;
      overflow: hidden;
      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>