<template>
  <div class="hello">
    <p></p>
    <b-img
      src="https://img.freepik.com/free-vector/retro-monochrome-diamond_74855-10844.jpg?w=2000"
      fluid
      alt="Fluid image"
      width="300"
    >
    </b-img>
    <h1>WELCOME TO WEBSHOP</h1>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  position: center;
  margin: 40px;
  font-family: "Courier New", Courier, monospace;
  font-size: 80px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
