<script setup>
import { ref, watch, onMounted } from "vue";
    
let patients = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/patients", { method: "GET" });
  patients.value = await res.json();
});

function submitPatient(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/patients", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
  alert("You have successully created your patient profile! If there is a problem with your profile, please contact admin to have the issue resolved.")
}


</script>

<template>
  <div id="patientDiv">
    <form id="patientForm" @submit="submitPatient">
      <h2>Fill out this form to become an official member!</h2>
      <br />
      <br />
      <h5>First Name</h5>
      <input type="text" name="fname" id="fname" class="form-control" required/>
      <br />
      <h5>Last Name</h5>
      <input type="text" name="lname" id="lname" class="form-control" required/>
      <br />
      <h5>Address</h5>
      <input type="text" name="address" id="address" class="form-control" required/>
      <br />
      <h5>Phone Number</h5>
      <input type="text" name="phone" id="phone" class="form-control" required/>
      <br />
      <h5>Sex</h5>
      <select name="sex" id="sex" ref="sexInput">
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      <br>
      <br />
      <h5>DOB</h5>
      <input type="date" name="dob" id="dob" class="form-control" required/>
      <br />
      <h5>Zip</h5>
      <input type="number" name="zip" id="zip" class="form-control" required/>
      <br />
      <button type="submit" class="btn btn-primary" id="submitpatient">
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
input {
  width: 30%;
  margin-right: 35%;
  margin-left: 35%;
  text-align: center;
}

#patientDiv {
  margin-top: 20px;
  text-align: center;
}
#nfname, #nlname, #naddress,#nphone, #nemail, #nregistration, #nprice{
  width: 60%;
  margin-left: 20%;
}

#submitpatient {
  width: 100px;
}
</style>