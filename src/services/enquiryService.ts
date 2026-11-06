import type { EnquiryInput } from "@/schemas/booking";
/** Creates a CRM enquiry from the contact/quote form (WEB-07, CRM-01). Demo no-op. */
export const enquiryService = {
  async submit(input: EnquiryInput): Promise<{ ok: boolean; demo: true }> {
    // TODO: POST to intake interface; triggers acknowledgement + staff emails.
    return { ok: true, demo: true };
  },
};
