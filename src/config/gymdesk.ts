/**
 * Gymdesk integration settings — see PLAN.md §4.1.
 * Widgets don't load on localhost/127.0.0.1 (widgets.js points those at
 * gymdesk.test). Use `npm run dev` (binds --host) and browse via the LAN IP.
 */
export const gymdesk = {
  gymId: 'D2OOb',
  widgetsScript: 'https://app.gymdesk.com/js/widgets.js',

  forms: {
    // Currently the long 9-field form (name, DOB, email, phone, contact method, experience,
    // classes, participants, comment). Recommend trimming in Gymdesk and setting its
    // post-submit redirect to https://squareonejj.com/thank-you.
    trial: '6kpYB',
    // "Website Contact (new site)" — embed-only, not shown on the Gymdesk-hosted site.
    contact: '6ayyZ' as string | null,
  },

  /**
   * Show "pick your class now" booking under the trial form (PLAN.md §4.2).
   * Off until Gymdesk is confirmed to let a new visitor book a free trial class
   * without entering a payment card (the current booking flow asks for one).
   */
  trialBookingEnabled: false,

  // TODO: verify at cutover — available once the Gymdesk-hosted site is unpublished.
  links: {
    signup: 'https://squareonejj.gymdesk.com/signup',
    login: 'https://squareonejj.gymdesk.com/login',
  },
} as const;
