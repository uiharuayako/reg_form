<template>
  <div class="user-list">
    <a-list :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }" :data-source="this.userData">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-card :title="item.nickname" align>
          <p class="user-info">
            <b>序号：</b>{{ index + 1 }}<br>
            <b>电话号码：</b><br>+{{ item.prefix }} {{ item.phone }}<br>
            <b>电子邮箱：</b>{{ item.email }}<br>
            <b>是否同意协议：</b>{{ item.agreement }}
          </p>
        </a-card>
      </a-list-item>
    </a-list>
    <a-button @click="getUserData()">获取用户列表JSON</a-button>
  </div>
</template>

<script>

export default {
  name: 'AboutView',
  data() {
    return {
      userData: [],
    };
  },
  methods: {
    getUserData() {
      this.$axios.get('/userListOf5.json').then((res) => {
        this.userData = res.data;
        console.log(res.data)
      }).catch((error) => {
        console.log(error.message)
      });
    }

  }
};
</script>
<style>
.user-info {
  text-align: left;
}

.user-list {
  text-align: center;
  margin: 0 auto;
}
</style>