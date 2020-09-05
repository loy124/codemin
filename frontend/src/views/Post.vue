<template>
  <div class="post-container">
    <PostComponent class="mt-5 ">
      <div slot="posting">
        <div class="text-center border-bottom p-3">위치 정보</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container" style="flex:1">
            주소
          </div>
          <div class="h-100 flex-container border-left" style="flex:10">
            <div
              class="d-flex  w-100 align-items-center justify-content-center"
            >
              <b-form-input
                class="w-50"
                v-model="address"
                placeholder="Enter your name"
              ></b-form-input>
              <b-button variant="primary" @click="getAddress()"
                >주소검색</b-button
              >
            </div>
          </div>
          <div
            ref="map"
            class="h-100  flex-container border-left"
            style="flex:5"
          >
            지도
          </div>
        </div>
      </div>
    </PostComponent>

    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">옵션</div>
        <div class="d-flex">
          <b-form-checkbox-group
            class="w-100"
            v-model="selectedOptions"
            :options="options"
            buttons
            button-variant="primary"
            size="lg"
            name="buttons-2"
          ></b-form-checkbox-group>
        </div>
      </div>
    </PostComponent>

    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">이미지</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container" style="flex:1">주소</div>
          <div class="h-100 flex-container border-left" style="flex:5">
            <!-- <div class="d-flex"> -->
            <b-form-file
              v-model="files"
              multiple
              accept=".jpg, .png, .gif"
            ></b-form-file>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </PostComponent>

    <PostComponent class="mt-5">
      <div slot="posting">
        <div class="text-center border-bottom p-3">내용</div>
        <div class="d-flex" style="height:300px;">
          <div class="h-100 flex-container border-left" style="flex:5">
            <div class="w-75">
              <b-form-input
                class="w-100"
                v-model="title"
                placeholder="제목 "
              ></b-form-input>

              <b-form-textarea
                id="textarea-large"
                size="lg"
                rows="7"
                v-model="content"
                placeholder="내용"
              ></b-form-textarea>
            </div>
          </div>
        </div>
        <b-button @click="writePost" variant="primary" class="mt-3 w-100"
          >작성하기</b-button
        >
      </div>
    </PostComponent>
  </div>
</template>

<script>
import PostComponent from "../components/PostComponent";
import { postApi } from "../utils/axios";
export default {
  components: {
    PostComponent,
  },
  data() {
    return {
      latitude: "",
      longitude: "",
      sample5_address: "",
      address: "",
      sample5_address_zibun: "",
      // locationSearch: "",
      selectedOptions: [], // Must be an array reference!
      options: [
        { text: "세탁기", value: "세탁기" },
        { text: "냉장고", value: "냉장고" },
        { text: "침대", value: "침대" },
        { text: "티비", value: "티비" },
      ],
      title: "",
      content: "",
      files: [],
    };
  },
  mounted() {
    const addressScript = document.createElement("script");
    addressScript.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.head.appendChild(addressScript);
    const mapScript = document.createElement("script");
    mapScript.onload = () => kakao.maps.load();
    mapScript.src =
      "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=0fe1d5fd101ab6d2078168510cdb7237&libraries=services";
    document.head.appendChild(mapScript);
  },
  computed: {},
  methods: {
    getAddress() {
      new daum.Postcode({
        oncomplete: (data) => {
          let mapOption = {
            center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
            level: 6, // 지도의 확대 레벨
          };
          const mapContainer = this.$refs.map;
          const map = new daum.maps.Map(mapContainer, mapOption);
          //주소-좌표 변환 객체를 생성
          let geocoder = new daum.maps.services.Geocoder();
          geocoder.addressSearch(data.address, (results, status) => {
            // 정상적으로 검색이 완료됐으면
            if (status === daum.maps.services.Status.OK) {
              console.log(results);
              // let result = results[0]; //첫번째 결과의 값을 활용
              const { y, x, address_name } = results[0];
              console.log(y, x, address_name);
              // 해당 주소에 대한 좌표를 받아서
              this.address = address_name;
              console.log(this);
              let coords = new daum.maps.LatLng(y, x);
              this.latitude = y;
              this.longitude = x;
              // 지도를 보여준다.
              mapContainer.style.display = "block";
              map.relayout();
              map.setLevel(4);
              // 지도 중심을 변경한다.
              map.setCenter(coords);
              let marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(y, x),
                map: map,
              });
              // 마커를 결과값으로 받은 위치로 옮긴다.
              // marker.setPosition(coords);
            }
          });
        },
      }).open({
        //검색어 넘기기
        popupName: "Room", //이름 설정시 여러개의 팝업 방지
        q: this.address,
      });
    },
    async writePost() {
      const {
        address,
        latitude,
        longitude,
        title,
        content,
        files,
        selectedOptions,
      } = this;
      // 에러처리하기

      const formData = new FormData();
      console.log(files);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      formData.append("address", address);
      selectedOptions.forEach((element) => {
        formData.append("options", element);
      });
      files.forEach((element) => {
        console.log(element);
        formData.append("files", element);
      });
      // formData.append("files", files);
      formData.append("seller_id", sessionStorage.getItem("id"));
      const { data } = await postApi.post(formData);
      if (data.upload) {
        alert("업로드가 완료되었습니다.");
        this.$router.push("/list");
      }
      console.log(data);
    },
  },
};
</script>

<style>
.post-container {
  width: 1180px;
  margin: 40px auto;
}
.flex-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
