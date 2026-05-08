export default function Footer() {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-xl text-white py-14">
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
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
        <div className="text-center md:text-left">
          <p>© 2026 Island Drive. All rights reserved.</p>
          <p className="mt-1 font-medium text-slate-400 uppercase tracking-widest">
            Developed by{" "}
            <a
              href="https://astrosofttech.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors"
            >
              AstroSoft Technologies
            </a>
          </p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}