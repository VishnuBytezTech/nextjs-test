
export const permissionStatuses = {
  Scheduled: 'Scheduled',
  Waiting: 'Waiting',
};


export type StatusType = keyof typeof permissionStatuses;

export const permissionData = [
  {
    id: '12',
    routName: 'routename--1',
    pageName: 'pagename--1',
    status: 'active',

  },
  ];
