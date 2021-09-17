export const now = new Date();
export const startOfWeek = () =>
  new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1);
export const endOfWeek = () =>
  new Date(now.getFullYear(), now.getMonth(), startOfWeek().getDate() + 7);
export const currentMonth = now.getMonth() + 1;
