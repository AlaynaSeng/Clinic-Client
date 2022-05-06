<script setup>
import { ref, watch, onMounted } from "vue";
    
let appointments = ref([]);
let patients = ref([]);
let doctors = ref([]);

onMounted(async () => {
  let res = await fetch("http://localhost:4000/appointments", { method: "GET" });
  appointments.value = await res.json();
  let pres = await fetch("http://localhost:4000/patients", {method: "GET",});
  patients.value = await pres.json();
  let dres = await fetch("http://localhost:4000/doctors", {method: "GET",});
  doctors.value = await dres.json();
});

function submitAppointment(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch("http://localhost:4000/appointments", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
}

let nameInput = ref(null);
let scheduleInput = ref(null);
let startInput = ref(null);
let endInput = ref(null);
let doctorInput = ref(null);
let patientInput = ref(null);
let IDInput = ref(null);

function editAppointment(appointment){
  nameInput.value.value = appointment.name;
  scheduleInput.value.value = appointment.schedule;
  startInput.value.value = appointment.start.split("T")[0];
  endInput.value.value = appointment.end.split("T")[0];
  doctorInput.value.value = appointment.doctor;
  patientInput.value.value = appointment.patient;
  IDInput.value.value = appointment._id
  let modal = new bootstrap.Modal(document.querySelector('#edit-appointment'));
  modal.show();
}

function updateAppointment(e){
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch(`http://localhost:4000/appointments/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data)
}

async function deleteAppointment(appointment) {
const res = await fetch(
    `http://localhost:4000/appointments/delete/${appointment._id}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  location.reload();
}
</script>

<template>
  <div id="appointmentDiv">
      <form id="appointmentForm" @submit.prevent="submitAppointment">
          <h2>Fill out this form to join a appointment!</h2>
          <br>
          <br>
          <h5>Name</h5>
          <input type="text" name="name" id="name" class="form-control" required>
          <br>
          <h5>Schedule</h5>
          <input type="text" name="schedule" id="schedule" class="form-control" required>
          <br>
          <h5>Start Date</h5>
          <input type="date" name="start" id="start" class="form-control" required>
          <br>
          <h5>End Date</h5>
          <input type="date" name="end" id="end" class="form-control" required>
          <br>
          <h5>doctor</h5>
          <select name="doctor" id="doctor" class="form-control" required >
            <option v-for="(doctor) in doctors" :key="doctor._id" :value="doctor.fname">{{doctor.fname}}</option>
          </select>
          <br>
          <h5>Patient</h5>
          <select name="patient" id="patient" class="form-control" required>
            <option v-for="(patient) in patients" :key="patient._id" :value="patient.fname">{{patient.fname}}</option>
          </select>
          <br>
          <button type="submit" class="btn btn-primary" id="submitappointment">Submit</button>
      </form>
      <br>
      <br>
      <table class="table" id="appointmentTable">
  <thead>
    <tr>
      <th>Name</th>
      <th>Schedule</th>
      <th>Start</th>
      <th>End</th>
      <th>Doctor</th>
      <th>Patient</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
      <tr  v-for="appointment in appointments" :key="appointment._id">
        <td>{{appointment.name}}</td>
        <td>{{appointment.schedule}}</td>
        <td>{{appointment.start.split("T")[0]}}</td>
        <td>{{appointment.end.split("T")[0]}}</td>
        <td>{{appointment.doctor}}</td>
        <td>{{appointment.patient}}</td>
        <td><button type="button" class="btn btn-success" @click.prevent="editAppointment(appointment)">Edit</button></td>
        <td><button type="button" class="btn btn-danger"  @click.prevent="deleteAppointment(appointment)">Delete</button></td>
      </tr>
  </tbody>
</table>

<div class="modal fade" id="edit-appointment" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Appointment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        <div class="modal-body">
      <form id="appointmentUpdateForm" @submit.prevent="updateAppointment">
          <br>
          <h5>Name</h5>
          <input type="text" name="name" id="nname" class="form-control" ref="nameInput" required>
          <br>
          <h5>Schedule</h5>
          <input type="text" name="schedule" id="nschedule" class="form-control" ref="scheduleInput" required>
          <br>
          <h5>Start Date</h5>
          <input type="date" name="start" id="nstart" class="form-control" ref="startInput" required>
          <br>
          <h5>End Date</h5>
          <input type="date" name="end" id="nend" class="form-control" ref="endInput" required>
          <br>
          <h5>Doctor</h5>
          <select name="doctor" id="ndoctor" class="form-control" ref="doctorInput" required >
            <option v-for="(doctor) in doctors" :key="doctor._id" :value="doctor.fname">{{doctor.fname}}</option>
          </select>
          <br>
          <h5>Patient</h5>
          <select name="patient" id="npatient" class="form-control" ref="patientInput" required>
            <option v-for="(patient) in patients" :key="patient._id" :value="patient.fname">{{patient.fname}}</option>
          </select>
          <br>
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
input, select{
    width: 30%;
    margin-right: 35%;
    margin-left: 35%;
    text-align: center;
}

#nname, #nschedule, #nstart, #nend, #ndoctor, #npatient{
  width: 60%;
  margin-left: 20%;
}

#appointmentDiv{
    margin-top: 20px;
    text-align: center;
}

#submitappointment{
    width: 100px;
}
</style>