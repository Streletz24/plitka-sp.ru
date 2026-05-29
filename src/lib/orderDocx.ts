import logoUrl from "@/assets/logo.png";
import { COMPANY_CONTACTS } from "@/config/company";
import type { CartItem } from "@/contexts/CartContext";

const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PAGE_WIDTH_TWIPS = 11906;
const PAGE_HEIGHT_TWIPS = 16838;
const PAGE_MARGIN_TWIPS = 1134;

const textEncoder = new TextEncoder();
const ZIP_SIGNATURE = "PK";
const PDF_SIGNATURE = "%PDF";

const escapeXml = (value: string | number | null | undefined) =>
  String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const formatMoney = (value: number) => `${Math.round(value || 0).toLocaleString("ru-RU")} руб`;

const pad = (value: number) => String(value).padStart(2, "0");

const formatOrderDate = (date: Date) =>
  `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;

const formatFileDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${pad(date.getHours())}-${pad(date.getMinutes())}`;

const paragraph = (text: string, options: { bold?: boolean; size?: number; spacingAfter?: number; color?: string; align?: "center" | "right" } = {}) => {
  const properties = [
    options.align ? `<w:jc w:val="${options.align}"/>` : "",
    options.spacingAfter !== undefined ? `<w:spacing w:after="${options.spacingAfter}"/>` : "",
  ].join("");
  const runProperties = [
    options.bold ? "<w:b/>" : "",
    options.size ? `<w:sz w:val="${options.size}"/>` : "",
    options.color ? `<w:color w:val="${options.color}"/>` : "",
  ].join("");

  return `<w:p>${properties ? `<w:pPr>${properties}</w:pPr>` : ""}<w:r>${runProperties ? `<w:rPr>${runProperties}</w:rPr>` : ""}<w:t>${escapeXml(text)}</w:t></w:r></w:p>`;
};

const tableCell = (content: string, width: number, shading?: string) =>
  `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${shading ? `<w:shd w:fill="${shading}"/>` : ""}</w:tcPr>${content}</w:tc>`;

const tableBorders =
  '<w:tblBorders><w:top w:val="single" w:sz="4" w:color="D9D2C7"/><w:left w:val="single" w:sz="4" w:color="D9D2C7"/><w:bottom w:val="single" w:sz="4" w:color="D9D2C7"/><w:right w:val="single" w:sz="4" w:color="D9D2C7"/><w:insideH w:val="single" w:sz="4" w:color="D9D2C7"/><w:insideV w:val="single" w:sz="4" w:color="D9D2C7"/></w:tblBorders>';

const headerLogo = (hasLogo: boolean) =>
  hasLogo
    ? `<w:p><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="914400" cy="914400"/><wp:docPr id="1" name="Удачная Плитка"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="1" name="logo.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rIdLogo"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="914400" cy="914400"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`
    : paragraph(COMPANY_CONTACTS.name, { bold: true, size: 24 });

