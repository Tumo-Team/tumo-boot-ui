import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '字典类型',
    dataIndex: 'type',
    width: 200,
  },
  {
    title: '字典名称',
    dataIndex: 'name',
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 100,
  },
  {
    title: '是否内置',
    dataIndex: 'isSystem',
    width: 90,
    customRender: ({ record }) => {
      const isSystem = record.isSystem;
      const color = isSystem ? 'green' : 'red';
      const text = isSystem ? '内置' : '非内置';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '字典描述',
    dataIndex: 'des',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'type',
    label: '字典类型',
    component: 'Input',
    required: true,
  },
  {
    field: 'name',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '字典排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'isSystem',
    label: '是否系统内置',
    component: 'RadioButtonGroup',
    defaultValue: 'false',
    required: true,
    componentProps: {
      options: [
        { label: '内置', value: 'true' },
        { label: '非内置', value: 'false' },
      ],
    },
  },
  {
    field: 'des',
    label: '字典描述',
    component: 'Input',
  },
];

export const itemColumns: BasicColumn[] = [
  {
    title: '字典项值',
    dataIndex: 'value',
    width: 80,
  },
  {
    title: '字典项名称',
    dataIndex: 'label',
  },
  {
    title: '字典项类型',
    dataIndex: 'type',
  },
  {
    title: '是否内置',
    dataIndex: 'isSystem',
    width: 90,
    customRender: ({ record }) => {
      const isSystem = record.isSystem;
      const color = isSystem ? 'green' : 'red';
      const text = isSystem ? '内置' : '非内置';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
  },
  {
    title: '描述',
    dataIndex: 'des',
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'dictId',
    label: 'dictId',
    component: 'Input',
    show: false,
  },
  {
    field: 'value',
    label: '字典项值',
    component: 'Input',
    required: true,
  },
  {
    field: 'label',
    label: '字典项名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sort',
    label: '字典项排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'des',
    label: '字典项描述',
    component: 'Input',
  },
];
