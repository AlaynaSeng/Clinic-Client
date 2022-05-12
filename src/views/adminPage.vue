<script setup>
import { ref, watch, onMounted, computed } from "vue";

let appointments = ref([]);
let patients = ref([]);
let doctors = ref([]);
let accounts = ref([]);
let drSearch = ref("");
let patsSearch = ref("");
let appSearch = ref("");

let filterDrs = computed(() => {
  return doctors.value.filter((doctor) =>
    doctor.lname.includes(drSearch.value)
  );
});

let filterPats = computed(() => {
  return patients.value.filter((patient) =>
    patient.lname.includes(patsSearch.value)
  );
});

let filterApps = computed(() => {
  return appointments.value.filter(
    (appointment) =>
      appointment.doctor.includes(appSearch.value) ||
      appointment.patient.includes(appSearch.value) ||
      appointment.status.includes(appSearch.value)
  );
});

onMounted(async () => {
  let res = await fetch("http://localhost:4000/appointments", {
    method: "GET",
  });
  appointments.value = await res.json();
  let pres = await fetch("http://localhost:4000/patients", { method: "GET" });
  patients.value = await pres.json();
  let dres = await fetch("http://localhost:4000/doctors", { method: "GET" });
  doctors.value = await dres.json();
  console.log(doctors.value);
  let ares = await fetch("http://localhost:4000/accounts", { method: "GET" });
  accounts.value = await ares.json();
});

let usernameInput = ref(null);
let passwordInput = ref(null);
let typeInput = ref(null);
let acIDInput = ref(null);

function editAccount(account) {
  usernameInput.value.value = account.username;
  passwordInput.value.value = account.password;
  typeInput.value.value = account.type;
  acIDInput.value.value = account._id;
  let modal = new bootstrap.Modal(document.querySelector("#edit-account"));
  modal.show();
}

