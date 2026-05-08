export default function DashboardPreview() {
  return (
    <section className="py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-green-700 uppercase tracking-[0.2em] font-semibold">
            System Preview
          </p>

          <h2 className="text-4xl font-bold mt-4">
            Powerful Dashboards
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">
              Customer Dashboard
            </h3>

            <div className="space-y-4">
              {[1,2,3].map((i)=>(
                <div key={i} className="border border-slate-200 rounded-2xl p-5 flex justify-between">
                  <div>
                    <h4 className="font-semibold">
                      Water Leakage
                    </h4>
                    <p className="text-slate-500 text-sm">
                      Plumbing Issue
                    </p>
                  </div>

                  <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                    In Progress
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">
              Admin Controls
            </h3>

            <div className="grid grid-cols-2 gap-5">
              {[
                "Issue Tracking",
                "Engineer Allocation",
                "Reports",
                "Performance",
              ].map((item)=>(
                <div key={item} className="bg-slate-100 rounded-2xl p-8 text-center font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}