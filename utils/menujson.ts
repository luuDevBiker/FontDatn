import {
    HomeOutlined,
    RiseOutlined,
    CheckCircleOutlined,
    UserOutlined,
    ProfileOutlined,
    SettingOutlined,
    CrownOutlined,
    PercentageOutlined,
    WalletOutlined
  } from '@ant-design/icons';

//   const roleAll = [Roles.ADMIN, Roles.CEO, Roles.EMPLOYEES, Roles.MANAGER, Roles.INTERNAL_CONTROL, Roles.ADMINISTRATOR]
//   const rolePersonal = [Roles.ADMINISTRATOR,Roles.ADMIN, Roles.CEO, Roles.EMPLOYEES, Roles.MANAGER, Roles.INTERNAL_CONTROL,Roles.USERS]
  
  export const menuWareHouse = [
    {
      name: 'dashboard',
      label: 'Dashboard',
      icon: HomeOutlined,
      path: '/cms/cms-dashboard',
    //   roles: roleAll,
      childrens: [],
    },
    {
      name: 'product',
      label: 'Sản phẩm',
      icon: RiseOutlined,
      path: `/cms/cms-products`,
    //   roles: roleAll,
      childrens: [],
    },
    {
      name: 'oder',
      label: 'Đơn hàng',
      icon: WalletOutlined,
      path: `/cms/cms-oder`,
    //   roles: roleAll,
      childrens: [],
    },
    {
      name: 'employee',
      label: 'Nhân viên',
      icon: UserOutlined,
      path: `/cms/cms-employees`,
    //   roles: roleAll,
      childrens: [],
    },
    {
      name: 'customer',
      label: 'Khách hàng',
      icon: CheckCircleOutlined,
      // path: 'kpi',
    //   roles: roleAll,
      childrens: [
        {
          name: 'warehouse',
          label: 'Nhập kho',
          path: '/kpi/library-kpi',
        //   roles: [Roles.ADMIN, Roles.CEO, Roles.MANAGER, Roles.INTERNAL_CONTROL, Roles.ADMINISTRATOR,],
        },
        {
          name: 'list-kpi',
          label: 'Tồn kho',
          path: '/kpi/list-kpi',
        //   roles: roleAll,
        },
      ],
    },
    {
      name: 'nhan-vien',
      label: 'Nhập kho',
      icon: UserOutlined,
      path: `/cms/cms-warehouse`,
    //   roles: roleAll,
      
    },
    {
      name: 'dis-count',
      label: 'Discount',
      icon: PercentageOutlined,
      path: '/cms/cms-discount',
    //   roles: roleAll,
      childrens: [],
    },
    {
      name: 'cai-dat',
      label: 'Cài đặt',
      icon: SettingOutlined,
      path: 'cai_dat',
    //   roles: roleAll,
      childrens: [],
    },
  ];
  
  export const menuPersonal = [
    {
      name: 'pet',
      label: 'Pet',
      // icon: SettingOutlined,
      path: '/home',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'treats',
      label: 'Treats',
      // icon: CrownOutlined,
      path: '/personal/service-pack',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'toys',
      label: 'Toys',
      // icon: SettingOutlined,
      path: '/personal/enterprisess',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'pethealth',
      label: 'Pet Health',
      // icon: SettingOutlined,
      path: '/personal/enterprise',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'contactUs',
      label: 'Contact Us',
      // icon: SettingOutlined,
      path: '/personal/enterprisedf',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'contactUs',
      label: 'Blog',
      // icon: SettingOutlined,
      path: '/blog',
    //   roles: rolePersonal,
      childrens: [],
    },
  ];
  export const menuBusinessManagement = [
    {
      name: 'quan-ly-thong-tin',
      label: 'Quản lý thông tin',
      icon: HomeOutlined,
      path: '/business-management/information-manage',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'quan-ly-nhan-vien',
      label: 'Quản lý nhân viên',
      icon: UserOutlined,
      path: '/business-management/employee-manager',
    //   roles: rolePersonal,
      childrens: [],
    },
    {
      name: 'quan-ly-dich-vu',
      label: 'Quản lý dịch vụ',
      icon: CrownOutlined,
      path: '/business-management/service-management',
    //   roles: rolePersonal,
      childrens: [],
    },
  ];
  
  
  