import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';

export const columns: BasicColumn[] = [
  {
    title: '菜单名称',
    dataIndex: 'name',
    width: 200,
    align: 'left',
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    width: 100,
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return isMenu(record.type) ? h(Icon, { icon: record.meta.icon }) : '';
    },
  },
  {
    title: '权限标识',
    dataIndex: 'perms',
    width: 180,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
  },
  {
    title: '路由地址',
    dataIndex: 'path',
  },
  {
    title: '排序',
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'disabled',
    width: 80,
    customRender: ({ record }) => {
      const isDisabled = record.disabled;
      const enable = ~~isDisabled === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return isMenu(record.type) ? h(Tag, { color: color }, () => text) : '';
    },
  },
];

const isMenu = (type: string) => type === 'menu';
const isButton = (type: string) => type === 'button';
const isExt = (type: string) => type === 'true';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isDisabled',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 'false' },
        { label: '停用', value: 'true' },
      ],
    },
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
    label: '菜单类型',
    component: 'RadioButtonGroup',
    defaultValue: 'menu',
    componentProps: {
      options: [
        { label: '菜单', value: 'menu' },
        { label: '按钮', value: 'button' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'name',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      replaceFields: {
        title: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'orderNo',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: '图标',
    component: 'IconPicker',
    required: ({ values }) => !isButton(values.type),
    show: ({ values }) => !isButton(values.type),
  },
  {
    field: 'path',
    label: '路由地址',
    component: 'Input',
    required: ({ values }) => !isButton(values.type),
    show: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: '组件路径',
    component: 'Input',
    dynamicDisabled: ({ values }) => isExt(values.isExt),
    required: ({ values }) => isExt(values.isExt) && isMenu(values.type),
    show: ({ values }) => isMenu(values.type),
  },
  {
    field: 'perms',
    label: '权限标识',
    component: 'Input',
  },
  {
    field: 'isDisabled',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 'false',
    componentProps: {
      options: [
        { label: '启用', value: 'false' },
        { label: '禁用', value: 'true' },
      ],
    },
  },
  {
    field: 'isExt',
    label: '是否外链',
    component: 'RadioButtonGroup',
    defaultValue: 'false',
    componentProps: {
      options: [
        { label: '否', value: 'false' },
        { label: '是', value: 'true' },
      ],
    },
    show: ({ values }) => !isButton(values.type),
  },
  {
    field: 'isKeepalive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: 'true',
    componentProps: {
      options: [
        { label: '否', value: 'false' },
        { label: '是', value: 'true' },
      ],
    },
    show: ({ values }) => isMenu(values.type),
  },

  {
    field: 'isShow',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: 'true',
    componentProps: {
      options: [
        { label: '否', value: 'false' },
        { label: '是', value: 'true' },
      ],
    },
    show: ({ values }) => !isButton(values.type),
  },
];
