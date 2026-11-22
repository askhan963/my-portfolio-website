# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:
- Technical recruiters and hiring managers at companies evaluating Muhammad Awais Khan for full-time or contract engineering roles.
- Founders/clients evaluating him for freelance or contract full-stack and applied-AI engineering work.

Both are trying to answer the same question on this site: can this person ship real, production-grade full-stack + AI/LLM features, not just prototypes.

## Product Purpose

A personal portfolio and CMS-backed career site. It exists to generate job and contract opportunities by presenting verifiable work history, projects, skills, education, and honors. Success is a visitor forming the belief above and acting on it (contact, download CV, follow a project link).

## Positioning

Confirmed from project/experience evidence (user chose "let the audit decide" over self-selecting a claim): the defensible, unique claim is that he ships production AI/LLM features — not experiments — as part of full-stack delivery. Evidence: current role at Funavry Technologies explicitly architects Retrieval-Augmented Generation (RAG) pipelines with LangChain/LLM workflows for a shipped product (TalentedXpert); WA-Construct AI combines LangChain + LangGraph (agentic workflows) + Weaviate in a real build; Teachlytics and AgriTech are additional AI-driven, non-toy projects. A generic full-stack portfolio could not truthfully claim this breadth of applied-AI delivery alongside full-stack ownership.

## Operating Context

- Public site is server-rendered from the same MongoDB data the admin CMS (`/admin`) edits — no separate marketing-copy layer; redesign must keep reading from existing hooks/API (`useProjects`, `useExperience`, etc.) rather than hardcoding content.
- Visitor flow is a single scrolling page with anchor-based nav sections (Profile/Hero, Skills, Projects, Experience, Education, Honors, Contact), plus standalone project detail pages at `/projects/[slug]`.
- Content is maintained by the site owner alone through the admin CMS; there is no multi-author workflow.

## Capabilities and Constraints

- `Project.category` and `Skill.category` are free-text strings, not enums. There is no existing "Applied AI" category value — an Applied AI section must be assembled by selecting/filtering existing projects and the current-role experience entry that already describe real RAG/LLM/agent work, not by inventing a new taxonomy value that isn't backed by data.
- Confirmed real AI evidence to draw the Applied AI section from: projects *TalentedXpert* (LangChain, LLMs, RAG), *WA-Construct AI* (LangChain, LangGraph, Weaviate, Ollama), *Teachlytics* (LLM-based grading/plagiarism workflows), *AgriTech* (TensorFlow/computer-vision AI); experience at *Funavry Technologies* (RAG pipeline architecture, LangChain). Do not attribute AI work to projects/roles where the data doesn't state it.
- Known data-quality issues in the CMS content itself (not to be silently "fixed" by inventing different copy in the UI; flag back to the user if in scope): category value "Web Developement" (typo, should likely be "Web Development") on the CDA Citizen Portal project; duplicate "JavaScript" skill entry under both "Frontend" and "Languages" categories; "Postgre SQL" vs "PostgreSQL" naming inconsistency across skills/projects.
- No fabricated statistics, testimonials, or client logos exist or should be invented; only reuse numbers already present in existing copy (e.g. "30% increase in client business productivity", "app-store rating increased from 2.4 to 3.4", "Global Top 100 Finalist").

## Brand Commitments

- Name: Muhammad Awais Khan.
- This is an explicit redesign/rebrand request (premium dark editorial, emerald accent). The current implementation (deep violet/magenta `#c2a4ff` accent on near-black `#0b080c`, glow-heavy gradients) is incumbent evidence and anti-reference only — nothing about its specific palette or effects is a binding constraint for the new direction.

## Evidence on Hand

Real CMS content confirmed by direct query (do not invent beyond this):
- 9 projects across categories "Computer Science", "Web Development"/"Web Developement", "Mobile Application", "AI / Machine Learning": VR MathQuest Adventures, AgriTech, Aware Edge LMS, My Islamabad, TalentedXpert, WA-Construct AI, Teachlytics, Pakistan Estate Office Portal, CDA Citizen Portal.
- 6 experience entries (Freelance, GDSC CUI-ATD, WEBSTERS, Tech Avenue Pvt Ltd [2 roles], EssayShark, Funavry Technologies), each with real bullet descriptions.
- 7 honors/certificates (GDSC Solution Challenge Top 100 Finalist, Simplilearn/freeCodeCamp/GDSC certificates).
- ~30 skill entries across Frontend/Backend/Database/Languages/Tools/Mobile/DevOps/Design categories.

## Product Principles

1. Credibility over polish: every claim the redesign surfaces must trace to existing CMS data; no invented metrics or testimonials.
2. Serve both audiences in one pass: recruiters and founders/clients should each find what they need without separate tracks.
3. Full-stack + applied-AI are both load-bearing: neither should be presented as decoration on the other — the AI work is real production engineering, not a sidebar.
4. Content stays owner-editable: the new design must keep rendering from the existing admin-managed data model, not hardcode a one-time copy pass.
