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
}

let fnameInput = ref(null);
let lnameInput = ref(null);
let addressInput = ref(null);
let phoneInput = ref(null);
let regInput = ref(null);
let priceInput = ref(null);
let emailInput = ref(null);
let IDInput = ref(null);

function editPatient(patient){
  fnameInput.value.value = patient.fname;
  lnameInput.value.value = patient.lname;
  addressInput.value.value = patient.address;
  phoneInput.value.value = patient.phone;
  priceInput.value.value = patient.price;
  emailInput.value.value = patient.email;
  regInput.value.value = patient.registration.split("T")[0];
  IDInput.value.value = patient._id
  let modal = new bootstrap.Modal(document.querySelector('#edit-patient'));
  modal.show();
}

function updatePatient(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch(`http://localhost:4000/patients/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deletePatient(patient) {
const res = await fetch(
    `http://localhost:4000/patient/delete/${patient._id}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if(res.status == 400){
    alert(`There was an error deleting this patient. Please make sure no appointments under this name exist before continuing.`)
    return
  }
  location.reload();
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
      <h5>Email</h5>
      <input type="text" name="email" id="email" class="form-control" required/>
      <br />
      <h5>Registration Date</h5>
      <input type="date" name="registration" id="registration" class="form-control" required/>
      <br />
      <h5>Price</h5>
      <input type="text" name="price" id="price" class="form-control" required/>
      <br />
      <button type="submit" class="btn btn-primary" id="submitpatient">
        Submit
      </button>
    </form>
    <br />
    <br />
    <table class="table" id="patientTable">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Registration Date</th>
          <th>Price</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient._id">
          <td>{{patient.fname}}</td>
          <td>{{patient.lname}}</td>
          <td>{{patient.address}}</td>
          <td>{{patient.phone}}</td>
          <td>{{patient.email}}</td>
          <td>{{patient.registration.split("T")[0]}}</td>
          <td>{{patient.price}}</td>
          <td><button type="button" class="btn btn-success" @click="editPatient(patient)">Edit</button></td>
          <td><button type="button" class="btn btn-danger" @click="deletePatient(patient)">Delete</button></td>
        </tr>
      </tbody>
    </table>


      <div class="modal fade" id="edit-patient" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update patient</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
      <form id="patientUpdateForm" @submit="updatePatient">
      <br />
      <h5>First Name</h5>
      <input type="text" name="fname" id="nfname" class="form-control" ref="fnameInput" required/>
      <br />
      <h5>Last Name</h5>
      <input type="text" name="lname" id="nlname" class="form-control" ref="lnameInput" required/>
      <br />
      <h5>Address</h5>
      <input type="text" name="address" id="naddress" class="form-control" ref="addressInput" required/>
      <br />
      <h5>Phone Number</h5>
      <input type="text" name="phone" id="nphone" class="form-control" ref="phoneInput" required/>
      <br />
      <h5>Email</h5>
      <input type="text" name="email" id="nemail" class="form-control" ref="emailInput" required/>
      <br />
      <h5>Registration Date</h5>
      <input type="date" name="registration" id="nregistration" class="form-control" ref="regInput" required/>
      <br />
      <h5>Price</h5>
      <input type="text" name="price" id="nprice" class="form-control" ref="priceInput" required/>
      <br />
              <br />
              <input type="hidden" name="_id" id="_id" ref="IDInput">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary" >Save changes</button>
          </div>
            </form>
          </div>
        </div>
        </div>
      </div>
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