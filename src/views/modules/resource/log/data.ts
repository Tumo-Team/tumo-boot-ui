import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '操作用户',
    dataIndex: 'username',
  },
  {
    title: '日志类型',
    dataIndex: 'type',
    width: 100,
    customRender: ({ record }) => {
      const type = record.type;
      const color = type == 1 ? 'green' : 'red';
      const text = type == 1 ? '正常' : '异常';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '操作描述',
    dataIndex: 'operation',
  },
  {
    title: '请求URL',
    dataIndex: 'url',
  },
  {
    title: '耗时(毫秒)',
    dataIndex: 'time',
    width: 90,
  },
  {
    title: 'IP地址',
    dataIndex: 'ip',
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'originName',
    label: '文件名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const infoSchema: DescItem[] = [
  {
    field: 'username',
    label: '操作用户',
  },
  {
    field: 'type',
    label: '日志类型',
  },
  {
    field: 'operation',
    label: '操作描述',
  },
  {
    field: 'url',
    label: '请求URL',
  },
  {
    field: 'time',
    label: '耗时(毫秒)',
  },
  {
    field: 'ip',
    label: 'IP地址',
  },
  {
    field: 'method',
    label: '操作方法',
  },
  {
    field: 'params',
    label: '操作参数',
  },
  {
    field: 'userAgent',
    label: '用户代理',
  },
  {
    field: 'createTime',
    label: '操作时间',
  },
];
