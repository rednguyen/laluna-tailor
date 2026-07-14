export default function Footer() {
  return (
    <footer className="bg-brand-contrast px-6 py-10 text-center text-white/90">
      <h2 className="text-lg font-semibold text-white">
        Laluna Hoi An Riverside Hotel &amp; Spa
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/70">
        A boutique retreat on the banks of the Hoai, moments from the Ancient Town.
      </p>

      <div className="mx-auto mt-6 flex max-w-lg flex-col gap-4 text-sm sm:flex-row sm:justify-center sm:gap-10">
        <div>
          <p className="font-medium text-brand">Address</p>
          <p className="mt-1 text-white/80">
            12 Nguyen Du Street, Minh An Ward,
            <br />
            Hoi An, Da Nang, Vietnam
          </p>
        </div>
        <div>
          <p className="font-medium text-brand">Reception</p>
          <a href="tel:+842353666678" className="mt-1 block text-white/80 hover:text-white">
            +84 235 366 6678
          </a>
        </div>
        <div>
          <p className="font-medium text-brand">Email</p>
          <a
            href="mailto:support@lalunahoian.com"
            className="mt-1 block text-white/80 hover:text-white"
          >
            support@lalunahoian.com
          </a>
        </div>
      </div>
    </footer>
  );
}
