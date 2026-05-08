export default function Hero() {
  return (
    <section className="relative py-32 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="uppercase tracking-[0.3em] text-green-300 text-sm mb-5 font-bold drop-shadow-md">
            Construction Management Platform
          </p>

          <h1 className="text-6xl font-bold text-white leading-tight drop-shadow-2xl">
            Professional Maintenance Issue Management
          </h1>

          <p className="text-white text-lg mt-8 leading-8 font-medium drop-shadow-lg">
            A modern platform for reporting, assigning, and resolving
            construction and maintenance issues efficiently.
          </p>

          <div className="flex gap-5 mt-10">
            <button className="bg-green-600 text-white px-6 py-4 rounded-2xl font-semibold hover:bg-green-500 transition shadow-lg shadow-green-900/50">
              Get Started
            </button>

            <button className="bg-black/30 backdrop-blur-md border-2 border-white text-white px-6 py-4 rounded-2xl font-semibold hover:bg-black/50 transition shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              ["Open", "32"],
              ["Working", "14"],
              ["Resolved", "128"],
            ].map(([title, value]) => (
              <div key={title} className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50">
                <p className="text-slate-500 text-sm">{title}</p>
                <h2 className="text-3xl font-bold mt-2">{value}</h2>
              </div>
            ))}
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex justify-between mb-4">
              <span>Electrical Repair</span>
              <span className="text-orange-500">Urgent</span>
            </div>

            <div className="w-full h-3 bg-slate-300 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-green-800"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}