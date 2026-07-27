import HotelLogo from "./HotelLogo";

export default function Header() {
  return (
    <header className="border-b-2 border-brand bg-brand-contrast px-6 py-8 text-center">
      <HotelLogo />
      <h1 className="text-2xl font-bold text-white">
        Laluna Hoi An Riverside Hotel &amp; Spa
      </h1>
    </header>
  );
}
