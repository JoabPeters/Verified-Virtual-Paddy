import { AddressStatementFormData, FormErrors } from '../types';

/**
 * Validates a Nigerian telephone number.
 * Accepts formats:
 * - Local: 08012345678, 07012345678, 09012345678, 09112345678, 08112345678
 * - International with +: +2348012345678, +2349012345678
 * - International without +: 2348012345678
 */
export function isValidNigerianPhone(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  
  // Standard Nigerian mobile regex:
  // Local 11 digits: starts with 070, 071, 080, 081, 090, 091, 082 followed by 8 digits
  const localRegex = /^0(70|71|80|81|82|90|91)\d{8}$/;
  // International with +234 (14 chars) or 234 (13 chars)
  const intlRegex = /^(\+?234)(70|71|80|81|82|90|91)\d{8}$/;

  return localRegex.test(cleaned) || intlRegex.test(cleaned);
}

export function formatNigerianPhoneForDisplay(phone: string): string {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  if (/^0\d{10}$/.test(cleaned)) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  if (/^\+234\d{10}$/.test(cleaned)) {
    return `+234 ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)} ${cleaned.slice(10)}`;
  }
  return phone;
}

export function validateAddressStatementForm(data: AddressStatementFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = "Please enter your full official legal name (at least 3 characters).";
  } else if (!data.fullName.trim().includes(' ')) {
    errors.fullName = "Please enter both first and last name.";
  }

  if (!data.phoneNumber || data.phoneNumber.trim().length === 0) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!isValidNigerianPhone(data.phoneNumber)) {
    errors.phoneNumber = "Invalid Nigerian phone number. Format should be 080XXXXXXXX, 070XXXXXXXX, 090XXXXXXXX, 081XXXXXXXX, or +234XXXXXXXXXX.";
  }

  if (!data.residentialAddress || data.residentialAddress.trim().length < 8) {
    errors.residentialAddress = "Please enter your complete physical residential address (building, street, area).";
  }

  if (!data.state || data.state.trim().length === 0) {
    errors.state = "Please select your Nigerian State or FCT.";
  }

  if (!data.lga || data.lga.trim().length === 0) {
    errors.lga = "Please enter or select your Local Government Area (LGA).";
  }

  if (!data.agreedToTerms) {
    errors.agreedToTerms = "You must agree to the Terms and Conditions before proceeding.";
  }

  if (!data.acknowledgedLimitations) {
    errors.acknowledgedLimitations = "You must explicitly acknowledge the document's legal limitations and non-utility status.";
  }

  return errors;
}
