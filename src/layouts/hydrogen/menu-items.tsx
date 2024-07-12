import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';
import {
  PiShoppingCartDuotone,
  PiHeadsetDuotone,
  PiPackageDuotone,
  PiChartBarDuotone,
  PiCurrencyDollarDuotone,
  PiSquaresFourDuotone,
  PiGridFourDuotone,
  PiFeatherDuotone,
  PiChartLineUpDuotone,
  PiMapPinLineDuotone,
  PiUserGearDuotone,
  PiBellSimpleRingingDuotone,
  PiUserDuotone,
  PiEnvelopeSimpleOpenDuotone,
  PiStepsDuotone,
  PiCreditCardDuotone,
  PiTableDuotone,
  PiBrowserDuotone,
  PiHourglassSimpleDuotone,
  PiUserCircleDuotone,
  PiShootingStarDuotone,
  PiRocketLaunchDuotone,
  PiFolderLockDuotone,
  PiBinocularsDuotone,
  PiHammerDuotone,
  PiNoteBlankDuotone,
  PiUserPlusDuotone,
  PiShieldCheckDuotone,
  PiLockKeyDuotone,
  PiChatCenteredDotsDuotone,
  PiCalendarPlusDuotone,
  PiEnvelopeDuotone,
  PiCurrencyCircleDollarDuotone,
  PiBriefcaseDuotone,
  PiHouseLineDuotone,
  PiAirplaneTiltDuotone,
  PiFolder,
  PiCaretCircleUpDownDuotone,
  PiListNumbersDuotone,
  PiCoinDuotone,
  PiCalendarDuotone,
  PiShapesDuotone,
  PiNewspaperClippingDuotone,
} from 'react-icons/pi';

import { GiMetalBar } from "react-icons/gi";
import { ImLab } from "react-icons/im";
import { SlChemistry } from "react-icons/sl";
import { MdWork } from "react-icons/md";

import { IoCreate, IoPersonCircleOutline, IoPersonSharp } from 'react-icons/io5';
import { BiLogoCreativeCommons } from 'react-icons/bi';


export const menuItems = [
      // label start
      {
        name: 'Admin Dashboard',
      },
  
      // RC requirements menu list
      {
        name: 'Dashboard',
        href: routes.admin.adminDashboard,
        icon: <PiFolder />,
      },
      { 
        name: 'Users', 
        href: routes.admin.usersManagement, 
        icon: <IoPersonSharp /> 
      },
  
      // Job card section
      {
        name: 'Jobcard',
        href: '#',
        icon: <PiBriefcaseDuotone />,
        dropdownItems: [
          {
            name: 'Dashboard',
            href: routes.admin.jobCardPanel,
            icon: <PiBriefcaseDuotone />,
          },
          {
            name: 'Create Jobcard',
            href: routes.admin.jobcardCreate,
            icon: <PiBriefcaseDuotone />,
          },
        ],
      },
  
      // Client management section
      {
        name: 'Clients',
        href: routes.admin.clients,
        icon: <IoPersonSharp />,
      },
  
      // Commodity management section
      {
        name: 'Commodity',
        href: routes.admin.commodity,
        icon: <GiMetalBar />,
      },
  
      // Job type management section
      {
        name: 'Job Type',
        href: routes.admin.jobtype,
        icon: <MdWork />,
      },
  
      // Lab requirement management section
      {
        name: 'Lab Requirement',
        href: routes.admin.labrequirement,
        icon: <ImLab />,
      },
  
      // Prep lab requirement management section
      {
        name: 'Prep Lab Requirement',
        href: routes.admin.prepLabRequirement,
        icon: <SlChemistry />,
      },
    ];





// export const menuItems = [
//   // label start
//   {
    
//     name: 'Admin Dashboard',
//   },

//   // RC requirments menu list
//   {
//     name: 'Dashboard',
//     href: routes.admin.adminDashboard,
//     icon: <PiFolder />,
//   },

//   // Job card section
//   {
//     name: 'Jobcard',
//     href: '#',
//     icon: <PiBriefcaseDuotone />,
//     dropdownItems: [
//       {
//         name: 'Dashboard',
//         href: routes.admin.jobCardPanel,
//         icon: <PiBriefcaseDuotone />,
//       },
//       {
//         name: 'Create Jobcard',
//         href: routes.admin.jobcardCreate,
//         icon: <PiBriefcaseDuotone />,
//       },

