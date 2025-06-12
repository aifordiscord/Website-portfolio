import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export function ExperienceSection() {
  const experiences = [
    {
      id: 1,
      title: "Senior Discord Bot Developer",
      company: "Freelance",
      location: "Remote",
      duration: "2023 - Present",
      type: "Contract",
      description: "Specialized in building advanced Discord bots with AI integration, custom moderation systems, and community engagement tools for servers with 100k+ members.",
      achievements: [
        "Built 50+ Discord bots serving over 1M users",
        "Implemented AI-powered moderation reducing spam by 95%",
        "Created custom music bots with advanced queue management",
        "Developed trading alert systems for crypto communities"
      ],
      technologies: ["Python", "Discord.py", "PostgreSQL", "Redis", "Docker", "AWS"],
      link: null,
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "TechStart Solutions",
      location: "Remote",
      duration: "2022 - 2023",
      type: "Full-time",
      description: "Developed modern web applications using React, Node.js, and cloud technologies. Focused on creating scalable solutions for growing businesses.",
      achievements: [
        "Led development of 3 major web applications",
        "Improved application performance by 40%",
        "Mentored 2 junior developers",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ],
      technologies: ["React", "Node.js", "TypeScript", "MongoDB", "AWS", "Docker"],
      link: "https://techstart.example.com",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataFlow Inc",
      location: "San Francisco, CA",
      duration: "2021 - 2022",
      type: "Full-time",
      description: "Built robust backend systems for data processing and API development. Worked with large-scale distributed systems handling millions of requests daily.",
      achievements: [
        "Architected microservices handling 10M+ requests/day",
        "Reduced API response time by 50%",
        "Implemented real-time data processing pipelines",
        "Maintained 99.9% system uptime"
      ],
      technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Kubernetes", "GCP"],
      link: "https://dataflow.example.com",
    },
    {
      id: 4,
      title: "Junior Developer",
      company: "WebCraft Studio",
      location: "Austin, TX",
      duration: "2020 - 2021",
      type: "Full-time",
      description: "Started career developing websites and learning modern web technologies. Gained experience in both frontend and backend development.",
      achievements: [
        "Developed 15+ client websites",
        "Learned modern web development stack",
        "Contributed to open-source projects",
        "Completed AWS certification"
      ],
      technologies: ["JavaScript", "React", "PHP", "MySQL", "WordPress", "HTML/CSS"],
      link: null,
    },
  ];

  const education = [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      location: "Austin, TX",
      duration: "2016 - 2020",
      gpa: "3.8/4.0",
      honors: ["Summa Cum Laude", "Dean's List"],
      coursework: [
        "Data Structures & Algorithms",
        "Software Engineering",
        "Database Systems",
        "Machine Learning",
        "Computer Networks",
        "Operating Systems"
      ],
    },
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "https://aws.amazon.com/certification/",
    },
    {
      id: 2,
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2022",
      link: "https://cloud.google.com/certification",
    },
    {
      id: 3,
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "2022",
      link: "https://university.mongodb.com/",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Contract':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Part-time':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey through professional development and continuous learning in software engineering
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-8 flex items-center">
              <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3">
                💼
              </div>
              Work Experience
            </h3>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card key={exp.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{exp.title}</CardTitle>
                          <Badge className={getTypeColor(exp.type)}>
                            {exp.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <span className="font-medium text-foreground">{exp.company}</span>
                            {exp.link && (
                              <a href={exp.link} target="_blank" rel="noopener noreferrer" className="ml-2">
                                <ExternalLink className="w-3 h-3 hover:text-primary" />
                              </a>
                            )}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {exp.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">
                      {exp.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Key Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Education & Certifications */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3">
                  🎓
                </div>
                Education
              </h3>
              
              {education.map((edu) => (
                <Card key={edu.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <div className="text-muted-foreground">
                      <div className="font-medium text-foreground">{edu.school}</div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-3 h-3" />
                        {edu.duration}
                      </div>
                      <div className="text-sm mt-1">GPA: {edu.gpa}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Honors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.honors.map((honor) => (
                          <Badge key={honor} variant="secondary" className="text-xs">
                            {honor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Relevant Coursework:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {edu.coursework.slice(0, 4).map((course, i) => (
                          <li key={i}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 flex items-center">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center mr-3">
                  🏆
                </div>
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <Card key={cert.id} className="hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-xs text-muted-foreground">Issued: {cert.date}</p>
                        </div>
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}