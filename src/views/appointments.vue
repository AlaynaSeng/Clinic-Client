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
  for(let i = 0; i < appointments.value.length; i++){
    if(data.time == appointments.value[i].time && data.date == appointments.value[i].date.split("T")[0]){
      alert("That time and date are booked, please select the next available appointment");
      return;
    }
  }

  fetch("http://localhost:4000/appointments", {
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
  <div id="appointmentDiv">
      <form id="appointmentForm" @submit="submitAppointment">
          <h5>Status</h5>
          <select name="status" id="status" class="form-control">
            <option value="Opened">Opened</option>
            <option value="Closed">Closed</option>
            <option value="Delayed">Delayed</option>
            <option value="Missed">Missed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <br>
          <h5>Location</h5>
          <input type="text" name="location" id="location" class="form-control" required>
          <br>
          <h5>Date</h5>
          <input type="date" name="date" id="date" class="form-control" required>
          <br>
          <h5>Time</h5>
              <select name="time" id="time" class="form-control">
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
          <br>
          <h5>Doctor</h5>
          <select name="doctor" id="doctor" class="form-control" required>
            <option v-for="(doctor) in doctors" :key="doctor._id" :value="doctor.lname">{{doctor.lname}}</option>
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
      <th>Status</th>
      <th>Location</th>
      <th>Date</th>
      <th>Time</th>
      <th>Doctor</th>
      <th>Patient</th>
    </tr>
  </thead>
  <tbody>
      <tr  v-for="appointment in appointments" :key="appointment._id">
        <td>{{appointment.status}}</td>
        <td>{{appointment.location}}</td>
        <td>{{appointment.date.split("T")[0]}}</td>
        <td>{{appointment.time}}</td>
        <td>{{appointment.doctor}}</td>
        <td>{{appointment.patient}}</td>
      </tr>
  </tbody>
</table>

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