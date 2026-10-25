const internships = [
  {
    id: 1,
    company: "Northstar Labs",
    title: "Frontend Developer Intern",
    domain: "frontend",
    location: "Remote",
    type: "Paid",
    summary:
      "Build reusable UI components and improve accessibility across the product dashboard.",
    skills: ["HTML", "CSS", "JavaScript", "Accessibility"],
    details:
      "Support the design system team by creating responsive views, auditing contrast, and testing keyboard navigation for customer workflows.",
    link: "#"
  },
  {
    id: 2,
    company: "Harbor Cloud",
    title: "Backend Engineering Intern",
    domain: "backend",
    location: "New York, NY",
    type: "Hybrid",
    summary:
      "Help maintain APIs, optimize database queries, and document service contracts for internal tools.",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "Testing"],
    details:
      "Work closely with product engineers to ship reliable APIs and participate in code reviews, deployment checks, and bug triage.",
    link: "#"
  },
  {
    id: 3,
    company: "Signal Analytics",
    title: "Data Science Intern",
    domain: "data",
    location: "Austin, TX",
    type: "Paid",
    summary:
      "Analyze customer trends and prototype dashboard insights for our revenue forecasting tool.",
    skills: ["Python", "SQL", "Visualization", "Statistics"],
    details:
      "Translate raw product metrics into business-facing stories, validate assumptions with experiments, and document findings for stakeholders.",
    link: "#"
  },
  {
    id: 4,
    company: "Bloom Studio",
    title: "UX Design Intern",
    domain: "design",
    location: "Remote",
    type: "Flexible",
    summary:
      "Create interface concepts and high-fidelity prototypes for our education products.",
    skills: ["Figma", "Research", "Wireframes", "Design Systems"],
    details:
      "Support user interviews, turn research into clear flows, and iterate on accessibility patterns that meet inclusive design standards.",
    link: "#"
  },
  {
    id: 5,
    company: "CivicForge",
    title: "Product Intern",
    domain: "product",
    location: "Seattle, WA",
    type: "Full-time",
    summary:
      "Track roadmap goals, coordinate experiments, and write concise briefs for cross-functional teams.",
    skills: ["Roadmapping", "Analytics", "Stakeholder Mgmt", "Writing"],
    details:
      "Partner with engineering and design leads to prioritize user problems, present metrics, and help keep launches on schedule.",
    link: "#"
  },
  {
    id: 6,
    company: "OpenFrame",
    title: "Full-Stack Intern",
    domain: "frontend",
    location: "Remote",
    type: "Paid",
    summary:
      "Ship end-to-end features from UI mockups to API integration and QA validation.",
    skills: ["JavaScript", "React", "Node.js", "UI Testing"],
    details:
      "Join an agile product squad to convert feature requests into practical changes, review pull requests, and document UX edge cases.",
    link: "#"
  }
];

const searchInput = document.getElementById("searchInput");
const domainFilter = document.getElementById("domainFilter");
const clearFiltersButton = document.getElementById("clearFilters");
const internshipsList = document.getElementById("internshipsList");
const resultsCount = document.getElementById("resultsCount");
const totalInternships = document.getElementById("totalInternships");
const statusMessage = document.getElementById("statusMessage");
const internshipTemplate = document.getElementById("internshipTemplate");

function getFilteredInternships() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDomain = domainFilter.value;

  return internships.filter((internship) => {
    const matchesQuery =
      !query ||
      internship.title.toLowerCase().includes(query) ||
      internship.company.toLowerCase().includes(query) ||
      internship.skills.some((skill) => skill.toLowerCase().includes(query));

    const matchesDomain = selectedDomain === "all" || internship.domain === selectedDomain;
    return matchesQuery && matchesDomain;
  });
}

function showStatus(type, message) {
  statusMessage.hidden = false;
  statusMessage.textContent = message;
  statusMessage.className = `status status--${type}`;
}

function hideStatus() {
  statusMessage.hidden = true;
  statusMessage.textContent = "";
  statusMessage.className = "status";
}

function renderCards() {
  try {
    if (!Array.isArray(internships) || internships.length === 0) {
      throw new Error("No internship data available.");
    }

    const filteredInternships = getFilteredInternships();
    internshipsList.innerHTML = "";

    if (filteredInternships.length === 0) {
      showStatus("empty", "No internships match your current filters. Try another search or reset the filters.");
      resultsCount.textContent = "0 roles";
      return;
    }

    hideStatus();

    filteredInternships.forEach((internship) => {
      const fragment = internshipTemplate.content.cloneNode(true);
      const card = fragment.querySelector(".internship-card");
      const companyName = fragment.querySelector(".company-name");
      const roleTitle = fragment.querySelector(".role-title");
      const domainPill = fragment.querySelector(".domain-pill");
      const locationTag = fragment.querySelector(".location-tag");
      const typeTag = fragment.querySelector(".type-tag");
      const summary = fragment.querySelector(".summary");
      const skills = fragment.querySelector(".skills");
      const details = fragment.querySelector(".details-copy");
      const detailsPanel = fragment.querySelector(".details-panel");
      const detailsButton = fragment.querySelector(".secondary-button");
      const applyLink = fragment.querySelector(".primary-button");

      companyName.textContent = internship.company;
      roleTitle.textContent = internship.title;
      domainPill.textContent = internship.domain;
      locationTag.textContent = internship.location;
      typeTag.textContent = internship.type;
      summary.textContent = internship.summary;
      details.textContent = internship.details;
      applyLink.href = internship.link;
      applyLink.setAttribute(
        "aria-label",
        `Apply for ${internship.title} at ${internship.company}`
      );

      internship.skills.forEach((skill) => {
        const skillTag = document.createElement("span");
        skillTag.className = "skill-tag";
        skillTag.textContent = skill;
        skills.appendChild(skillTag);
      });

      detailsButton.addEventListener("click", () => {
        const isHidden = detailsPanel.hasAttribute("hidden");
        detailsPanel.toggleAttribute("hidden", !isHidden);
        detailsButton.setAttribute("aria-expanded", String(isHidden));
      });

      card.setAttribute("data-id", String(internship.id));
      card.setAttribute("aria-label", `${internship.title} role at ${internship.company}`);

      card.addEventListener("keydown", (event) => {
        const cards = [...document.querySelectorAll(".internship-card")];
        const currentIndex = cards.indexOf(card);

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          cards[(currentIndex + 1) % cards.length]?.focus();
        }

        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          cards[(currentIndex - 1 + cards.length) % cards.length]?.focus();
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          detailsButton.click();
        }
      });

      internshipsList.appendChild(fragment);
    });

    resultsCount.textContent = `${filteredInternships.length} ${filteredInternships.length === 1 ? "role" : "roles"}`;
  } catch (error) {
    internshipsList.innerHTML = "";
    showStatus("error", "Something went wrong while loading internships. Please try again later.");
    resultsCount.textContent = "0 roles";
  }
}

function handleFilterChanges() {
  renderCards();
}

searchInput.addEventListener("input", handleFilterChanges);
domainFilter.addEventListener("change", handleFilterChanges);

clearFiltersButton.addEventListener("click", () => {
  searchInput.value = "";
  domainFilter.value = "all";
  renderCards();
  searchInput.focus();
});

totalInternships.textContent = internships.length;
renderCards();
