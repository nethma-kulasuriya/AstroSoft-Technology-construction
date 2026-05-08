const services = [
  "Plumbing",
  "Electrical",
  "Structural",
  "HVAC",
  "Security",
  "Painting",
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white/20 backdrop-blur-md border-b border-white/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-green-700 uppercase tracking-[0.2em] font-semibold">
            Services
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Our Maintenance Solutions
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-100 mb-6"></div>

              <h3 className="text-2xl font-semibold mb-4">
                {service}
              </h3>

              <p className="text-slate-600 leading-7">
                Professional maintenance and repair services tailored
                for modern properties and facilities.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}