const buildDocumentXml = (items: CartItem[], totalSum: number, orderDate: Date, hasLogo: boolean) => {
  const orderDateText = formatOrderDate(orderDate);
  const headerTable = `
    <w:tbl>
      <w:tblPr><w:tblW w:w="0" w:type="auto"/><w:tblBorders><w:top w:val="nil"/><w:left w:val="nil"/><w:bottom w:val="nil"/><w:right w:val="nil"/><w:insideH w:val="nil"/><w:insideV w:val="nil"/></w:tblBorders></w:tblPr>
      <w:tr>
        ${tableCell(headerLogo(hasLogo), 1800)}
        ${tableCell(`
          ${paragraph("УДАЧНАЯ ПЛИТКА", { bold: true, size: 32, spacingAfter: 160, color: "1F3A33" })}
          ${paragraph(`Адрес: ${COMPANY_CONTACTS.address}`, { size: 22, spacingAfter: 80 })}
          ${paragraph(`Телефон: ${COMPANY_CONTACTS.phone}`, { size: 22, spacingAfter: 80 })}
          ${paragraph(`Email: ${COMPANY_CONTACTS.email}`, { size: 22, spacingAfter: 80 })}
          ${paragraph(`Дата заказа: ${orderDateText}`, { size: 22 })}
        `, 7800)}
      </w:tr>
    </w:tbl>`;

  const headerRow = `
    <w:tr>
      ${tableCell(paragraph("№", { bold: true }), 650, "EFE8DC")}
      ${tableCell(paragraph("Товар", { bold: true }), 3600, "EFE8DC")}
      ${tableCell(paragraph("Цвет", { bold: true }), 1800, "EFE8DC")}
      ${tableCell(paragraph("Количество", { bold: true }), 1600, "EFE8DC")}
      ${tableCell(paragraph("Ед.", { bold: true }), 900, "EFE8DC")}
      ${tableCell(paragraph("Сумма", { bold: true }), 1600, "EFE8DC")}
    </w:tr>`;

  const itemRows = items
    .map((item, index) => {
      const quantity = item.pieces !== null ? item.pieces : item.area;
      return `
        <w:tr>
          ${tableCell(paragraph(String(index + 1)), 650)}
          ${tableCell(paragraph(item.productName), 3600)}
          ${tableCell(paragraph(item.colorName || "—"), 1800)}
          ${tableCell(paragraph(String(quantity)), 1600)}
          ${tableCell(paragraph(item.pieces !== null ? "шт" : item.unit), 900)}
          ${tableCell(paragraph(formatMoney(item.total)), 1600)}
        </w:tr>`;
    })
    .join("");

  const productsTable = `<w:tbl><w:tblPr><w:tblW w:w="9950" w:type="dxa"/>${tableBorders}</w:tblPr>${headerRow}${itemRows}</w:tbl>`;

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 wp14">
      <w:body>
        ${headerTable}
        ${paragraph("", { spacingAfter: 220 })}
        ${paragraph("Бланк заказа", { bold: true, size: 36, spacingAfter: 260, align: "center", color: "1F3A33" })}
        ${productsTable}
        ${paragraph("", { spacingAfter: 180 })}
        ${paragraph(`Итого: ${formatMoney(totalSum)}`, { bold: true, size: 28, align: "right" })}
        <w:sectPr>
          <w:pgSz w:w="${PAGE_WIDTH_TWIPS}" w:h="${PAGE_HEIGHT_TWIPS}"/>
          <w:pgMar w:top="${PAGE_MARGIN_TWIPS}" w:right="${PAGE_MARGIN_TWIPS}" w:bottom="${PAGE_MARGIN_TWIPS}" w:left="${PAGE_MARGIN_TWIPS}" w:header="708" w:footer="708" w:gutter="0"/>
        </w:sectPr>
      </w:body>
    </w:document>`;
};

const buildContentTypesXml = (hasLogo: boolean) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  ${hasLogo ? '<Default Extension="png" ContentType="image/png"/>' : ""}
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

const rootRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const documentRelsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rIdLogo" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/logo.png"/>
</Relationships>`;

const makeCrcTable = () => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
};

const crcTable = makeCrcTable();

const crc32 = (bytes: Uint8Array) => {
  let crc = 0xffffffff;
  for (const byte of bytes) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
};

const dosDateTime = (date: Date) => ({
  time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
  date: ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
});

const u16 = (value: number) => {
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, value, true);
  return bytes;
};

const u32 = (value: number) => {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value, true);
  return bytes;
};

const concatBytes = (parts: Uint8Array[]) => {
  const total = parts.reduce((sum, part) => sum + part.length, 0);
  const output = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.length;
  }
  return output;
};

const createZip = (files: Array<{ name: string; data: Uint8Array }>) => {
  const now = new Date();
  const { time, date } = dosDateTime(now);
  const localParts: Uint8Array[] = [];
  const centralParts: Uint8Array[] = [];
  let offset = 0;

  files.forEach((file) => {
    const name = textEncoder.encode(file.name);
    const crc = crc32(file.data);
    const localHeader = concatBytes([
      u32(0x04034b50),
      u16(20),
      u16(0),
      u16(0),
      u16(time),
      u16(date),
      u32(crc),
      u32(file.data.length),
      u32(file.data.length),
      u16(name.length),
      u16(0),
      name,
    ]);

    localParts.push(localHeader, file.data);

    centralParts.push(
      concatBytes([
        u32(0x02014b50),
        u16(20),
        u16(20),
        u16(0),
        u16(0),
        u16(time),
        u16(date),
        u32(crc),
        u32(file.data.length),
        u32(file.data.length),
        u16(name.length),
        u16(0),
        u16(0),
        u16(0),
        u16(0),
        u32(0),
        u32(offset),
        name,
      ]),
    );

    offset += localHeader.length + file.data.length;
  });

  const centralDirectory = concatBytes(centralParts);
  const endOfCentralDirectory = concatBytes([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(files.length),
    u16(files.length),
    u32(centralDirectory.length),
    u32(offset),
    u16(0),
  ]);

  return concatBytes([...localParts, centralDirectory, endOfCentralDirectory]);
};

