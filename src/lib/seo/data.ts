import { prisma } from "@/lib/prisma";
import type { PublicProfile } from "@/hooks/usePublicProfile";
import type { Project } from "@/hooks/useProjects";
import type { Experience } from "@/hooks/useExperience";
import type { Skill } from "@/hooks/useSkills";
import type { Education } from "@/hooks/useEducation";
import type { Honor } from "@/hooks/useHonors";
import type { CV } from "@/hooks/useCVs";

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : String(value);
}

function optionalString(value: string | null | undefined): string | undefined {
  return value ?? undefined;
}

export async function getActivePublicProfile(): Promise<PublicProfile | null> {
  const profile = await prisma.publicProfile.findFirst({
    where: { isActive: true },
  });

  if (!profile) return null;

  return {
    id: profile.id,
    name: profile.name,
    image: profile.image,
    headlines: profile.headlines,
    tagline: profile.tagline,
    isActive: profile.isActive,
    createdAt: toIso(profile.createdAt),
    updatedAt: toIso(profile.updatedAt),
  };
}

export async function getAllProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    githubLink: optionalString(project.githubLink),
    liveLink: optionalString(project.liveLink),
    images: project.images,
    awards: project.awards,
    category: project.category,
    content: optionalString(project.content),
    problemStatement: optionalString(project.problemStatement),
    solution: optionalString(project.solution),
    features: project.features,
    challenges: project.challenges,
    learnings: project.learnings,
    seoTitle: optionalString(project.seoTitle),
    seoDescription: optionalString(project.seoDescription),
    createdAt: toIso(project.createdAt),
    updatedAt: toIso(project.updatedAt),
  }));
}

export async function getAllExperiences(): Promise<Experience[]> {
  const experiences = await prisma.experience.findMany({
    include: { roles: true },
    orderBy: { createdAt: "desc" },
  });

  return experiences.map((experience) => ({
    id: experience.id,
    company: experience.company,
    companyLink: optionalString(experience.companyLink),
    logo: experience.logo,
    period: experience.period,
    createdAt: toIso(experience.createdAt),
    updatedAt: toIso(experience.updatedAt),
    roles: experience.roles.map((role) => ({
      id: role.id,
      title: role.title,
      period: role.period,
      description: role.description,
      experienceId: role.experienceId,
      createdAt: toIso(role.createdAt),
      updatedAt: toIso(role.updatedAt),
    })),
  }));
}

export async function getActiveSkills(): Promise<Skill[]> {
  const skills = await prisma.skill.findMany({
    where: { isActive: true },
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
  });

  return skills.map((skill) => ({
    id: skill.id,
    name: skill.name,
    category: skill.category,
    iconType: skill.iconType as Skill["iconType"],
    iconName: optionalString(skill.iconName),
    iconUrl: optionalString(skill.iconUrl),
    color: optionalString(skill.color),
    proficiency: (optionalString(skill.proficiency) as Skill["proficiency"]) || undefined,
    isActive: skill.isActive,
    displayOrder: skill.displayOrder,
    createdAt: toIso(skill.createdAt),
    updatedAt: toIso(skill.updatedAt),
  }));
}

export async function getActiveEducation(): Promise<Education[]> {
  const education = await prisma.education.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  return education.map((item) => ({
    id: item.id,
    institution: item.institution,
    degree: item.degree,
    period: item.period,
    cgpa: optionalString(item.cgpa),
    logo: item.logo,
    link: optionalString(item.link),
    coreCourses: item.coreCourses,
    isActive: item.isActive,
    displayOrder: item.displayOrder,
    createdAt: toIso(item.createdAt),
    updatedAt: toIso(item.updatedAt),
  }));
}

export async function getAllHonors(): Promise<Honor[]> {
  const honors = await prisma.honor.findMany({
    orderBy: { issuedAt: "desc" },
  });

  return honors.map((honor) => ({
    id: honor.id,
    title: honor.title,
    description: honor.description,
    image: honor.image,
    issuedBy: honor.issuedBy,
    issuedAt: toIso(honor.issuedAt),
    createdAt: toIso(honor.createdAt),
    updatedAt: toIso(honor.updatedAt),
  }));
}

export async function getActiveCVs(): Promise<CV[]> {
  const cvs = await prisma.resume.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return cvs.map((cv) => ({
    id: cv.id,
    title: cv.title,
    description: cv.description,
    downloadLink: cv.downloadLink,
    fileName: optionalString(cv.fileName),
    fileSize: cv.fileSize ?? undefined,
    fileType: optionalString(cv.fileType),
    isActive: cv.isActive,
    createdAt: toIso(cv.createdAt),
    updatedAt: toIso(cv.updatedAt),
  }));
}

export async function getHomepageData() {
  const [profile, projects, experiences, skills, education, honors, cvs] =
    await Promise.all([
      getActivePublicProfile(),
      getAllProjects(),
      getAllExperiences(),
      getActiveSkills(),
      getActiveEducation(),
      getAllHonors(),
      getActiveCVs(),
    ]);

  return {
    profile,
    projects,
    experiences,
    skills,
    education,
    honors,
    cvs,
  };
}
