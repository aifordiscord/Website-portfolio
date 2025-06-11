import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code, Layers, Database, Settings } from "lucide-react";

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      skills: [
        { name: "Python", level: 95, icon: "🐍" },
        { name: "JavaScript", level: 90, icon: "🟨" },
        { name: "TypeScript", level: 85, icon: "🔵" },
      ]
    },
    {
      title: "Frameworks",
      icon: Layers,
      color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      skills: [
        { name: "React", level: 88, icon: "⚛️" },
        { name: "Node.js", level: 92, icon: "🟢" },
        { name: "Discord.py", level: 95, icon: "🤖" },
      ]
    },
    {
      title: "Databases",
      icon: Database,
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      skills: [
        { name: "MongoDB", level: 85, icon: "🍃" },
        { name: "PostgreSQL", level: 80, icon: "🐘" },
        { name: "Redis", level: 75, icon: "🔴" },
      ]
    },
    {
      title: "Tools",
      icon: Settings,
      color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
      skills: [
        { name: "Docker", level: 82, icon: "🐳" },
        { name: "AWS", level: 78, icon: "☁️" },
        { name: "Git", level: 95, icon: "📚" },
      ]
    },
  ];

  const additionalSkills = [
    "AI/ML Integration",
    "API Development", 
    "Bot Development",
    "Cloud Computing",
    "Microservices",
    "DevOps",
    "WebRTC",
    "Real-time Systems"
  ];

  const getProgressColor = (level: number) => {
    if (level >= 90) return "bg-green-500";
    if (level >= 80) return "bg-blue-500";
    if (level >= 70) return "bg-yellow-500";
    return "bg-gray-500";
  };

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building modern Discord applications and web solutions
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <Card key={category.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <category.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="text-base">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Additional Skills */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-6">Additional Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className={`px-4 py-2 text-sm font-medium ${
                  index % 4 === 0 ? 'bg-primary/10 text-primary hover:bg-primary/20' :
                  index % 4 === 1 ? 'bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-500/20' :
                  index % 4 === 2 ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20' :
                  'bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20'
                } transition-colors cursor-default`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