const toBytes = (value: string) => textEncoder.encode(value);

const fetchLogoBytes = async () => {
  try {
    const response = await fetch(logoUrl);
    if (!response.ok) return null;
    return new Uint8Array(await response.arrayBuffer());
  } catch {
    return null;
  }
};

const verifyDocxPackage = (bytes: Uint8Array, fileName: string) => {
  const signature = String.fromCharCode(...bytes.slice(0, 4));

  if (!fileName.endsWith(".docx")) {
    throw new Error("invalid_docx_filename");
  }

  if (!signature.startsWith(ZIP_SIGNATURE) || signature.startsWith(PDF_SIGNATURE)) {
    throw new Error("invalid_docx_package");
  }
};

const downloadBlob = (blob: Blob, fileName: string) => {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const downloadOrderDocx = async (items: CartItem[], totalSum: number) => {
  const createdAt = new Date();
  const logoBytes = await fetchLogoBytes();
  const files = [
    { name: "[Content_Types].xml", data: toBytes(buildContentTypesXml(Boolean(logoBytes))) },
    { name: "_rels/.rels", data: toBytes(rootRelsXml) },
    { name: "word/document.xml", data: toBytes(buildDocumentXml(items, totalSum, createdAt, Boolean(logoBytes))) },
  ];

  if (logoBytes) {
    files.push({ name: "word/_rels/document.xml.rels", data: toBytes(documentRelsXml) });
    files.push({ name: "word/media/logo.png", data: logoBytes });
  }

  const docxBytes = createZip(files);
  const fileName = `blank-zakaza-${formatFileDate(createdAt)}.docx`;
  verifyDocxPackage(docxBytes, fileName);

  const docxBuffer = new ArrayBuffer(docxBytes.byteLength);
  new Uint8Array(docxBuffer).set(docxBytes);
  downloadBlob(new Blob([docxBuffer], { type: DOCX_MIME }), fileName);
};

export const printOrderBlank = (items: CartItem[], totalSum: number) => {
  const createdAt = new Date();
  const rows = items
    .map((item, index) => {
      const quantity = item.pieces !== null ? item.pieces : item.area;
      const unit = item.pieces !== null ? "шт" : item.unit;
      return `<tr><td>${index + 1}</td><td>${escapeXml(item.productName)}</td><td>${escapeXml(item.colorName || "—")}</td><td>${escapeXml(quantity)}</td><td>${escapeXml(unit)}</td><td>${escapeXml(formatMoney(item.total))}</td></tr>`;
    })
    .join("");

  const html = `<!doctype html><html lang="ru"><head><meta charset="utf-8"/><title>Бланк заказа</title><style>
    body{font-family:Arial,sans-serif;color:#1f2d2a;margin:32px;background:#fff;}
    .header{display:grid;grid-template-columns:96px 1fr;gap:24px;align-items:start;margin-bottom:28px;}
    .logo{width:72px;height:72px;object-fit:contain;}
    .company{font-size:22px;font-weight:700;margin:0 0 12px;color:#1f3a33;letter-spacing:.04em;}
    .contacts{font-size:13px;line-height:1.6;margin:0;color:#4b5754;}
    h1{text-align:center;font-size:24px;margin:24px 0;color:#1f3a33;}
    table{width:100%;border-collapse:collapse;margin-top:16px;}
    th,td{border:1px solid #d9d2c7;padding:9px 10px;font-size:13px;text-align:left;vertical-align:top;}
    th{background:#efe8dc;font-weight:700;}
    .total{text-align:right;font-size:18px;font-weight:700;margin-top:18px;}
  </style></head><body>
    <div class="header"><img class="logo" src="${logoUrl}" alt="Удачная Плитка"/><div><p class="company">УДАЧНАЯ ПЛИТКА</p><p class="contacts">Адрес: ${escapeXml(COMPANY_CONTACTS.address)}<br/>Телефон: ${escapeXml(COMPANY_CONTACTS.phone)}<br/>Email: ${escapeXml(COMPANY_CONTACTS.email)}<br/>Дата заказа: ${escapeXml(formatOrderDate(createdAt))}</p></div></div>
    <h1>Бланк заказа</h1>
    <table><thead><tr><th>№</th><th>Товар</th><th>Цвет</th><th>Количество</th><th>Ед.</th><th>Сумма</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="total">Итого: ${escapeXml(formatMoney(totalSum))}</p>
  </body></html>`;

  const printWindow = window.open("", "_blank");
  if (!printWindow) return false;
  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  return true;
};
