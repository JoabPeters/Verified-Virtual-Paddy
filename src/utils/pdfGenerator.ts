import { jsPDF } from 'jspdf';
import { AddressStatementFormData, DisCoInfo, StateInfo } from '../types';

export interface GeneratedPdfResult {
  dataUrl: string;
  blob: Blob;
  fileName: string;
}

export interface ElectricityBillInquiryData {
  disco: DisCoInfo;
  state: StateInfo;
  meterOrAccountNumber?: string;
  inquiryDate?: string;
}

/**
 * Generates an official-looking, clean, professional A4 PDF for a Customer-Prepared Address Statement.
 * Strictly complies with non-fabrication rules:
 * - NO fictional meter readings
 * - NO fictional electricity charges or billing periods
 * - NO utility logos or fraudulent seals
 * - Clear, prominent disclaimer and user-declaration language
 */
export function generateAddressStatementPdf(formData: AddressStatementFormData): GeneratedPdfResult {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Bar (Navy Blue #0F172A)
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 8, 'F');
  y += 14;

  // Title - Brand & Service Attribution
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('VERIFIED VIRTUAL PADDY · DIGITAL CITIZEN DOCUMENT ASSISTANCE', margin, y);
  y += 6;

  // Main Heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('CUSTOMER-PREPARED ADDRESS STATEMENT', margin, y);
  y += 5;

  // Subtitle / Reference
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Document Reference: VVP-CPAS-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`, margin, y);
  doc.text(`Preparation Date (Device Timestamp): ${formattedDate} at ${formattedTime}`, pageWidth - margin, y, { align: 'right' });
  y += 7;

  // Hairline Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Mandatory Prominent Disclaimer Box (Bordered with clean neutral/amber styling)
  doc.setFillColor(254, 252, 232); // Light amber #FEFCE8
  doc.setDrawColor(217, 119, 6);   // Amber-600 #D97706
  doc.setLineWidth(0.4);
  
  const disclaimerText = "MANDATORY STATUTORY DISCLAIMER:\n" +
    "This document contains information supplied entirely by the user. It is not an electricity bill issued by a utility provider, and the address has not been independently verified by Verified Virtual Paddy. It must never be presented as an official utility invoice, fiscal receipt, or certified public record.";
  
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 10);
  const disclaimerBoxHeight = (splitDisclaimer.length * 4.2) + 6;

  doc.rect(margin, y, contentWidth, disclaimerBoxHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14); // amber-800
  doc.text(splitDisclaimer, margin + 5, y + 5);
  y += disclaimerBoxHeight + 8;

  // Section 1: Declarant Identity & Residence
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. DECLARANT INFORMATION & PHYSICAL RESIDENCE', margin, y);
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  const renderFieldRow = (label: string, value: string, rowY: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(label, margin, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);

    const valueLines = doc.splitTextToSize(value || 'Not Provided', contentWidth - 65);
    doc.text(valueLines, margin + 65, rowY);
    
    return rowY + Math.max(6, valueLines.length * 4.8);
  };

  y = renderFieldRow('Full Name:', formData.fullName.trim(), y);
  y = renderFieldRow('Contact Phone Number:', formData.phoneNumber.trim(), y);
  y = renderFieldRow('Residential Address:', formData.residentialAddress.trim(), y);
  y = renderFieldRow('Local Government Area (LGA):', formData.lga.trim(), y);
  y = renderFieldRow('State / Territory:', formData.state.trim() + ', Nigeria', y);

  y += 4;

  // Section 2: Associated Utility Premise Context (Optional / Non-Financial)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. LOCAL ELECTRICITY DISTRIBUTION CONTEXT', margin, y);
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  y = renderFieldRow(
    'Electricity Provider (DisCo):', 
    formData.electricityProvider ? formData.electricityProvider : 'Not Specified / Off-grid', 
    y
  );

  y = renderFieldRow(
    'Customer / Meter Reference:', 
    formData.meterOrAccountNumber ? `${formData.meterOrAccountNumber.trim()} (User Supplied)` : 'None Declared', 
    y
  );

  y += 4;

  // Section 3: User Affirmation & Truthfulness Declaration
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('3. STATEMENT OF TRUTHFULNESS & SELF-AFFIRMATION', margin, y);
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  const declarationText = 
    `I, ${formData.fullName.trim()}, hereby confirm that the address, telephone contact, and premise information set out above are true, accurate, and supplied voluntarily by myself. ` +
    `I acknowledge that this document is prepared in my personal capacity as a self-declared statement of physical residence, and that Verified Virtual Paddy has performed no physical or utility-system audit of the declared premises. ` +
    `I understand that presenting this document falsely or forging utility affiliation is unlawful under Nigerian law.`;

  const splitDeclaration = doc.splitTextToSize(declarationText, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(splitDeclaration, margin, y);
  y += (splitDeclaration.length * 4.4) + 10;

  // Signature Block
  const signatureBoxY = y;
  const colWidth = (contentWidth - 10) / 2;

  // Column A: Declarant Signature Line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('DECLARANT SIGNATURE / AFFIRMATION', margin, signatureBoxY);
  
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.4);
  doc.line(margin, signatureBoxY + 16, margin + colWidth, signatureBoxY + 16);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(`Affirmed by: ${formData.fullName.trim()}`, margin, signatureBoxY + 21);
  doc.text(`Date of Execution: ${formattedDate}`, margin, signatureBoxY + 25);

  // Column B: Digital Generation Notice
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('PLATFORM PROCESSING AUDIT', margin + colWidth + 10, signatureBoxY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text('Engine: Verified Virtual Paddy (Client-Side Browser)', margin + colWidth + 10, signatureBoxY + 6);
  doc.text('Storage: Zero Cloud Storage · Local Device Memory Only', margin + colWidth + 10, signatureBoxY + 10);
  doc.text('Data Privacy: No remote server retention or transmission', margin + colWidth + 10, signatureBoxY + 14);
  doc.text('Fee Status: 100% Free · No Payment Required', margin + colWidth + 10, signatureBoxY + 18);

  // Bottom Footer Bar
  const footerY = pageHeight - 14;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Verified Virtual Paddy · A free digital document assistance project for Nigerians · https://verifiedvirtualpaddy.ng', margin, footerY);
  doc.text('Page 1 of 1', pageWidth - margin, footerY, { align: 'right' });

  // Generate output
  const pdfBlob = doc.output('blob');
  const dataUrl = doc.output('datauristring');
  const sanitizedName = formData.fullName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
  const fileName = `Address_Statement_${sanitizedName}_${now.toISOString().split('T')[0]}.pdf`;

  return {
    blob: pdfBlob,
    dataUrl,
    fileName,
  };
}

export function downloadPdfBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

/**
 * Generates an official DisCo Electricity Bill Inquiry & Verification Dossier PDF.
 * Strictly adheres to non-simulation rules: Provides direct official channels,
 * meter inquiry guidance, and NERC compliance disclaimers.
 */
export function generateElectricityBillInquiryPdf(data: ElectricityBillInquiryData): GeneratedPdfResult {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Header Bar (Navy Blue #0F172A)
  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y, contentWidth, 8, 'F');
  y += 14;

  // Title - Brand & Service Attribution
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('VERIFIED VIRTUAL PADDY · ELECTRICITY UTILITY ASSISTANCE SERVICE', margin, y);
  y += 6;

  // Main Heading
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text('GENUINE ELECTRICITY BILL INQUIRY DOSSIER', margin, y);
  y += 5;

  // Subtitle / Reference
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Inquiry Reference: VVP-DISCO-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`, margin, y);
  doc.text(`Generated: ${formattedDate} at ${formattedTime}`, pageWidth - margin, y, { align: 'right' });
  y += 7;

  // Hairline Divider
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  // Mandatory Prominent Disclaimer Box
  doc.setFillColor(254, 252, 232); // Amber light
  doc.setDrawColor(217, 119, 6);   // Amber-600
  doc.setLineWidth(0.4);
  
  const disclaimerText = "NERC COMPLIANCE & NON-SIMULATION STATEMENT:\n" +
    "Direct meter billing records can only be retrieved from licensed DisCos. Verified Virtual Paddy does NOT forge, fabricate, or simulate meter readings, billing balances, or consumption records. Use the verified official channels below to access genuine utility bills.";
  
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, contentWidth - 10);
  const disclaimerBoxHeight = (splitDisclaimer.length * 4.2) + 6;

  doc.rect(margin, y, contentWidth, disclaimerBoxHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(146, 64, 14);
  doc.text(splitDisclaimer, margin + 5, y + 5);
  y += disclaimerBoxHeight + 8;

  // Section 1: Target DisCo Information
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. LICENSED ELECTRICITY DISTRIBUTION COMPANY (DisCo)', margin, y);
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  const renderFieldRow = (label: string, value: string, rowY: number): number => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(71, 85, 105);
    doc.text(label, margin, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);

    const valueLines = doc.splitTextToSize(value || 'None Declared', contentWidth - 70);
    doc.text(valueLines, margin + 70, rowY);
    
    return rowY + Math.max(6, valueLines.length * 4.8);
  };

  y = renderFieldRow('Provider Name:', `${data.disco.name} (${data.disco.shortName})`, y);
  y = renderFieldRow('Customer State / Territory:', `${data.state.name} (${data.state.capital})`, y);
  y = renderFieldRow('Coverage Region:', data.disco.coverageStates.join(', '), y);
  y = renderFieldRow('Meter / Account Number:', data.meterOrAccountNumber ? `${data.meterOrAccountNumber.trim()} (User Declared)` : 'None Declared (Walk-in / In-Person Request)', y);

  y += 4;

  // Section 2: Verified Direct Contact & Retrieval Channels
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. VERIFIED OFFICIAL RETRIEVAL CHANNELS', margin, y);
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  y = renderFieldRow('Official Bill & Token Portal:', data.disco.billPortalUrl, y);
  y = renderFieldRow('Customer Care Hotline:', data.disco.customerCarePhone, y);
  y = renderFieldRow('WhatsApp Helpdesk:', data.disco.whatsappNumber || 'Available via Customer Support helpline', y);
  y = renderFieldRow('Official Website:', data.disco.website, y);
  if (data.disco.ussdCode) {
    y = renderFieldRow('Quick USSD Code:', data.disco.ussdCode, y);
  }

  y += 4;

  // Section 3: Official Verification Instructions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('3. INSTRUCTIONS TO RETRIEVE OFFICIAL UTILITY STATEMENT', margin, y);
  y += 4;

  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  const instructions = 
    "• FOR PREPAID METERS: Visit the official portal above or your DisCo mobile app. Enter your meter number and download the 'Tax Invoice / Token Receipt' for your latest recharge. This contains official DisCo VAT and address details.\n" +
    "• FOR POSTPAID METERS: Present your Account Number at your nearest DisCo Business Hub or login to the billing portal to retrieve your official monthly PDF invoice.\n" +
    "• REGULATORY NOTICE: Pursuant to NERC regulations, all DisCos are mandated to issue billing receipts free of charge upon verified meter identification.";

  const splitInstructions = doc.splitTextToSize(instructions, contentWidth);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  doc.text(splitInstructions, margin, y);
  y += (splitInstructions.length * 4.4) + 8;

  // Bottom Footer Bar
  const footerY = pageHeight - 14;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Verified Virtual Paddy · Official Electricity Assistance Dossier · Zero Server Transmission', margin, footerY);
  doc.text('Page 1 of 1', pageWidth - margin, footerY, { align: 'right' });

  // Generate output
  const pdfBlob = doc.output('blob');
  const dataUrl = doc.output('datauristring');
  const sanitizedDisCo = data.disco.shortName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const fileName = `Electricity_Bill_Inquiry_${sanitizedDisCo}_${now.toISOString().split('T')[0]}.pdf`;

  return {
    blob: pdfBlob,
    dataUrl,
    fileName,
  };
}
