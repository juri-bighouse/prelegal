"use client";

export interface PartyInfo {
  name: string;
  title: string;
  company: string;
  noticeAddress: string;
  date: string;
}

export interface NdaFormData {
  purpose: string;
  effectiveDate: string;
  mndaTermType: "expires" | "until_terminated";
  mndaTermYears: string;
  confidentialityTermType: "years" | "perpetuity";
  confidentialityTermYears: string;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
  party1: PartyInfo;
  party2: PartyInfo;
}

export const defaultFormData: NdaFormData = {
  purpose: "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: new Date().toISOString().split("T")[0],
  mndaTermType: "expires",
  mndaTermYears: "1",
  confidentialityTermType: "years",
  confidentialityTermYears: "1",
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
  party1: { name: "", title: "", company: "", noticeAddress: "", date: "" },
  party2: { name: "", title: "", company: "", noticeAddress: "", date: "" },
};

interface Props {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
}

export default function NdaForm({ data, onChange }: Props) {
  function set<K extends keyof NdaFormData>(key: K, value: NdaFormData[K]) {
    onChange({ ...data, [key]: value });
  }

  function setParty(party: "party1" | "party2", field: keyof PartyInfo, value: string) {
    onChange({ ...data, [party]: { ...data[party], [field]: value } });
  }

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Agreement Details
        </h2>
        <div className="space-y-4">
          <Field label="Purpose">
            <textarea
              rows={3}
              className={inputClass}
              value={data.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              placeholder="How Confidential Information may be used"
            />
          </Field>

          <Field label="Effective Date">
            <input
              type="date"
              className={inputClass}
              value={data.effectiveDate}
              onChange={(e) => set("effectiveDate", e.target.value)}
            />
          </Field>

          <Field label="MNDA Term">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="mndaTerm"
                  checked={data.mndaTermType === "expires"}
                  onChange={() => set("mndaTermType", "expires")}
                />
                Expires after
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded border border-gray-300 px-2 py-0.5 text-sm"
                  value={data.mndaTermYears}
                  disabled={data.mndaTermType !== "expires"}
                  onChange={(e) => set("mndaTermYears", e.target.value)}
                />
                year(s) from Effective Date
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="mndaTerm"
                  checked={data.mndaTermType === "until_terminated"}
                  onChange={() => set("mndaTermType", "until_terminated")}
                />
                Continues until terminated
              </label>
            </div>
          </Field>

          <Field label="Term of Confidentiality">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="confidentialityTerm"
                  checked={data.confidentialityTermType === "years"}
                  onChange={() => set("confidentialityTermType", "years")}
                />
                <input
                  type="number"
                  min="1"
                  className="w-16 rounded border border-gray-300 px-2 py-0.5 text-sm"
                  value={data.confidentialityTermYears}
                  disabled={data.confidentialityTermType !== "years"}
                  onChange={(e) => set("confidentialityTermYears", e.target.value)}
                />
                year(s) from Effective Date (trade secrets protected longer)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="confidentialityTerm"
                  checked={data.confidentialityTermType === "perpetuity"}
                  onChange={() => set("confidentialityTermType", "perpetuity")}
                />
                In perpetuity
              </label>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Governing Law (State)">
              <input
                type="text"
                className={inputClass}
                value={data.governingLaw}
                onChange={(e) => set("governingLaw", e.target.value)}
                placeholder="e.g. Delaware"
              />
            </Field>
            <Field label="Jurisdiction">
              <input
                type="text"
                className={inputClass}
                value={data.jurisdiction}
                onChange={(e) => set("jurisdiction", e.target.value)}
                placeholder="e.g. courts located in New Castle, DE"
              />
            </Field>
          </div>

          <Field label="MNDA Modifications (optional)">
            <textarea
              rows={2}
              className={inputClass}
              value={data.modifications}
              onChange={(e) => set("modifications", e.target.value)}
              placeholder="List any modifications to the standard terms"
            />
          </Field>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Parties
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <PartyFields
            label="Party 1"
            data={data.party1}
            onChange={(field, value) => setParty("party1", field, value)}
          />
          <PartyFields
            label="Party 2"
            data={data.party2}
            onChange={(field, value) => setParty("party2", field, value)}
          />
        </div>
      </section>
    </form>
  );
}

function PartyFields({
  label,
  data,
  onChange,
}: {
  label: string;
  data: PartyInfo;
  onChange: (field: keyof PartyInfo, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">{label}</h3>
      {(
        [
          ["name", "Print Name"],
          ["title", "Title"],
          ["company", "Company"],
          ["noticeAddress", "Notice Address"],
          ["date", "Date"],
        ] as [keyof PartyInfo, string][]
      ).map(([field, placeholder]) => (
        <input
          key={field}
          type={field === "date" ? "date" : "text"}
          className={inputClass}
          placeholder={placeholder}
          value={data[field]}
          onChange={(e) => onChange(field, e.target.value)}
        />
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";
