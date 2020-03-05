<template>
  <div>
    <el-card class="box-card">
      <ul>
        <li>
          <span>{{data.increment_users}}</span>
          <span>今日新增用户</span>
        </li>
        <li>
          <span>{{data.total_users}}</span>
          <span>总用户量</span>
        </li>
        <li>
          <span class="pink">{{data.increment_questions}}</span>
          <span>新增试题</span>
        </li>
        <li>
          <span class="pink">{{data.total_questions}}</span>
          <span>总试题量</span>
        </li>
        <li>
          <span class="green">{{data.total_done_questions}}</span>
          <span>总刷题量</span>
        </li>
        <li>
          <span class="green">{{data.personal_questions}}</span>
          <span>人均刷题量</span>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card1">
      <div ref="echars" class="echars"></div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
import { overviewTitle, overviewStatistics } from "@/api/overview.js";
export default {
  data() {
    return {
      data: ""
    };
  },
  created() {
    overviewTitle().then(res => {
      // window.console.log(res);
      this.data = res.data.data;
    });
  },
  mounted() {
    var myChart = echarts.init(this.$refs.echars);
    overviewStatistics().then(res => {
      window.console.log(res);
      let arr = res.data.data.map(item => {
        return item.name;
      });
      let option = {
        title: {
          text: "整体数据"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          right: 245,
          data: arr
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["60%", "90%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: res.data.data
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style scoped lang="less">
ul {
  display: flex;
  justify-content: space-around;
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(115, 115, 115, 1);
    span {
      &:nth-child(1) {
        width: 99px;
        height: 99px;
        border-radius: 50%;
        border: 2px solid rgba(0, 134, 250, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        font-size: 25px;
        font-weight: 400;
        color: rgba(0, 134, 250, 1);
      }
      &.pink {
        border: 2px solid rgba(247, 97, 55, 1);
        color: rgba(247, 97, 55, 1);
      }
      &.green {
        border: 2px solid #55cd78;
        color: #55cd78;
      }
    }
  }
}
.echars {
  height: 280px;
}
</style>