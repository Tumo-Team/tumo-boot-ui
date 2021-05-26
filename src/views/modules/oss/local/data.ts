import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '文件原始名称',
    dataIndex: 'originName',
  },
  {
    title: '文件存储名称',
    dataIndex: 'targetName',
    width: 180,
  },
  {
    title: '文件地址',
    dataIndex: 'url',
    ellipsis: true,
    slots: { customRender: 'url' },
  },
  {
    title: '文件类型',
    dataIndex: 'type',
    width: 90,
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    width: 90,
  },
  {
    title: '文件描述',
    dataIndex: 'des',
  },
  {
    title: '创建时间',
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

export const userFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    show: false,
  },
  {
    field: 'originName',
    label: '文件名称',
    component: 'Input',
  },
  {
    field: 'des',
    label: '文件描述',
    component: 'InputTextArea',
  },
];
