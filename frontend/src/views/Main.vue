<template>
  <div>
    <Container>
      <div slot="container-slot" class="text-center">
        <div class="Main-container">
          <p class="h1">
            <span class="text-primary">어떤 동네, 어떤 방</span>에서
          </p>
          <p class="h1">살고 싶으신가요?</p>
          <div class="mt-5 ">
            <form class="w-100 d-flex justify-content-center" @submit.prevent="search">
              <b-form-input
              v-model="keyword"
              class="w-50"
              style="min-height:50px;"
              placeholder="Enter your name"
            ></b-form-input>
            <button class="border-0 bg-primary text-white pl-3 pr-3">방찾기</button>
            </form>
          </div>
        </div>
      </div>
    </Container>
  </div>
</template>

<script>
import Container from "../components/Container";
export default {
  components: {
    Container,
  },
  data(){
    return {
      keyword:""
    }
  },
  methods:{
    search(){
      this.$router.push(`/list?search=${this.keyword}`)
    }
  }
};
</script>

<style>
p {
  margin: 0;
}
.Main-container {
  padding-top: 115px;
  padding-bottom: 113px;
  letter-spacing: -0.8px;
}
</style>
