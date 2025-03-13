import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }: { locals: { user?: any }, url: URL }) => {
  // ユーザーがログインしていない場合はログインページにリダイレクト
  if (!locals.user) {
    throw redirect(303, `/login?redirectTo=${url.pathname}`);
  }

  return {
    user: locals.user
  };
};
