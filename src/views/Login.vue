<script setup>
import { ref, watch } from "vue";



</script>

<template>
  <div id="login">
    <form action="" id="loginForm">
      <br>
      <br>
      <h3>Username</h3>
      <input type="text" id="username" class="form-control">
      <br>
      <br>
      <h3>Password</h3>
      <input type="text" id="password" class="form-control">
      <br>
      <button type="button" class="btn btn-outline-secondary">Login</button>
    </form>
  </div>
</template>

<style scoped>
#login{
  margin-top: 35px;
  text-align: center;
}

input{
  width: 20%;
  margin-left: 40%;
}

h3{
  font-family: sans-serif;
}

button{
  padding: 10px;
  width: 150px;
  font-size: larger;
}

</style>