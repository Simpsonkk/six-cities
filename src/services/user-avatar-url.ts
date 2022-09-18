const USER_AVATAR_KEY_NAME = 'six-cities-user-avatar-url';

export type UserAvatar = string;

export const getUserAvatarUrl = (): UserAvatar => {
  const userAvatar = localStorage.getItem(USER_AVATAR_KEY_NAME);
  return userAvatar ?? '';
};

export const saveUserAvatarUrl = (userAvatar: UserAvatar): void => {
  localStorage.setItem(USER_AVATAR_KEY_NAME, userAvatar);
};

export const removeUserAvatarUrl = (): void => {
  localStorage.removeItem(USER_AVATAR_KEY_NAME);
};
