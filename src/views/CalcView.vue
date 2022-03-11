<template>
  <div class="calcview">
    <h1>这里是计算界面哦</h1>
    <h2>简易计算模式：</h2>
    <a-input-group compact>
      <a-input default-value="1" style="width: 20%" v-model="easyX"/>
      <a-select default-value="+" style="width: 15%" v-model="easyMode">
        <a-select-option value='add'>
          +
        </a-select-option>
        <a-select-option value='minus'>
          -
        </a-select-option>
        <a-select-option value='multiple'>
          x
        </a-select-option>
        <a-select-option value='divide'>
          ÷
        </a-select-option>
      </a-select>
      <a-input default-value="1" style="width: 20%" v-model="easyY"/>
      <a-input
          style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
          placeholder="="
          disabled
      />
      <a-input
          style=" width: 20%; border-left: 0; pointer-events: none; backgroundColor: #fff;text-align: center"
          v-model="easyResult"
      />
    </a-input-group>
    <a-button @click="easyCalc()">简易计算</a-button>
    <br>
    <h2>表达式计算模式：</h2>
    <a-textarea placeholder="键入需要计算的表达式" :rows="4" v-model="evalStr"/>
    <a-button @click="calcEval()">计算表达式</a-button>
    <h4><b>计算结果为：{{ this.evalResult }}</b></h4>
    <h3>表达式计算历史记录</h3>
    <a-list item-layout="horizontal" :data-source="calcHistory" bordered="true">
      <a-list-item slot="renderItem" slot-scope="item, index">
        {{ index + 1 }}:{{ item.eval }}={{ item.answer }}
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import {app} from 'easy_calc_uiharu'

export default {
  name: "CalcView",
  data() {
    return {
      evalStr: '1+1+1',
      evalResult: '3',
      easyResult: '2',
      easyMode: 'add',
      easyX: 1,
      easyY: 1,
      calcHistory: [{eval: '1+1+1', answer: '3'}]
    };
  },
  methods: {
    calcEval() {
      this.evalResult = app.calc(this.evalStr)
      this.calcHistory.push({eval: this.evalStr, answer: this.evalResult})
    },
    easyCalc() {
      console.log(this.easyMode)
      if (this.easyMode == 'add') {
        this.easyResult = app.jia(this.easyX, this.easyY);
      }
      if (this.easyMode == 'minus') {
        this.easyResult = app.jian(this.easyX, this.easyY);
      }
      if (this.easyMode == 'multiple') {
        this.easyResult = app.cheng(this.easyX, this.easyY);
      }
      if (this.easyMode == 'divide') {
        this.easyResult = app.chu(this.easyX, this.easyY);
      }
    }
  }
}
</script>

<style scoped>
.calcview {
  text-align: center;
  width: 50%;
  line-height: 50px;
  max-width: 450px;
  margin: 20px auto;
}
</style>