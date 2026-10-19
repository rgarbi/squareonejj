/**
 * Gymdesk integration settings — see PLAN.md §4.1.
 * Widgets don't load on localhost/127.0.0.1 (widgets.js points those at
 * gymdesk.test). Use `npm run dev` (binds --host) and browse via the LAN IP.
 */
export const gymdesk = {
  gymId: 'D2OOb',
  widgetsScript: 'https://app.gymdesk.com/js/widgets.js',

  forms: {
    trial: '6kpYB',
    // TODO: create a custom Contact form in Gymdesk (Website → Forms) and add its ref.
    contact: null as string | null,
  },

  // TODO: verify at cutover — available once the Gymdesk-hosted site is unpublished.
  links: {
    signup: 'https://squareonejj.gymdesk.com/signup',
    login: 'https://squareonejj.gymdesk.com/login',
  },
} as const;
