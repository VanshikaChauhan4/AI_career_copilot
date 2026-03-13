import DashboardCard from "../components/DashboardCard";

const Dashboard = () => {

  const skills = ["HTML","CSS","JavaScript","React"];
  const missing = ["Node.js","MongoDB","Docker"];

  const roadmap = [
    "Master JavaScript",
    "Learn React",
    "Build 3 Projects",
    "Learn Backend (Node.js)",
    "Apply for internships"
  ];

  const internships = [
    "Frontend Developer Intern",
    "React Developer Intern",
    "Full Stack Developer Intern"
  ];

  return (

    <div className="p-10 grid md:grid-cols-2 gap-8">

      <DashboardCard title="Resume Score">
        <p className="text-4xl font-bold text-green-400">
          85%
        </p>
      </DashboardCard>

      <DashboardCard title="Detected Skills">
        <ul>
          {skills.map((s,i)=>(
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </DashboardCard>

      <DashboardCard title="Missing Skills">
        <ul>
          {missing.map((s,i)=>(
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </DashboardCard>

      <DashboardCard title="Career Roadmap">
        <ol>
          {roadmap.map((step,i)=>(
            <li key={i}>{i+1}. {step}</li>
          ))}
        </ol>
      </DashboardCard>

      <DashboardCard title="Internship Suggestions">
        <ul>
          {internships.map((i,index)=>(
            <li key={index}>• {i}</li>
          ))}
        </ul>
      </DashboardCard>

    </div>

  );
};

export default Dashboard;