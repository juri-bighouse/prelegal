"use client";

import { NdaFormData } from "@/components/NdaForm";

interface Props {
  data: NdaFormData;
}

export default function NdaPreview({ data }: Props) {
  const {
    purpose,
    effectiveDate,
    mndaTermType,
    mndaTermYears,
    confidentialityTermType,
    confidentialityTermYears,
    governingLaw,
    jurisdiction,
    modifications,
    party1,
    party2,
  } = data;

  const mndaTerm =
    mndaTermType === "expires"
      ? `Expires ${mndaTermYears} year(s) from Effective Date`
      : "Continues until terminated";

  const confidentialityTerm =
    confidentialityTermType === "years"
      ? `${confidentialityTermYears} year(s) from Effective Date (trade secrets protected longer)`
      : "In perpetuity";

  return (
    <div className="font-serif text-gray-900 text-[13px] leading-relaxed space-y-4 print:text-black">
      <h1 className="text-lg font-bold text-center">Mutual Non-Disclosure Agreement</h1>

      <p className="text-xs text-gray-500 text-center italic">
        Common Paper MNDA Version 1.0 — CC BY 4.0
      </p>

      <hr />

      {/* Cover Page */}
      <h2 className="font-bold text-sm">Cover Page</h2>

      <Row label="Purpose" value={purpose || <Placeholder>Purpose</Placeholder>} />
      <Row label="Effective Date" value={effectiveDate || <Placeholder>Effective Date</Placeholder>} />
      <Row label="MNDA Term" value={mndaTerm} />
      <Row label="Term of Confidentiality" value={confidentialityTerm} />
      <Row
        label="Governing Law"
        value={governingLaw || <Placeholder>State</Placeholder>}
      />
      <Row
        label="Jurisdiction"
        value={jurisdiction || <Placeholder>City/County and State</Placeholder>}
      />
      {modifications && <Row label="Modifications" value={modifications} />}

      <hr />

      {/* Signature table */}
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            <th className="text-left py-1 pr-2 w-1/4"></th>
            <th className="text-center py-1 px-2 border border-gray-300 bg-gray-50">Party 1</th>
            <th className="text-center py-1 px-2 border border-gray-300 bg-gray-50">Party 2</th>
          </tr>
        </thead>
        <tbody>
          <SigRow label="Signature" v1="" v2="" />
          <SigRow label="Print Name" v1={party1.name} v2={party2.name} />
          <SigRow label="Title" v1={party1.title} v2={party2.title} />
          <SigRow label="Company" v1={party1.company} v2={party2.company} />
          <SigRow label="Notice Address" v1={party1.noticeAddress} v2={party2.noticeAddress} />
          <SigRow label="Date" v1={party1.date} v2={party2.date} />
        </tbody>
      </table>

      <hr />

      {/* Standard Terms summary */}
      <h2 className="font-bold text-sm">Standard Terms</h2>

      <ol className="list-decimal pl-5 space-y-2 text-xs">
        <li>
          <strong>Introduction.</strong> This MNDA allows each party to disclose confidential
          information in connection with the <em>{purpose || <Placeholder>Purpose</Placeholder>}</em>.
        </li>
        <li>
          <strong>Use and Protection.</strong> Receiving Party shall use Confidential Information
          solely for the stated Purpose and protect it with at least a reasonable standard of care.
        </li>
        <li>
          <strong>Exceptions.</strong> Obligations do not apply to publicly available information,
          independently known information, or information independently developed.
        </li>
        <li>
          <strong>Disclosures Required by Law.</strong> Disclosure is permitted if required by law,
          with advance notice.
        </li>
        <li>
          <strong>Term and Termination.</strong> Commences on {effectiveDate || <Placeholder>Effective Date</Placeholder>}.{" "}
          {mndaTerm}. Confidentiality obligations survive for: {confidentialityTerm}.
        </li>
        <li>
          <strong>Return or Destruction.</strong> Upon termination, Receiving Party will cease using
          and destroy/return all Confidential Information.
        </li>
        <li>
          <strong>Proprietary Rights.</strong> Disclosing Party retains all IP rights.
        </li>
        <li>
          <strong>Disclaimer.</strong> Confidential Information provided "AS IS" without warranties.
        </li>
        <li>
          <strong>Governing Law.</strong> Governed by laws of{" "}
          <strong>{governingLaw || <Placeholder>State</Placeholder>}</strong>. Proceedings in{" "}
          <strong>{jurisdiction || <Placeholder>Jurisdiction</Placeholder>}</strong>.
        </li>
        <li>
          <strong>Equitable Relief.</strong> Disclosing Party may seek injunctive relief for breach.
        </li>
        <li>
          <strong>General.</strong> Entire agreement; no assignment without consent; written
          amendments only.
        </li>
      </ol>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      <span className="font-semibold text-gray-600">{label}</span>
      <span className="col-span-2">{value}</span>
    </div>
  );
}

function SigRow({ label, v1, v2 }: { label: string; v1: string; v2: string }) {
  return (
    <tr>
      <td className="py-1 pr-2 font-medium text-gray-600 align-top">{label}</td>
      <td className="border border-gray-300 px-2 py-1 text-center min-h-[24px]">{v1}</td>
      <td className="border border-gray-300 px-2 py-1 text-center min-h-[24px]">{v2}</td>
    </tr>
  );
}

function Placeholder({ children }: { children: React.ReactNode }) {
  return <span className="text-gray-400 italic">[{children}]</span>;
}
