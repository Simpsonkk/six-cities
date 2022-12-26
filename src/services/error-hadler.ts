import request from 'axios';
import { HttpCode } from '../consts';
import { toast } from 'react-toastify';

export const errorHandler = (error: unknown): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.error(response.data.error);
        break;
      case HttpCode.NotFound:
        toast.info(response.data.error);
        break;
      case HttpCode.Unauthorized:
        toast.info(response.data.error);
        break;
    }
  }
};
