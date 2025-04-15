import ky, { type Options as KyOptions } from 'ky';

const defaultOptions: KyOptions = {
  prefixUrl: new URL('/api', import.meta.env.VITE_API_URL).toString(),
  credentials: 'include',
};

export const api = ky.extend({
  ...defaultOptions,
  hooks: {
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          const { ok } = await ky.post('auth/refresh', defaultOptions);

          if (ok) {
            return ky(request, {
              ...defaultOptions,
              ...options,
            });
          }
        }

        return response;
      },
    ],
  },
});