function updateAccount(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch(`http://localhost:4000/accounts/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
}

let pfnameInput = ref(null);
let plnameInput = ref(null);
let paddressInput = ref(null);
let pphoneInput = ref(null);
let sexInput = ref(null);
let zipInput = ref(null);
let dobInput = ref(null);
let pIDInput = ref(null);

function editPatient(patient) {
  pfnameInput.value.value = patient.fname;
  plnameInput.value.value = patient.lname;
  paddressInput.value.value = patient.address;
  pphoneInput.value.value = patient.phone;
  sexInput.value.value = patient.sex;
  zipInput.value.value = patient.zip;
  dobInput.value.value = patient.dob.split("T")[0];
  pIDInput.value.value = patient._id;
  let modal = new bootstrap.Modal(document.querySelector("#edit-patient"));
  modal.show();
}

function updatePatient(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch(`http://localhost:4000/patients/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
}

async function deletePatient(patient) {
  const res = await fetch(
    `http://localhost:4000/patients/delete/${patient._id}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if (res.status == 400) {
    alert(
      `There was an error deleting this patient. Please make sure no appointments under this name exist before continuing.`
    );
    return;
  }
  location.reload();
}

let statusInput = ref(null);
let locationInput = ref(null);
let dateInput = ref(null);
let timeInput = ref(null);
let doctorInput = ref(null);
let patientInput = ref(null);
let aIDInput = ref(null);

function editAppointment(appointment) {
  statusInput.value.value = appointment.status;
  locationInput.value.value = appointment.location;
  dateInput.value.value = appointment.date.split("T")[0];
  timeInput.value.value = appointment.time;
  doctorInput.value.value = appointment.doctor;
  patientInput.value.value = appointment.patient;
  aIDInput.value.value = appointment._id;
  let modal = new bootstrap.Modal(document.querySelector("#edit-appointment"));
  modal.show();
}

function updateAppointment(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  for (let i = 0; i < appointments.value[i].length; i++) {
    if (
      data.time == appointments.value[i].time &&
      data.date == appointments.value[i].date.split("T")[0] &&
      data._id != appointments.value[i]._id
    ) {
      alert(
        "That time and date are book, please select the next available appointment"
      );
      return;
    }
  }
  fetch(`http://localhost:4000/appointments/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
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

let dfnameInput = ref(null);
let dlnameInput = ref(null);
let dphoneInput = ref(null);
let specialtyInput = ref(null);
let dIDInput = ref(null);

function editDoctor(doctor) {
  dfnameInput.value.value = doctor.fname;
  dlnameInput.value.value = doctor.lname;
  dphoneInput.value.value = doctor.phone;
  specialtyInput.value.value = doctor.specialty;
  dIDInput.value.value = doctor._id;
  let modal = new bootstrap.Modal(document.querySelector("#edit-doctor"));
  modal.show();
}

function updateDoctor(e) {
  let form = e.target;
  let data = Object.fromEntries(new FormData(form));
  fetch(`http://localhost:4000/doctors/update/${data._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
}

async function deleteDoctor(doctor) {
  const res = await fetch(
    `http://localhost:4000/doctors/delete/${doctor._id}`,
    {
      method: "Delete",
      headers: { "content-type": "application/json" },
    }
  );
  if (res.status == 400) {
    alert(
      `There was an error deleting this doctor. Please make sure nothing under this name exists before continuing.`
    );
    return;
  }
  location.reload();
}
</script>

<template>
  <div id="adminDiv">
    <br />
    <br />
    <div id="accDiv">
      <table class="table" id="accountTable">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>Type</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account._id">
            <td>{{ account.username }}</td>
            <td>{{ account.password }}</td>
            <td>{{ account.type }}</td>
            <td>
              <button
                type="button"
                class="btn btn-success"
                @click="editAccount(account)"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <br />
    <br />

    <div id="patDiv">
      <input
        type="text"
        v-model="patsSearch"
        class="form-control"
        placeholder="Search Patients by Last Name"
      />
      <br />
      <br />
      <table class="table" id="patientTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Sex</th>
            <th>DOB</th>
            <th>Zip</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in filterPats" :key="patient._id">
            <td>{{ patient.fname }}</td>
            <td>{{ patient.lname }}</td>
            <td>{{ patient.address }}</td>
            <td>{{ patient.phone }}</td>
            <td>{{ patient.sex }}</td>
            <td>{{ patient.dob.split("T")[0] }}</td>
            <td>{{ patient.zip }}</td>
            <td>
              <button
                type="button"
                class="btn btn-success"
                @click="editPatient(patient)"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deletePatient(patient)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <br />
    <br />

    <div id="drDiv">
      <input
        type="text"
        v-model="drSearch"
        class="form-control"
        placeholder="Search Drs by Last Name"
      />
      <br />
      <br />
      <table class="table" id="doctorTable">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Specialty</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in filterDrs" :key="doctor._id">
            <td>{{ doctor.fname }}</td>
            <td>{{ doctor.lname }}</td>
            <td>{{ doctor.phone }}</td>
            <td>{{ doctor.specialty }}</td>
            <td>
              <button
                type="button"
                class="btn btn-success"
                @click="editDoctor(doctor)"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteDoctor(doctor)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <br />
    <br />

    <div id="appDiv">
      <input
        type="text"
        v-model="appSearch"
        class="form-control"
        placeholder="Search Appointments by Drs, Patients, or Status"
      />
      <br />
      <br />

      <table class="table" id="appointmentTable">
        <thead>
          <tr>
            <th>Status</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in filterApps" :key="appointment._id">
            <td>{{ appointment.status }}</td>
            <td>{{ appointment.location }}</td>
            <td>{{ appointment.date.split("T")[0] }}</td>
            <td>{{ appointment.time }}</td>
            <td>{{ appointment.doctor }}</td>
            <td>{{ appointment.patient }}</td>
            <td>
              <button
                type="button"
                class="btn btn-success"
                @click="editAppointment(appointment)"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-danger"
                @click="deleteAppointment(appointment)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="modal fade"
      id="edit-account"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Account</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="accountUpdateForm" @submit="updateAccount">
              <br />
              <h5>Username</h5>
              <input
                type="text"
                name="username"
                id="usernmae"
                class="form-control"
                ref="usernameInput"
                required
              />
              <br />
              <h5>Password</h5>
              <input
                type="text"
                name="password"
                id="password"
                class="form-control"
                ref="passwordInput"
                required
              />
              <br />
              <h5>Type</h5>
              <input
                type="text"
                name="type"
                id="type"
                class="form-control"
                ref="typeInput"
                disabled
              />
              <br />
              <br />
              <input type="hidden" name="_id" id="_id" ref="acIDInput" />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="edit-patient"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Patient</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="patientUpdateForm" @submit="updatePatient">
              <br />
              <h5>First Name</h5>
              <input
                type="text"
                name="fname"
                id="nfname"
                class="form-control"
                ref="pfnameInput"
                required
              />
              <br />
              <h5>Last Name</h5>
              <input
                type="text"
                name="lname"
                id="nlname"
                class="form-control"
                ref="plnameInput"
                required
              />
              <br />
              <h5>Address</h5>
              <input
                type="text"
                name="address"
                id="naddress"
                class="form-control"
                ref="paddressInput"
                required
              />
              <br />
              <h5>Phone Number</h5>
              <input
                type="text"
                name="phone"
                id="nphone"
                class="form-control"
                ref="pphoneInput"
                required
              />
              <br />
              <h5>Sex</h5>
              <select name="sex" id="sex" ref="sexInput">
                <option value="M">M</option>
                <option value="F">F</option>
              </select>
              <br />
              <h5>DOB</h5>
              <input
                type="date"
                name="dob"
                id="ndob"
                class="form-control"
                ref="dobInput"
                required
              />
              <br />
              <h5>Zip</h5>
              <input
                type="text"
                name="zip"
                id="nzip"
                class="form-control"
                ref="zipInput"
                required
              />
              <br />
              <br />
              <input type="hidden" name="_id" id="_id" ref="pIDInput" />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="edit-appointment"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Update Appointment
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="appointmentUpdateForm" @submit="updateAppointment">
              <br />
              <h5>Status</h5>
              <select
                name="status"
                id="status"
                class="form-control"
                ref="statusInput"
              >
                <option value="Opened">Opened</option>
                <option value="Closed">Closed</option>
                <option value="Delayed">Delayed</option>
                <option value="Missed">Missed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <br />
              <h5>Location</h5>
              <input
                type="text"
                name="location"
                id="location"
                class="form-control"
                required
                ref="locationInput"
              />
              <br />
              <h5>Date</h5>
              <input
                type="date"
                name="date"
                id="date"
                class="form-control"
                required
                ref="dateInput"
              />
              <br />
              <h5>Time</h5>
              <select
                name="time"
                id="time"
                class="form-control"
                ref="timeInput"
              >
                <option value="7:00 AM">7:00 AM</option>
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="8:00 PM">8:00 PM</option>
              </select>
              <br />
              <h5>Doctor</h5>
              <select
                name="doctor"
                id="doctor"
                class="form-control"
                required
                ref="doctorInput"
              >
                <option
                  v-for="doctor in doctors"
                  :key="doctor._id"
                  :value="doctor.lname"
                >
                  {{ doctor.lname }}
                </option>
              </select>
              <br />
              <h5>Patient</h5>
              <select
                name="patient"
                id="patient"
                class="form-control"
                required
                ref="patientInput"
              >
                <option
                  v-for="patient in patients"
                  :key="patient._id"
                  :value="patient.fname"
                >
                  {{ patient.fname }}
                </option>
              </select>
              <br />
              <input type="hidden" name="_id" id="_id" ref="aIDInput" />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="edit-doctor"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Update Doctor</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="doctorUpdateForm" @submit="updateDoctor">
              <br />
              <h5>First Name</h5>
              <input
                type="text"
                name="fname"
                id="nfname"
                class="form-control"
                ref="dfnameInput"
                required
              />
              <br />
              <h5>Last Name</h5>
              <input
                type="text"
                name="lname"
                id="nlname"
                class="form-control"
                ref="dlnameInput"
                required
              />
              <br />
              <h5>Phone Number</h5>
              <input
                type="text"
                name="phone"
                id="nphone"
                class="form-control"
                ref="dphoneInput"
                required
              />
              <br />
              <h5>Specialty</h5>
              <input
                type="text"
                name="specialty"
                id="nspecialty"
                class="form-control"
                ref="specialtyInput"
                required
              />
              <br />
              <br />
              <input type="hidden" name="_id" id="_id" ref="dIDInput" />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input,
select {
  width: 30%;
  margin-right: 35%;
  margin-left: 35%;
  text-align: center;
}

#patientDiv {
  margin-top: 20px;
  text-align: center;
}

form {
  text-align: center;
}

#submitpatient {
  width: 100px;
}

table {
  width: 95%;
  margin-left: 2.5%;
  border: grey 0.5px dashed;
  border-bottom: grey 0.5px dashed;
}
</style>