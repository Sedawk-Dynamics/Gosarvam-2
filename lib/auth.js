// Shared gate for the /api/admin/* routes.
export const ADMIN_KEY = process.env.ADMIN_KEY || 'gosarvam-admin-2025';

export function isAuthorised(request) {
  return new URL(request.url).searchParams.get('key') === ADMIN_KEY;
}
