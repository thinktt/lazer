<template>
  <div class="greeting">
    <transition 
      appear 
      enter-active-class="animated bounceInDown" 
      leave-active-class="animated bounceOut"
      mode="out-in">
        <h1 v-if="show">{{greeting}}</h1>
    </transition>
    <!-- <button @click="showGreeting">Show Greeting</button> -->
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      greeting: 'Howdy!',
      show: true
    }
  },
  methods: {
    showGreeting: function() {
      this.show = !this.show; 
    }
  }
}

console.log("I'm in the template!")
</script>

<style local>

.greeting {
  display: flex;
  justify-content: center;
  align-items: center; 
  height: 20rem;
  background-color: antiquewhite;
  margin: 5rem;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.greeting h1 {
  font-size: 6rem;
}
  
</style>



