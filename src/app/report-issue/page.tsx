export default function ReportIssue() {
  return (
    <div className="min-h-screen bg-slate-100 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-10">
        <div className="mb-10">
          <p className="text-green-700 font-medium">
            Customer Portal
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Report an Issue
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            placeholder="Issue Title"
            className="border border-slate-200 rounded-2xl p-4"
          />

          <select className="border border-slate-200 rounded-2xl p-4">
            <option>Choose Category</option>
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Structural</option>
          </select>
        </div>

        <textarea
          placeholder="Describe the issue..."
          className="w-full border border-slate-200 rounded-2xl p-4 h-40 mb-6"
        ></textarea>

        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {["Low", "Medium", "Urgent"].map((item) => (
            <div
              key={item}
              className="border border-slate-200 rounded-2xl p-6 text-center hover:border-green-700 cursor-pointer transition-all"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="border-2 border-dashed border-slate-300 rounded-3xl p-16 text-center mb-8">
          Upload Photos
        </div>

        <button className="w-full bg-green-800 text-white py-5 rounded-2xl text-lg font-semibold">
          Submit Issue
        </button>
      </div>
    </div>
  );
}