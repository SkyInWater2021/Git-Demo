// 单位系统
export const unitSys = {
  requestTime: 1691657042678,
  elapsed: 14,
  data: [
    {
      SYSTEM: '全球气象数据质量评估系统', // 系统
      USERID: 'USR_liuna', // 系统ID
      COMPANY: '国家气象信息中心' // 单位
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      USERID: 'NMIC_ART_P',
      COMPANY: '国家气象信息中心'
    },
    {
      SYSTEM: '中国农业气象业务系统CAgMSS',
      USERID: 'USR_NQZX',
      COMPANY: '国家气象中心(中央气象台)'
    },
    {
      SYSTEM: '面向实况应用的雷达实况产品系统',
      USERID: 'NMIC_RADAR',
      COMPANY: '国家气象信息中心'
    },
    {
      SYSTEM: '国家级气象资料加工处理系统',
      USERID: 'USR_DATAQC',
      COMPANY: '国家气象信息中心'
    },
    {
      SYSTEM: '精细化地面实况融合服务产品加工系统',
      USERID: 'PMSC_PMSC_HRF3KM',
      COMPANY: '中国气象局公共气象服务中心'
    },
    {
      SYSTEM: '国家气象信息中心中试仿真业务平台',
      USERID: 'NMIC_SIM_ADMIN',
      COMPANY: '国家气象信息中心'
    },
    {
      SYSTEM: '基于位置的天气现象融合产品加工系统',
      USERID: 'PMSC_CARAS_WP',
      COMPANY: '中国气象局公共气象服务中心'
    },
    {
      SYSTEM: '基础数据产品生产',
      USERID: 'NMIC_BASE_DATASET',
      COMPANY: '国家气象信息中心'
    },
    {
      SYSTEM: '数值预报业务系统产品制作平台',
      USERID: 'CEMC_OPER_PROD',
      COMPANY: '中国气象局地球系统数值预报中心'
    }
  ],
  responseTime: 1691657042692,
  stateCode: 200,
  message: '请求成功'
}

// 分配的计算资源 userid
export const handleResource = {
  code: '1200',
  message: 'ok',
  extraCode: '1200',
  extraMessage: '请求成功！',
  url: null,
  data: {
    SYSTEM: '快速更新多源融合实况分析系统',
    MEMORY: 2052,
    CPU: 282
  }
}

// 融入算法 userid
export const integrateInto = {
  code: '1200',
  message: 'ok',
  extraCode: '1200',
  extraMessage: '请求成功！',
  url: null,
  data: [
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: '降水融合地面降水预处理',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 576
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: '全国地面降水分析场拼图',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 576
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: 'ART-1km_10min观测数据预处理',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 288
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: '分钟降水传输',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 288
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: '云状类和降水强度类实况分析产品制作',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 144
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: '短时强降水和雷暴大风实况分析产品制作',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 96
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: '海雾多源融合实况产品生成算法',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 96
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: 'CODAS全球洋面风融合产品算法',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 8
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: 'ART-1km_10min背景场数据预处理',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 4
    },
    {
      SYSTEM: '快速更新多源融合实况分析系统',
      ALGO_NAME: 'CODAS全球海表温度逐日融合实况分析算法',
      TRIGGER_TYPES: '定时触发',
      COMPANY: '国家气象信息中心',
      TRIGGER_COUNT: 2
    }
  ]
}

// 融入产品 userid
export const intoproduct = {
  requestTime: '2023-08-10 09:01:54',
  returnCode: '0',
  takeTime: '5.726',
  responseTime: '2023-08-10 09:02:00',
  returnMessage: 'Query Succeed',
  colCount: '6',
  rowCount: '6',
  requestParam:
    'timerange=[20230810000000,20230810230000]&sign=EE58ABE9599533C79853E95A5DF7EA87&apiuserid=NMIC_ART_P&interfaceid=staMusicDataQueryInfoUserCountByTimeRangeAndApiDataCodes&cip=10.40.80.169&pwd=nVqyGfa08!z*&nonce=ea90c284-ec6f-49c8-a4af-cbc296914acc&userid=api_manager&timestamp=1691658116653',
  DS: [
    {
      queryUserCount: 0,
      queryTimes: 0,
      dataSize: '0',
      dataName: '全球极轨卫星数据预处理',
      dataCode: '-',
      serviceId: '-'
    },
    {
      queryUserCount: 0,
      queryTimes: 0,
      dataSize: '0',
      dataName: '全球多卫星集成降水产品',
      dataCode: '-',
      serviceId: '-'
    },
    {
      queryUserCount: 0,
      queryTimes: 0,
      dataSize: '0',
      dataName: '全球极轨卫星降水数据预处理',
      dataCode: '-',
      serviceId: '-'
    },
    {
      queryUserCount: 0,
      queryTimes: 0,
      dataSize: '0',
      dataName: '全球静止卫星预处理',
      dataCode: '-',
      serviceId: '-'
    },
    {
      queryUserCount: 0,
      queryTimes: 0,
      dataSize: '0',
      dataName: 'NAFP_CHN_PROVINCE_DATA',
      dataCode: '-',
      serviceId: '-'
    },
    {
      queryUserCount: 0,
      queryTimes: 0,
      dataSize: '0',
      dataName: '全球多卫星降水集成数据',
      dataCode: '-',
      serviceId: '-'
    }
  ]
}
