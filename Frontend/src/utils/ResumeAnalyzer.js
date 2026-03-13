export function analyzeResume(text) {

  const requiredSkills = [
    "javascript",
    "react",
    "node",
    "html",
    "css",
    "mongodb",
    "sql",
    "docker",
    "system design",
    "dsa"
  ];
const atsScore = Math.min(score + 10, 100)
result.atsScore = atsScore
  const textLower = text.toLowerCase();

  let skillsFound = [];
  let missingSkills = [];

  requiredSkills.forEach(skill => {
    if (textLower.includes(skill)) {
      skillsFound.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const score = Math.round((skillsFound.length / requiredSkills.length) * 100);

  const result = {
    score,
    skillsFound,
    missingSkills
  };

  localStorage.setItem("careerCopilotResult", JSON.stringify(result));

  return result;
}