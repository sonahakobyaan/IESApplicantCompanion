import Image from "next/image";

export function Logo() {
  return (
    <div className="brand">
      <Image
        src="/logo_horizontal.png"
        alt="IES Applicant Companion"
        width={2048}
        height={520}
        priority
      />
    </div>
  );
}
