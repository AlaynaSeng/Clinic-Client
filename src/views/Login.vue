<script setup>
import { ref, watch, onMounted } from "vue";
import {useRouter} from "vue-router"
let router = useRouter();


let accounts = ref([]);

onMounted(async () => {
  const res = await fetch("http://localhost:4000/accounts", { method: "GET" });
  accounts.value = await res.json();
});

function Login(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  if (data.username == "" || data.password == "") {
    alert("Please complete all forms.");
    return;
  }
  console.log("Accounts: ", accounts.value);
  console.log("Data: ", data)
  for (let i = 0; i < accounts.value.length; i++){
    if (
      accounts.value[i].username == data.username &&
      accounts.value[i].password == data.password &&
      accounts.value[i].type == "admin"
    ) {
      alert("Welcome, Admin!");
      localStorage.setItem("currentAccount", JSON.stringify(accounts[i]));
      router.push("/admin");
      return;
    } else if (
      accounts.value[i].username == data.username &&
      accounts.value[i].password == data.password &&
      accounts.value[i].type == "doctor"
    ) {
      alert("Welcome, Doctor!");
      localStorage.setItem("currentAccount", JSON.stringify(accounts[i]));
      router.push("/doctors");
      return;
    }
     else if (
      accounts.value[i].username == data.username &&
      accounts.value[i].password == data.password &&
      accounts.value[i].type == "patient"
    ) {
      alert("Welcome, Patient!");
      localStorage.setItem("currentAccount", JSON.stringify(accounts[i]));
      router.push("/patients");
      return;
    }
  }
  alert("Your username and/or password is incorrect.");
}


</script>

<template>
  <div id="login">
    <form action="" id="loginForm" @submit.prevent="Login">
      <br>
      <br>
      <h3>Username</h3>
      <input type="text" name="username" id="username" class="form-control">
      <br>
      <br>
      <h3>Password</h3>
      <input type="text" name="password" id="password" class="form-control">
      <br>
      <button type="submit" class="btn btn-outline-secondary">Login</button>
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