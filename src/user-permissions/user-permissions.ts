interface User {
  id: string;
  name: string;
  role: string;
}

export const useUserRole = (): string | null => {
  const userString = localStorage.getItem("user") as string | null;
  if (userString) {
    try {
      const user: User = JSON.parse(userString) as User;
      return user.role || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  }
  
  return null;
};






export const checkUserIsAdmin = (role: string | null): boolean => {
    return role === 'admin';
  };
  
  export const checkUserIsManager = (role: string | null): boolean => {
    return role === 'manager';
  };
  
  export const checkUserIsPrepLab = (role: string | null): boolean => {
    return role === 'prep_lab';
  };
  
  export const checkUserIsPLab = (role: string | null): boolean => {
    return role === 'lab';
  };
  
  export const checkUserIsSupervisor = (role: string | null): boolean => {
    return role === 'supervisor';
  };
  
  export const checkUserIsFinance = (role: string | null): boolean => {
    return role === 'finance';
  };
  
  export const checkCanCreateUser = (role: string | null): boolean => {
    return role === 'manager' || role === 'supervisor';
  };
  
  export const checkCanCreateJobCard = (role: string | null): boolean => {
    return role === 'admin' || role === 'manager' || role === 'supervisor';
  };
  
  export const checkCanCreateClient = (role: string | null): boolean => {
    return role === 'admin' || role === 'manager' || role === 'supervisor';
  };
  