import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    customRender: ({ record }) => {
      return record.principal.id;
    },
    width: 220,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    customRender: ({ record }) => {
      return record.principal.username;
    },
  },
  {
    title: 'Token令牌',
    dataIndex: 'value',
  },
  {
    title: '令牌类型',
    dataIndex: 'tokenType',
    width: 90,
  },
  {
    title: '过期时间',
    dataIndex: 'expiration',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const infoSchema: DescItem[] = [
  {
    field: 'id',
    label: '用户ID',
    render: (_val, data) => {
      return data.principal == undefined ? '' : data.principal.id;
    },
  },
  {
    field: 'username',
    label: '用户名',
    render: (_val, data) => {
      return data.principal == undefined ? '' : data.principal.username;
    },
  },
  {
    field: 'value',
    label: 'Token令牌',
  },
  {
    field: 'tokenType',
    label: '令牌类型',
  },
  {
    field: 'expiration',
    label: '过期时间',
  },
  {
    field: 'scope',
    label: 'Scope',
  },
  {
    field: 'authorities',
    label: '权限标识',
    labelMinWidth: 80,
    // @ts-ignore
    render: (_val, data) => {
      if (data.principal == undefined) {
        return '';
      }
      const list = [];
      data.principal.authorities.forEach((auth) => {
        // @ts-ignore
        list.push(h(Tag, { color: 'green' }, () => auth.authority));
      });
      return list;
    },
  },
];
