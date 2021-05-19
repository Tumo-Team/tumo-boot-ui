import { FormSchema } from '/@/components/Form';
import { isEmail, isPhone } from '/@/utils/is';
import { h } from 'vue';
import { Input } from 'ant-design-vue';

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
];

// 基础设置 form
export const baseSetSchemas: FormSchema[] = [
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
    field: 'deptName',
    label: '所属部门',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'rolesName',
    label: '拥有角色',
    component: 'Input',
    render: ({ model, field }) => {
      return h(Input, {
        value: String(model[field]),
        disabled: true,
      });
    },
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
            return Promise.reject('邮箱不能为空');
          }
          if (!isEmail(value)) {
            /* eslint-disable-next-line */
            return Promise.reject('邮箱格式不正确');
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
            return Promise.reject('电话格式不正确');
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

// 安全设置 list
export const secureSettingList: FormSchema[] = [
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    show: false,
  },
];
