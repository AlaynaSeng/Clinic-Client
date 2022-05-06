<script setup>
import { ref, watch, onMounted } from "vue";
    
let instructors = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/instructor", { method: "GET" });
  instructors.value = await res.json();
});

function submitInstructor(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/instructor", {
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
let specialtyInput = ref(null);
let IDInput = ref(null);

function editInstructor(instructor){
  fnameInput.value.value = instructor.fname;
  lnameInput.value.value = instructor.lname;
  addressInput.value.value = instructor.address;
  phoneInput.value.value = instructor.phone;
  specialtyInput.value.value = instructor.specialty;
  IDInput.value.value = instructor._id
  let modal = new bootstrap.Modal(document.querySelector('#edit-instructor'));
  modal.show();
}

function updateInstructor(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch(`http://localhost:4000/instructor/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deleteInstructor(instructor) {
const res = await fetch(
    `http://localhost:4000/instructor/delete/${instructor._id}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if(res.status == 400){
    alert(`There was an error deleting this instructor. Please make sure no classes under this name exist before continuing.`)
    return
  }
  location.reload();
}
</script>

<template>
  <div id="instructorDiv">
      <form id="instructorForm" @submit="submitInstructor">
          <h2>Fill out this instructors' form to become official!</h2>
          <br>
          <br>
          <h5>First Name</h5>
          <input type="text" name="fname" id="fname" class="form-control" required>
          <br>
          <h5>Last Name</h5>
          <input type="text" name="lname" id="lname" class="form-control" required>
          <br>
          <h5>Address</h5>
          <input type="text" name="address" id="address" class="form-control" required>
          <br>
          <h5>Phone Number</h5>
          <input type="text" name="phone" id="phone" class="form-control" required>
          <br>
          <h5>Specialty</h5>
          <input type="text" name="specialty" id="specialty" class="form-control" required>
          <br>
          <button type="submit" class="btn btn-primary" id="submitInstructor">Submit</button>
      </form>
      <br>
      <br>
      <table class="table" id="instructorTable">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Address</th>
      <th>Phone Number</th>
      <th>Specialty</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="instructor in instructors" :key="instructor._id">
        <td>{{instructor.fname}}</td>
        <td>{{instructor.lname}}</td>
        <td>{{instructor.address}}</td>
        <td>{{instructor.phone}}</td>
        <td>{{instructor.specialty}}</td>
        <td><button type="button" class="btn btn-success" @click="editInstructor(instructor)">Edit</button></td>
        <td><button type="button" class="btn btn-danger" @click="deleteInstructor(instructor)">Delete</button></td>
      </tr>
  </tbody>
</table>


      <div class="modal fade" id="edit-instructor" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Instructor</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
      <form id="instructorUpdateForm" @submit="updateInstructor">
      <br />
          <h5>First Name</h5>
          <input type="text" name="fname" id="nfname" class="form-control" ref="fnameInput" required>
          <br>
          <h5>Last Name</h5>
          <input type="text" name="lname" id="nlname" class="form-control" ref="lnameInput" required>
          <br>
          <h5>Address</h5>
          <input type="text" name="address" id="naddress" class="form-control" ref="addressInput" required>
          <br>
          <h5>Phone Number</h5>
          <input type="text" name="phone" id="nphone" class="form-control" ref="phoneInput" required>
          <br>
          <h5>Specialty</h5>
          <input type="text" name="specialty" id="nspecialty" class="form-control" ref="specialtyInput" required>
              <br />
              <br />
              <input type="hidden" name="_id" id="_id" ref="IDInput">
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
            </form>
          </div>
        </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
input{
    width: 30%;
    margin-right: 35%;
    margin-left: 35%;
    text-align: center;
}

#nfname, #nlname, #naddress,#nphone, #nspecialty{
  width: 60%;
  margin-left: 20%;
}

#instructorDiv{
    margin-top: 20px;
    text-align: center;
}

#submitInstructor{
    width: 100px;
}
</style>