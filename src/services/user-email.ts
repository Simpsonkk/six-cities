const USER_EMAIL_KEY_NAME = 'six-cities-user-email';

export type UserEmail = string;

export const getUserEmail = (): UserEmail => {
  const userEmail = localStorage.getItem(USER_EMAIL_KEY_NAME);
  return userEmail ?? '';
};

export const saveUserEmail = (userEmail: UserEmail): void => {
  localStorage.setItem(USER_EMAIL_KEY_NAME, userEmail);
};

export const removeUserEmail = (): void => {
  localStorage.removeItem(USER_EMAIL_KEY_NAME);
};
