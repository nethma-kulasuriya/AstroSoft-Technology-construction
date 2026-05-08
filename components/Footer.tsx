export default function Footer() {
  return (
    <footer className="bg-green-950 text-white py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Chandana Construction
          </h2>

          <p className="text-green-100 max-w-md leading-7">
            Professional issue management solutions for construction
            and property maintenance operations.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-green-100">
            <li>Home</li>
            <li>Services</li>
            <li>Dashboards</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}