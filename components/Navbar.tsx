export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-900">
          Chandana Construction
        </h1>

        <div className="hidden md:flex gap-8 text-slate-700">
          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="/customer">Customer</a>
          <a href="/admin">Admin</a>
        </div>

        <a
          href="/report-issue"
          className="bg-green-800 text-white px-5 py-3 rounded-full"
        >
          Report Issue
        </a>
      </div>
    </nav>
  );
}