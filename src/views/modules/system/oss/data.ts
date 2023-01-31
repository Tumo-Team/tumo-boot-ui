import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { uploadListApi } from '/@/api/modules/system/upload';
import { h } from 'vue';
import { BasicUpload } from '/@/components/Upload';

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
    title: '桶路径',
    dataIndex: 'bucket',
    width: 100,
  },
  {
    title: '文件地址',
    dataIndex: 'url',
    ellipsis: true,
    slots: { customRender: 'url' },
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 60,
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
    label: '文件原始名称',
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
    field: 'originName',
    label: '文件名称',
    component: 'Input',
  },
  {
    field: 'url',
    label: '文件地址',
    required: false,
    component: 'Input',
    render: ({ model, field }) => {
      return h(BasicUpload, {
        api: uploadListApi,
        maxSize: 200,
        maxNumber: 1,
        value: [model[field]],
        accept: ['*'],
        onChange: (e: ChangeEvent) => {
          model[field] = e[0];
        },
      });
    },
  },
  {
    field: 'des',
    label: '文件描述',
    component: 'InputTextArea',
  },
];