//     ],
//   },

//   // Client management section
//   {
//     name: 'Clients',
//     href: routes.admin.clients,
//     icon: <IoPersonSharp />,
//   },

//   // Commodity management section
//   {
//     name: 'Comodity',
//     href: routes.admin.commodity,
//     icon: <GiMetalBar />,
//   },



//   // Job type management section
//   {
//     name: 'Job Type',
//     href: routes.admin.jobtype,
//     icon: <MdWork />,
//   },

//   // lab requirement management section
//   {
//     name: 'Lab Requirement',
//     href: routes.admin.labrequirement,
//     icon: <ImLab />,
//   },

//   // Prep lab requirement management section
//   {
//     name: 'Prep Lab Requirement',
//     href: routes.admin.prepLabRequirement,
//     icon: <SlChemistry />,
//   },









  

  
  // {
  //   name: 'demo datas',
  // },
  // {
  //   name: 'demo datas',
  // },

  // {
  //     name: 'demos',
  //     href: '#',
  //     icon: <PiBriefcaseDuotone />,
  //     dropdownItems: [
  //       {
  //         name: 'Job card demo',
  //         href: routes.demo.jobCardDemo,
  //         badge: '',
  //       },
  
  //     ],
  // },

  // {
  //   name: 'Template data',
  // },
  
  // {
  //   name: 'Permissions',
  //   href: routes.manager.permission,
  //   icon: <PiBriefcaseDuotone />,
  // },



  // {
  //   name: 'User roles',
  //   href: routes.manager.userRoles,
  //   icon: <PiBriefcaseDuotone />,
  // },



  // {
  //   name: 'Dashboard',
  //   href: '/',
  //   icon: <PiFolder />,
  // },
  // {
  //   name: 'Appointment',
  //   href: routes.appointment.dashboard,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'Executive',
  //   href: routes.executive.dashboard,
  //   icon: <PiBriefcaseDuotone />,
  // },
  // {
  //   name: 'Financial',
  //   href: routes.financial.dashboard,
  //   icon: <PiCurrencyCircleDollarDuotone />,
  // },
  // {
  //   name: 'Logistics',
  //   href: routes.logistics.dashboard,
  //   icon: <PiPackageDuotone />,
  // },
  // {
  //   name: 'E-Commerce',
  //   href: routes.eCommerce.dashboard,
  //   icon: <PiShoppingCartDuotone />,
  // },
  // {
  //   name: 'Analytics',
  //   href: routes.analytics,
  //   icon: <PiChartBarDuotone />,
  //   badge: '',
  // },

  // {
  //   name: 'Support',
  //   href: routes.support.dashboard,
  //   icon: <PiHeadsetDuotone />,
  // },


  




  // {
  //   name: 'Apps Kit',
  // },
  // // label end

  // {
  //   name: 'E-Commerce',
  //   href: '#',
  //   icon: <PiShoppingCartDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Products',
  //       href: routes.eCommerce.products,
  //       badge: '',
  //     },
  //     {
  //       name: 'Product Details',
  //       href: routes.eCommerce.productDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Product',
  //       href: routes.eCommerce.createProduct,
  //     },
  //     {
  //       name: 'Edit Product',
  //       href: routes.eCommerce.ediProduct(DUMMY_ID),
  //     },
  //     {
  //       name: 'Categories',
  //       href: routes.eCommerce.categories,
  //     },
  //     {
  //       name: 'Create Category',
  //       href: routes.eCommerce.createCategory,
  //     },
  //     {
  //       name: 'Edit Category',
  //       href: routes.eCommerce.editCategory(DUMMY_ID),
  //     },
  //     {
  //       name: 'Orders',
  //       href: routes.eCommerce.orders,
  //     },
  //     {
  //       name: 'Order Details',
  //       href: routes.eCommerce.orderDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Order',
  //       href: routes.eCommerce.createOrder,
  //     },
  //     {
  //       name: 'Edit Order',
  //       href: routes.eCommerce.editOrder(DUMMY_ID),
  //     },
  //     {
  //       name: 'Reviews',
  //       href: routes.eCommerce.reviews,
  //     },
  //     {
  //       name: 'Shop',
  //       href: routes.eCommerce.shop,
  //     },
  //     {
  //       name: 'Cart',
  //       href: routes.eCommerce.cart,
  //     },
  //     {
  //       name: 'Checkout & Payment',
  //       href: routes.eCommerce.checkout,
  //     },
  //   ],
  // },

  // {
  //   name: 'Support',
  //   href: '#',
  //   icon: <PiHeadsetDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Inbox',
  //       href: routes.support.inbox,
  //     },
  //     {
  //       name: 'Snippets',
  //       href: routes.support.snippets,
  //     },
  //     {
  //       name: 'Templates',
  //       href: routes.support.templates,
  //     },
  //   ],
  // },

  // {
  //   name: 'Invoice',
  //   href: '#',
  //   icon: <PiCurrencyDollarDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'List',
  //       href: routes.invoice.home,
  //     },
  //     {
  //       name: 'Details',
  //       href: routes.invoice.details(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create',
  //       href: routes.invoice.create,
  //     },
  //     {
  //       name: 'Edit',
  //       href: routes.invoice.edit(DUMMY_ID),
  //     },
  //   ],
  // },

  // {
  //   name: 'Logistics',
  //   href: '#',
  //   icon: <PiPackageDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Shipment List',
  //       href: routes.logistics.shipmentList,
  //     },
  //     {
  //       name: 'Shipment Details',
  //       href: routes.logistics.shipmentDetails(DUMMY_ID),
  //     },
  //     {
  //       name: 'Create Shipment',
  //       href: routes.logistics.createShipment,
  //     },
  //     {
  //       name: 'Edit Shipment',
  //       href: routes.logistics.editShipment(DUMMY_ID),
  //     },
  //     {
  //       name: 'Customer Profile',
  //       href: routes.logistics.customerProfile,
  //     },
  //     {
  //       name: 'Tracking',
  //       href: routes.logistics.tracking(DUMMY_ID),
  //     },
  //   ],
  // },

  // {
  //   name: 'Appointment',
  //   href: routes.appointment.appointmentList,
  //   icon: <PiCalendarDuotone />,
  // },
  // {
  //   name: 'File Manager',
  //   href: routes.file.manager,
  //   icon: <PiFolder />,
  // },
  // {
  //   name: 'Event Calendar',
  //   href: routes.eventCalendar,
  //   icon: <PiCalendarPlusDuotone />,
  // },
  // {
  //   name: 'Roles & Permissions',
  //   href: routes.rolesPermissions,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Point of Sale',
  //   href: routes.pos.index,
  //   icon: <PiCreditCardDuotone />,
  // },
  // {
  //   name: 'Invoice Builder',
  //   href: routes.invoice.builder,
  //   icon: <PiNewspaperClippingDuotone />,
  //   badge: 'NEW',
  // },
  // // label start
  // {
  //   name: 'Search & Filters',
  // },
  // {
  //   name: 'Real Estate',
  //   href: routes.searchAndFilter.realEstate,
  //   icon: <PiHouseLineDuotone />,
  // },
  // {
  //   name: 'Flight Booking',
  //   href: routes.searchAndFilter.flight,
  //   icon: <PiAirplaneTiltDuotone />,
  // },
  // {
  //   name: 'NFT',
  //   href: routes.searchAndFilter.nft,
  //   icon: <PiCoinDuotone />,
  // },
  // // label end

  
  // // label start
  // {
  //   name: 'Widgets',
  // },
  // // label end


  // {
  //   name: 'Cards',
  //   href: routes.widgets.cards,
  //   icon: <PiSquaresFourDuotone />,
  // },
  // {
  //   name: 'Icons',
  //   href: routes.widgets.icons,
  //   icon: <PiFeatherDuotone />,
  // },
  // {
  //   name: 'Charts',
  //   href: routes.widgets.charts,
  //   icon: <PiChartLineUpDuotone />,
  // },

  // // {
  // //   name: 'Banners',
  // //   href: routes.widgets.banners,
  // //   icon: <PiImageDuotone />,
  // // },

  // {
  //   name: 'Maps',
  //   href: routes.widgets.maps,
  //   icon: <PiMapPinLineDuotone />,
  // },
  // {
  //   name: 'Email Templates',
  //   href: routes.emailTemplates,
  //   icon: <PiEnvelopeDuotone />,
  // },

  // // label start
  // {
  //   name: 'Forms',
  // },
  // // label end

  // {
  //   name: 'Account Settings',
  //   href: routes.forms.profileSettings,
  //   icon: <PiUserGearDuotone />,
  // },
  // {
  //   name: 'Notification Preference',
  //   href: routes.forms.notificationPreference,
  //   icon: <PiBellSimpleRingingDuotone />,
  // },
  // {
  //   name: 'Personal Information',
  //   href: routes.forms.personalInformation,
  //   icon: <PiUserDuotone />,
  // },
  // {
  //   name: 'Newsletter',
  //   href: routes.forms.newsletter,
  //   icon: <PiEnvelopeSimpleOpenDuotone />,
  // },
  // {
  //   name: 'Multi Step',
  //   href: routes.multiStep,
  //   icon: <PiStepsDuotone />,
  // },
  // {
  //   name: 'Payment Checkout',
  //   href: routes.eCommerce.checkout,
  //   icon: <PiCreditCardDuotone />,
  // },

  // // label start
  // {
  //   name: 'Tables',
  // },
  // // label end

  // {
  //   name: 'Basic',
  //   href: routes.tables.basic,
  //   icon: <PiGridFourDuotone />,
  // },
  // {
  //   name: 'Collapsible',
  //   href: routes.tables.collapsible,
  //   icon: <PiCaretCircleUpDownDuotone />,
  // },
  // {
  //   name: 'Enhanced',
  //   href: routes.tables.enhanced,
  //   icon: <PiTableDuotone />,
  // },
  // {
  //   name: 'Sticky Header',
  //   href: routes.tables.stickyHeader,
  //   icon: <PiBrowserDuotone />,
  // },
  // {
  //   name: 'Pagination',
  //   href: routes.tables.pagination,
  //   icon: <PiListNumbersDuotone />,
  // },
  // {
  //   name: 'Search',
  //   href: routes.tables.search,
  //   icon: <PiHourglassSimpleDuotone />,
  // },
  // {
  //   name: 'TanStack Table',
  //   href: '#',
  //   icon: <PiTableDuotone />,
  //   dropdownItems: [
  //     {
  //       name: 'Basic',
  //       href: routes.tables.tanTable,
  //     },
  //     {
  //       name: 'Resizable',
  //       href: routes.tables.tanTableResizable,
  //     },
  //     {
  //       name: 'Collapsible',
  //       href: routes.tables.tanTableCollapsible,
  //     },
  //     {
  //       name: 'Drag & Drop',
  //       href: routes.tables.tanTableDnD,
  //     },
  //     {
  //       name: 'Pinning',
  //       href: routes.tables.tanTablePinning,
  //     },
  //     {
  //       name: 'Enhanced',
  //       href: routes.tables.tanTableEnhanced,
  //     },
  //   ],
  // },

  // // label start
  // {
  //   name: 'Pages',
  // },

  // {
  //   name: 'Profile',
  //   href: routes.profile,
  //   icon: <PiUserCircleDuotone />,
  // },
  // {
  //   name: 'Welcome',
  //   href: routes.welcome,
  //   icon: <PiShootingStarDuotone />,
  // },
  // {
  //   name: 'Coming soon',
  //   href: routes.comingSoon,
  //   icon: <PiRocketLaunchDuotone />,
  // },
  // {
  //   name: 'Access Denied',
  //   href: routes.accessDenied,
  //   icon: <PiFolderLockDuotone />,
  // },
  // {
  //   name: 'Not Found',
  //   href: routes.notFound,
  //   icon: <PiBinocularsDuotone />,
  // },
  // {
  //   name: 'Maintenance',
  //   href: routes.maintenance,
  //   icon: <PiHammerDuotone />,
  // },
  // {
  //   name: 'Blank',
  //   href: routes.blank,
  //   icon: <PiNoteBlankDuotone />,
  // },

// ];
