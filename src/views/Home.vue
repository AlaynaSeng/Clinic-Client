<script setup>
import { ref, watch } from "vue";


</script>

<template>
  <div id="home">
<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/biking.jpg" class="d-block w-100" alt="" id="bk">
    </div>
    <div class="carousel-item">
      <img src="../assets/tredmil.jpg" class="d-block w-100" alt="" id="tm">
    </div>
    <div class="carousel-item">
      <img src="../assets/weights.jpg" class="d-block w-100" alt="" id="wt">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  </div>
</template>

<style scoped>
#home{
  margin-top: 35px;
  text-align: center;
}

#bk, #tm, #wt{
  height: 850px;
}


</style>