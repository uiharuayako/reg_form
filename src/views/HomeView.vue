<template>
  <div class="home">
    <h1>简简单单的注册页面捏</h1>
    <h2>当前注册人数： <b>{{ this.userList.length }}</b></h2>
    <a-form :form="form" @submit="handleSubmit" class="my-form">
      <a-form-item v-bind="formItemLayout" label="用户名">
        <a-input
            v-decorator="[
          'nickname',
          {
            rules: [{ required: true, message: '请输入您的用户名！', whitespace: true }],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码" has-feedback>
        <a-input
            v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: '请输入您的密码！',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
            type="password"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="确认密码" has-feedback>
        <a-input
            v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: '请再次输入您的密码！',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
            type="password"
            @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="邮箱">
        <a-input
            v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: '请输入有效邮箱！',
              },
              {
                required: true,
                message: '请输入您的邮箱！',
              },
            ],
          },
        ]"
        />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="电话号码">
        <a-input
            v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入你的电话号码！' }],
          },
        ]"
            style="width: 100%"
        >
          <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
          >
            <a-select-option value="86">
              +86
            </a-select-option>
            <a-select-option value="87">
              +87
            </a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
          我已经认真阅读并且完全理解了
          <a href="https://ff.web.sdo.com/web8/index.html#/newstab/newscont/217463">
            很长很长的用户协议
          </a>
        </a-checkbox>
      </a-form-item>
      <a-form-item v-bind="tailFormItemLayout"  class="-buttons">
        <a-button type="primary" html-type="submit">
          注册
        </a-button>
        <a-button @click="downloadList()" :disabled="disableDL">
          下载
        </a-button>
        <a-button type="danger" onclick="location.reload()">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import fs from "file-saver"
export default {
  name: 'HomeView',
  data() {
    return {
      userList:[],
      disableDL:true,
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: {span: 24,offset:-8},
          sm: {span: 8},
        },
        wrapperCol: {
          xs: {span: 24,offset:-4},
          sm: {span: 16},
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 1,
          },
          sm: {
            span: 16,
            offset: 4,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, {name: 'register'});
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('收到提交的注册表单: ', values);
          delete values.confirm;
          this.userList.push(values);
          this.disableDL=false;
        }
      });
    },
    downloadList(){
      console.log("开始下载！")
      const listBlob=new Blob([JSON.stringify(this.userList)], {type: "text/plain;charset=utf-8"});
      fs.saveAs(listBlob,"userListOf"+this.userList.length+".json")
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入的密码不同！');
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], {force: true});
      }
      callback();
    },
  },
};
</script>
<style>
.home {
  text-align: center;
  margin: 20px auto;
  width:50%;
  max-width: 450px;
}
</style>