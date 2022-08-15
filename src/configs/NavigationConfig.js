import { 
  DashboardOutlined,
  DollarOutlined,
  UserOutlined,
  IdcardOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'


let dashBoardNavTree = []

dashBoardNavTree = [
    {
      key: 'home',
      path: `${APP_PREFIX_PATH}/home`,
      title: 'HOME',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
  
    
  /*
    {
      key: 'plan-covers',
      path: `${APP_PREFIX_PATH}/plan-covers`,
      title: 'plan covers',
      icon: IdcardOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'plan-covers-overview',
          path: `${APP_PREFIX_PATH}/plan-covers/overview`,
          title: 'overview',
          icon: IdcardOutlined,
          breadcrumb: true,
          submenu: []
        },
  
        {
          key: 'add-new-plan-cover',
          path: `${APP_PREFIX_PATH}/plan-covers/add`,
          title: 'add plan cover',
          icon: IdcardOutlined,
          breadcrumb: true,
          submenu: []
        }
      ]
    }
  */
  
  ]
  


const navigationConfig = [
  ...dashBoardNavTree
]

export default navigationConfig;
