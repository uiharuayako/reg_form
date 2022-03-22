<template>
  <div class="home">
    <h1>广告发布区</h1>
    <a-form-model
        ref="ADForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="广告类型" prop="type">
        <a-select v-model="form.type" placeholder="请选择广告类型" :change="typeChange()">
          <a-select-option value="project">
            工程需求广告
          </a-select-option>
          <a-select-option value="company">
            公司承接项目
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item ref="name" :label="nameLabel" prop="name">
        <a-input
            placeholder="请输入名称"
            v-model="form.name"
            @blur="
          () => {
            $refs.name.onFieldBlur();
          }
        "
        />
      </a-form-model-item>
      <a-form-model-item :label="addressLabel" prop="address">
        <a-input v-model="form.address" placeholder="请输入地址">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="位置（大地坐标系）" prop="position">
        <a-input-group compact>
          <a-input
              style=" width: 60px; pointer-events: none; backgroundColor: #fff"
              placeholder="X="
              disabled
          />
          <a-input v-model="form.posX" style="width:20%"></a-input>
          <a-input
              style=" width: 60px; pointer-events: none; backgroundColor: #fff"
              placeholder="Y="
              disabled
          />
          <a-input v-model="form.posY" style="width:20%"></a-input>
        </a-input-group>
      </a-form-model-item>
      <a-form-model-item label="联系人姓名" prop="person">
        <a-input v-model="form.person" placeholder="请输入姓名"></a-input>
      </a-form-model-item>
      <a-form-model-item label="电话号码" prop="telephone">
        <a-input v-model="form.telephone" placeholder="请输入电话" @blur="checkPhoneNumber()"></a-input>
      </a-form-model-item>
      <a-form-model-item label="详细信息" prop="detail">
        <a-input v-model="form.detail" type="textarea"/>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit" :disabled="disableSubmit">
          提交
        </a-button>
        <a-button type="danger" style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <h1>广告展示区</h1>
    <a-list :grid="{ gutter: 16, column: 4 }" :data-source="forms">
      <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
        <a-card :title="item.name" style="min-width: 150px">
          广告类型：{{ item.cntype }}<br>
          名称：{{ item.name }}<br>
          地址：{{ item.address }}<br>
          坐标：X={{ item.posX }},Y={{ item.posY }}<br>
          联系人姓名：{{ item.person }}<br>
          联系电话：{{ item.telephone }}<br>
          详情：{{ item.detail }}<br>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
export default {
  name: 'ADView',
  data() {
    return {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      other: '',
      nameLabel: '工程名称',
      addressLabel: '工程地址',
      disableSubmit: true,
      forms: [],
      form: {
        name: '',
        address: undefined,
        type: 'project',
        cntype: '工程招标广告',
        posX: 114,
        posY: 514,
        person: undefined,
        telephone: undefined,
        detail: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
          {min: 3, max: 55, message: '长度应当在3-55字符之间', trigger: 'blur'},
        ],
        address: [{required: true, message: '请输入地址！', trigger: 'change'},
          {min: 3, max: 55, message: '长度应当在3-55字符之间', trigger: 'blur'},
        ],
        type: [{required: true, message: '请选择一个广告类型', trigger: 'change'}],
        person: [{required: true, message: '请输入联系人姓名'},
          {min: 3, max: 55, message: '长度应当在3-55字符之间', trigger: 'blur'}],
        telephone: [{required: true, message: '请输入电话号码', trigger: 'change'}],
        detail: [{required: true, message: '请输入项目详情', trigger: 'blur'},
          {min: 3, max: 55, message: '长度应当在3-55字符之间', trigger: 'blur'}],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ADForm.validate(valid => {
        if (valid) {
          alert('您的广告已经成功提交捏!');
          this.forms.push(JSON.parse(JSON.stringify(this.form)))
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ADForm.resetFields();
    },
    typeChange() {
      console.log('侦测到广告类型改变');
      if (this.form.type === 'project') {
        this.nameLabel = '工程名称';
        this.addressLabel = '工程地址';
        this.form.cntype = '工程招标广告';
      }
      if (this.form.type === 'company') {
        this.nameLabel = '公司名称';
        this.addressLabel = '公司地址';
        this.form.cntype = '公司招商广告';
      }
    },
    checkPhoneNumber() {
      console.log(this.form.telephone)
      if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/.test(this.form.telephone))) {
        this.disableSubmit = true;
      } else {
        this.disableSubmit = false;
      }
    }
  },
};
</script>
<style>
.home {
  text-align: center;
  margin: 20px auto;
  width: 50%;
  max-width: 850px;
}
</style>