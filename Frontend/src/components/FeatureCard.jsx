const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">

      <h2 className="text-xl font-semibold mb-3 text-blue-400">
        {title}
      </h2>

      <p className="text-gray-400">
        {description}
      </p>

    </div>
  );
};

export default FeatureCard;