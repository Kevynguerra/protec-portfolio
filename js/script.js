console.log("PROTEC iniciada com sucesso!");

// 01. ANIMAÇÃO DE ENTRADA DOS PROJETOS

const projectCards = document.querySelectorAll(".project-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {
            const card = entry.target;
            const index = Array.from(projectCards).indexOf(card);

            setTimeout(() => {
                card.classList.add("show");
            }, index * 200);

            observer.unobserve(card);
        }

    });
}, {
    threshold: 0.2
});

projectCards.forEach((card) => {
    observer.observe(card);
});
// 02. SISTEMA DE DETALHES DOS PROJETOS

const projectDialog = document.querySelector("#projectDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogDescription = document.querySelector("#dialogDescription");
const dialogTech = document.querySelector("#dialogTech");


const projectDetails = {
  frontend: {
    image: "assets/projeto-frontend.webp",
    category: "DESENVOLVIMENTO FRONTEND",
    title: "Desenvolvimento Frontend",
    description: "Uma experiência digital criada para demonstrar a construção de interfaces modernas, responsivas e interativas.",
    objective: "Desenvolver uma interface profissional, unindo identidade visual, experiência do usuário e funcionalidades interativas.",
    features: [
      "Interface moderna e responsiva",
      "Animações e efeitos visuais",
      "Navegação intuitiva",
      "Adaptação para dispositivos móveis"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "",
    demo: ""
  },

  python: {
    image: "assets/projeto-python.webp",
    category: "BACKEND / AUTOMAÇÃO",
    title: "Engenharia com Python",
    description: "Uma solução planejada para trabalhar com processamento de dados, automação, integrações e inteligência artificial.",
    objective: "Construir uma aplicação capaz de processar informações, comunicar-se com serviços externos e armazenar dados de forma organizada.",
    features: [
      "Integração com APIs",
      "Conexão com banco de dados",
      "Automação de processos",
      "Possível integração com inteligência artificial"
    ],
    technologies: ["Python", "SQL", "APIs", "IA"],
    github: "",
    demo: ""
  },

  java: {
    image: "assets/projeto-java.webp",
    category: "ENGENHARIA DE SOFTWARE",
    title: "Engenharia de Software Java",
    description: "Um projeto planejado para explorar a construção de aplicações robustas, organizadas e preparadas para crescer.",
    objective: "Desenvolver uma aplicação backend com arquitetura estruturada, regras de negócio e persistência de dados.",
    features: [
      "Arquitetura organizada",
      "Desenvolvimento de APIs",
      "Regras de negócio",
      "Integração com banco de dados"
    ],
    technologies: ["Java", "Spring Boot", "SQL"],
    github: "",
    demo: ""
  }
};


// IDENTIFICAR OS BOTÕES

const detailButtons = document.querySelectorAll(".project-details-btn");

const dialogImage = document.querySelector("#dialogImage");
const dialogCategory = document.querySelector("#dialogCategory");
const dialogObjective = document.querySelector("#dialogObjective");
const dialogFeatures = document.querySelector("#dialogFeatures");
const dialogGithub = document.querySelector("#dialogGithub");
const dialogDemo = document.querySelector("#dialogDemo");

detailButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const projectId = button.dataset.project;
        const project = projectDetails[projectId];

        if (!project) return;

        dialogImage.src = project.image;
        dialogImage.alt = project.title;

        dialogCategory.textContent = project.category;
        dialogTitle.textContent = project.title;
        dialogDescription.textContent = project.description;
        dialogObjective.textContent = project.objective;

        dialogFeatures.innerHTML = project.features
            .map((feature) => `<li>${feature}</li>`)
            .join("");

        dialogTech.innerHTML = project.technologies
            .map((technology) => `<span>${technology}</span>`)
            .join("");

        dialogGithub.hidden = !project.github;
        dialogDemo.hidden = !project.demo;

        if (project.github) dialogGithub.href = project.github;
        if (project.demo) dialogDemo.href = project.demo;

        projectDialog.showModal();

    });

});

// FECHAR A JANELA

const closeProjectDialog = document.querySelector("#closeProjectDialog");

closeProjectDialog.addEventListener("click", () => {
    projectDialog.close();
});

// FECHAR CLICANDO FORA DA JANELA

projectDialog.addEventListener("click", (event) => {

    if (event.target === projectDialog) {
        projectDialog.close();
    }

});

/* 47. MENU ATIVO CONFORME A SEÇÃO */

const sections = document.querySelectorAll(
    "#inicio, #sobre, #projetos, #contato"
);

const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const currentSection = entry.target.id;

            navLinks.forEach((link) => {

                link.classList.remove("active");

                if (link.getAttribute("href") === `#${currentSection}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}, {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});

/* 50. CONTROLE DO MENU MOBILE */

const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );
});

// Fechar o menu ao clicar em um link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    });
});

// Fechar o menu ao apertar Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
    }
});

/* 52. OBSERVADOR DE ANIMAÇÕES */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

/* 59. ENVIO DO FORMULÁRIO DE CONTATO */

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
    const submitButton = contactForm.querySelector(".contact-submit");

    if (submitButton) {
        contactForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = "Enviando mensagem...";

            formStatus.textContent = "";
            formStatus.className = "form-status";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (response.ok) {
                    formStatus.textContent =
                        "Mensagem enviada com sucesso! Em breve entrarei em contato.";

                    formStatus.classList.add("success");
                    contactForm.reset();
                } else {
                    formStatus.textContent =
                        "Não foi possível enviar sua mensagem. Tente novamente.";

                    formStatus.classList.add("error");
                }

            } catch (error) {
                formStatus.textContent =
                    "Erro de conexão. Verifique sua internet e tente novamente.";

                formStatus.classList.add("error");

            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
}
/* ANO AUTOMÁTICO DO RODAPÉ */

const currentYear = document.querySelector("#currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}
