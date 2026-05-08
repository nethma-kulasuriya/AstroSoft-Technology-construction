const steps = [
  "Register",
  "Report Issue",
  "Engineer Assigned",
  "Issue Resolved",
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-green-700 uppercase tracking-[0.2em] font-semibold">
            Process
          </p>

          <h2 className="text-4xl font-bold mt-4">
            How It Works
          </h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-slate-50 p-8 rounded-3xl text-center"
            >
              <div className="w-16 h-16 bg-green-800 rounded-full text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {index + 1}
              </div>

              <h3 className="text-xl font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}