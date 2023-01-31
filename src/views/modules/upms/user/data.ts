import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { getRoleList } from '/@/api/modules/upms/role';
import { isArray, isEmail, isPhone } from '/@/utils/is';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '真实姓名',
    dataIndex: 'realName',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 70,
    customRender: ({ record }) => {
      const status = record.status;
      const color = status ? 'green' : 'red';
      const text = status ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
    customRender: ({ record }) => {
      const list: any[] = [];
      const roles = record.roles;
      if (isArray(roles)) {
        roles.forEach((role) => list.push(h(Tag, { color: 'green' }, () => role.name)));
      }
      return list;
    },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    width: 70,
  },
  {
    title: '电话',
    dataIndex: 'phone',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
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
  {
    field: 'phone',
    label: '电话',
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
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'realName',
    label: '真实姓名',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioGroup',
    defaultValue: false,
    componentProps: {
      options: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '停用',
          value: false,
        },
      ],
    },
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      mode: 'multiple',
      labelField: 'name',
      valueField: 'id',
    },
    required: true,
    itemProps: { validateTrigger: 'blur' },
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
    itemProps: { validateTrigger: 'blur' },
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    rules: [
      {
        required: true,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.reject("邮箱不能为空");
          }
          if (!isEmail(value)) {
            /* eslint-disable-next-line */
            return Promise.reject("邮箱格式不正确");
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'phone',
    label: '电话',
    component: 'Input',
    rules: [
      {
        required: false,
        // @ts-ignore
        validator: async (rule, value) => {
          if (!value) {
            /* eslint-disable-next-line */
            return Promise.resolve();
          }
          if (!isPhone(value)) {
            /* eslint-disable-next-line */
            return Promise.reject("电话格式不正确");
          }
          return Promise.resolve();
        },
        trigger: 'blur',
      },
    ],
  },
  {
    field: 'sex',
    label: '性别',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '男',
          value: '男',
          key: '1',
        },
        {
          label: '女',
          value: '女',
          key: '2',
        },
      ],
    },
  },
];
