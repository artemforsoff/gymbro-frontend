import ky, { type Options as KyOptions } from 'ky';

const defaultOptions: KyOptions = {
  prefixUrl: new URL('/api', import.meta.env.VITE_API_URL).toString(),
  credentials: 'include',
};

export const api = ky.extend({
  ...defaultOptions,
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const tokens = await ky
            .post('auth/refresh', {
              ...defaultOptions,
              json: { refreshToken },
            })
            .json<{ accessToken: string; refreshToken: string }>();

          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);

          request.headers.set('Authorization', `Bearer ${tokens.accessToken}`);

          return ky(request, {
            ...defaultOptions,
            ...options,
          });
        }

        return response;
      },
    ],
  },
});
