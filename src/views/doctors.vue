<script setup>
import { ref, watch, onMounted } from "vue";
    
let doctors = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/doctors", { method: "GET" });
  doctors.value = await res.json();
});

function submitDoctor(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/doctors", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
}

</script>

<template>
  <div id="doctorDiv">
      <form id="doctorForm" @submit="submitDoctor">
          <h5>First Name</h5>
          <input type="text" name="fname" id="fname" class="form-control" required>
          <br>
          <h5>Last Name</h5>
          <input type="text" name="lname" id="lname" class="form-control" required>
          <br>
          <h5>Phone Number</h5>
          <input type="text" name="phone" id="phone" class="form-control" required>
          <br>
          <h5>Specialty</h5>
          <input type="text" name="specialty" id="specialty" class="form-control" required>
          <br>
          <button type="submit" class="btn btn-primary" id="submitdoctor">Submit</button>
      </form>
      <br>
      <br>
      <table class="table" id="doctorTable">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Phone Number</th>
      <th>Specialty</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="doctor in doctors" :key="doctor._id">
        <td>{{doctor.fname}}</td>
        <td>{{doctor.lname}}</td>
        <td>{{doctor.phone}}</td>
        <td>{{doctor.specialty}}</td>
      </tr>
  </tbody>
</table>

  </div>
</template>

<style scoped>
input{
    width: 30%;
    margin-right: 35%;
    margin-left: 35%;
    text-align: center;
}

#nfname, #nlname, #nphone, #nspecialty{
  width: 60%;
  margin-left: 20%;
}

#doctorDiv{
    margin-top: 20px;
    text-align: center;
}

#submitdoctor{
    width: 100px;
}
</style>