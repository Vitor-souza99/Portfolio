'use strict';

const languageSelect = document.querySelector('#language-select');
const originalText = new WeakMap();

const copy = {
  pt: {
    title: 'Vitor Lisboa Souza | Desenvolvedor de Software, UX/UI & Dados', lang: 'pt-BR',
    nav: ['Início', 'Projetos', 'Experiência', 'Skills', 'Formação', 'Contato'],
    skip: 'Pular para o conteúdo', navLabel: 'Navegação principal', download: 'Baixar CV', menu: 'Abrir menu',
    hello: 'Olá! Eu sou', role: 'Desenvolvedor de Software', roleSupport: 'UX/UI | Dados & Produtos Digitais',
    hero: 'Graduado em Análise e Desenvolvimento de Sistemas, com experiência em desenvolvimento web, UX/UI, análise de dados, Power BI, SQL e WordPress. Desenvolvo soluções que conectam tecnologia, experiência do usuário e visão de produto.',
    heroNote: 'Transformo problemas e ideias em experiências e produtos digitais funcionais.',
    heroButtons: ['Ver projetos', 'Falar comigo'], tech: 'TECNOLOGIA COM PROPÓSITO', projectsEye: 'DA IDEIA À EXPERIÊNCIA', projectsTitle: ['Projetos em', 'destaque'],
    projectsIntro: 'Projetos onde aplico desenvolvimento, UX/UI, dados e produto para transformar ideias em soluções digitais.',
    projectMeta: ['SaaS / Produto Digital', 'EdTech / Produto Educacional', 'Desenvolvimento Web / Site Institucional', 'UX/UI / Figma', 'UX/UI / Figma', 'Business Intelligence / Data Visualization', 'Business Intelligence', 'Python / Json'],
    featured: 'Projeto principal', projectTitles: ['Aviza', 'Matemática Digital', 'Site Auto Mecânica', 'iArt', 'Ideal Quarto', 'Análise do Oscar', 'Let’s Cola', 'AWS Gamepy'],
    projectDescriptions: [
      'Plataforma SaaS criada para freelancers, profissionais autônomos e pequenas equipes gerenciarem clientes, projetos, tarefas, tempo e finanças em um único ambiente, com foco em produtividade e simplicidade.',
      'Plataforma educacional gamificada para ensino de matemática, reunindo exercícios, trilhas de aprendizagem e experiências interativas para tornar o estudo mais envolvente.',
      'Site institucional desenvolvido para apresentar os serviços de uma auto mecânica, trabalhando identidade visual, navegação, responsividade e presença digital.',
      'Protótipo de produto digital desenvolvido no Figma, explorando interface, fluxo de navegação, usabilidade e experiência mobile.',
      'Protótipo de solução digital voltada à organização e concepção de ambientes, trabalhando experiência mobile, fluxo, interface e apresentação visual.',
      'Dashboard interativo desenvolvido em Power BI para exploração e análise de dados relacionados ao Oscar, utilizando indicadores e visualizações para facilitar a interpretação das informações.',
      'Dashboard desenvolvido em Power BI para uma empresa fictícia, reunindo indicadores, KPIs e visualizações para análise de desempenho e apoio à tomada de decisão.',
      'Estudando para a prova da AWS Cloud Practitioner, criei um método próprio de estudos desenvolvendo um app em Python rodando como executável, chamado AWS Gamepy.'
    ],
    projectButtons: ['Acessar Aviza', 'Acessar plataforma', 'Ver projeto', 'Ver protótipo', 'Ver protótipo', 'Abrir dashboard', 'Abrir dashboard', 'Ver GitHub'],
    journey: 'MINHA TRAJETÓRIA', experience: 'Experiência', experienceIntro: 'Experiências que contribuíram para minha visão de tecnologia, produto, dados e comunicação.', independent: 'PROJETOS INDEPENDENTES',
    independentText: 'Desenvolvimento de produtos e experimentos próprios envolvendo SaaS, EdTech, desenvolvimento web, UX/UI e Business Intelligence.',
    jobs: ['Professor de Educação Básica (PEB) — Matemática', 'Desenvolvedor Web WordPress | UX/UI | Marketing Operacional', 'Estágio em Dados', 'Marketing Digital — Freelancer'],
    jobDescriptions: [
      'Ensino de Matemática, nivelamento e práticas experimentais para alunos do 6º ao 9º ano, envolvendo planejamento de atividades e avaliações e fortalecendo competências de comunicação e organização.',
      'Desenvolvimento e manutenção de websites em WordPress, prototipação no Figma, melhorias de UX/UI, análise de dados, CRM, documentação técnica, gestão de demandas e controles de qualidade.',
      'Extração e análise de dados, criação de relatórios em Power BI, consultas em Oracle SQL, documentação de Design System e participação em melhorias de UX.',
      'Planejamento utilizando Excel, acompanhamento de métricas de campanhas e atualização de relatórios mensais em Power BI.'
    ],
    toolbox: 'MINHA CAIXA DE FERRAMENTAS', skillsIntro: 'Tecnologias e ferramentas que utilizo em experiências profissionais e projetos.', skillTitles: ['Desenvolvimento', 'Back-end & ferramentas', 'Dados & BI', 'UX/UI, design & produto'],
    learning: 'APRENDIZADO CONTÍNUO', education: 'Formação & certificações', academic: 'FORMAÇÃO ACADÊMICA', degree: 'Análise e Desenvolvimento<br>de Sistemas', degreeType: '',
    contactEye: 'UMA BOA CONVERSA É O PRIMEIRO PASSO', contactHeading: ['Vamos', 'conversar?'], contact: 'Estou aberto a oportunidades profissionais, projetos, parcerias e novas conexões. Se quiser conversar sobre desenvolvimento, produtos digitais, UX/UI ou dados, fique à vontade para entrar em contato.',
    form: ['Nome', 'E-mail', 'Mensagem'], placeholders: ['Como posso te chamar?', 'voce@empresa.com', 'Me conte sobre sua ideia ou oportunidade...'], send: 'Enviar mensagem', formNote: 'O botão abre seu aplicativo de e-mail com a mensagem preenchida. O envio é concluído por você.',
    footer: 'Desenvolvedor de Software | UX/UI | Dados & Produtos Digitais', back: 'Voltar ao início', resume: 'Currículo', top: 'Voltar ao topo', language: 'Idioma',
    menuToggle: 'Abrir menu', visit: ' (nova aba)', native: 'Nativo', intermediate: 'Intermediário'
  },
  en: {
    title: 'Vitor Lisboa Souza | Software Developer, UX/UI & Data', lang: 'en',
    nav: ['Home', 'Projects', 'Experience', 'Skills', 'Education', 'Contact'],
    skip: 'Skip to content', navLabel: 'Main navigation', download: 'Download résumé', menu: 'Open menu',
    hello: "Hello! I'm", role: 'Software Developer', roleSupport: 'UX/UI | Data & Digital Products',
    hero: 'I hold a degree in Systems Analysis and Development and have experience in web development, UX/UI, data analysis, Power BI, SQL, and WordPress. I build solutions that connect technology, user experience, and product thinking.',
    heroNote: 'I turn problems and ideas into functional digital experiences and products.',
    heroButtons: ['View projects', 'Get in touch'], tech: 'TECHNOLOGY WITH PURPOSE', projectsEye: 'FROM IDEA TO EXPERIENCE', projectsTitle: ['Featured', 'projects'],
    projectsIntro: 'Projects where I apply development, UX/UI, data, and product thinking to turn ideas into digital solutions.',
    projectMeta: ['SaaS / Digital Product', 'EdTech / Educational Product', 'Web Development / Business Website', 'UX/UI / Figma', 'UX/UI / Figma', 'Business Intelligence / Data Visualization', 'Business Intelligence', 'Python / JSON'],
    featured: 'Featured project', projectTitles: ['Aviza', 'Digital Mathematics', 'Auto Repair Website', 'iArt', 'Ideal Quarto', 'Oscar Analysis', 'Let’s Cola', 'AWS Gamepy'],
    projectDescriptions: [
      'A SaaS platform built for freelancers, independent professionals, and small teams to manage clients, projects, tasks, time, and finances in one place, with a focus on productivity and simplicity.',
      'A gamified educational platform for learning mathematics, bringing together exercises, learning paths, and interactive experiences to make studying more engaging.',
      'A business website showcasing an auto repair shop’s services, with attention to visual identity, navigation, responsiveness, and digital presence.',
      'A digital product prototype created in Figma, exploring interface design, user flows, usability, and mobile experience.',
      'A digital solution prototype for organizing and designing spaces, exploring mobile experience, user flows, interface, and visual presentation.',
      'An interactive Power BI dashboard for exploring and analyzing Oscar-related data, using metrics and visualizations to make insights easier to understand.',
      'A Power BI dashboard for a fictional company, bringing together metrics, KPIs, and visualizations to analyze performance and support decision-making.',
      'While preparing for the AWS Cloud Practitioner exam, I created my own study method by building AWS Gamepy, a Python study app that runs as an executable.'
    ],
    projectButtons: ['Visit Aviza', 'Visit platform', 'View project', 'View prototype', 'View prototype', 'Open dashboard', 'Open dashboard', 'View on GitHub'],
    journey: 'MY JOURNEY', experience: 'Experience', experienceIntro: 'Experiences that shaped my perspective on technology, products, data, and communication.', independent: 'INDEPENDENT PROJECTS',
    independentText: 'Building my own products and experiments across SaaS, EdTech, web development, UX/UI, and Business Intelligence.',
    jobs: ['Middle School Mathematics Teacher', 'WordPress Web Developer | UX/UI | Operations Marketing', 'Data Intern', 'Digital Marketing — Freelance'],
    jobDescriptions: [
      'Teaching mathematics, foundational skills, and hands-on activities to students in grades 6–9. I plan lessons and assessments while strengthening communication and organizational skills.',
      'Developed and maintained WordPress websites, created Figma prototypes, improved UX/UI, analyzed data, worked with CRM, wrote technical documentation, managed requests, and performed quality checks.',
      'Extracted and analyzed data, created Power BI reports, wrote Oracle SQL queries, documented a design system, and contributed to UX improvements.',
      'Planned with Excel, tracked campaign metrics, and updated monthly Power BI reports.'
    ],
    toolbox: 'MY TOOLKIT', skillsIntro: 'Technologies and tools I use across professional experience and projects.', skillTitles: ['Development', 'Back-end & Tools', 'Data & BI', 'UX/UI, Design & Product'],
    learning: 'CONTINUOUS LEARNING', education: 'Education & Certifications', academic: 'EDUCATION', degree: 'Systems Analysis and<br>Development', degreeType: 'Systems Analyst',
    contactEye: 'A GOOD CONVERSATION IS THE FIRST STEP', contactHeading: ["Let's", 'talk.'], contact: "I'm open to career opportunities, projects, partnerships, and new connections. If you'd like to talk about development, digital products, UX/UI, or data, feel free to reach out.",
    form: ['Name', 'Email', 'Message'], placeholders: ['What should I call you?', 'you@company.com', 'Tell me about your idea or opportunity...'], send: 'Send message', formNote: 'This button opens your email app with the message filled in. You complete the sending process.',
    footer: 'Software Developer | UX/UI | Data & Digital Products', back: 'Back to top', resume: 'Résumé', top: 'Back to top', language: 'Language',
    menuToggle: 'Open menu', visit: ' (opens in a new tab)', native: 'Native', intermediate: 'Intermediate'
  }
};

function setText(element, value) {
  if (!element) return;
  if (!originalText.has(element)) originalText.set(element, element.textContent);
  element.textContent = value;
}

function applyLanguage(language) {
  const lang = language === 'en' ? 'en' : 'pt';
  const t = copy[lang];
  const $ = (selector) => document.querySelector(selector);
  document.documentElement.lang = t.lang;
  document.title = t.title;
  $('meta[name="description"]').content = lang === 'en'
    ? 'Portfolio of Vitor Lisboa Souza, a software developer working with digital products, web development, UX/UI, data, and Business Intelligence.'
    : 'Portfólio de Vitor Lisboa Souza, desenvolvedor de software com atuação em produtos digitais, desenvolvimento web, UX/UI, dados e Business Intelligence.';
  $('meta[property="og:locale"]').content = lang === 'en' ? 'en_US' : 'pt_BR';
  setText($('.skip'), t.skip);
  $('#navigation').setAttribute('aria-label', t.navLabel);
  $('#navigation').querySelectorAll('a').forEach((node, i) => setText(node, t.nav[i]));
  setText($('.cv span'), t.download);
  $('.menu-toggle').setAttribute('aria-label', $('.menu-toggle').getAttribute('aria-expanded') === 'true' ? (lang === 'en' ? 'Close menu' : 'Fechar menu') : t.menu);
  $('.language-picker .visually-hidden').textContent = t.language;
  languageSelect.setAttribute('aria-label', t.language);
  setText($('.hero-copy > .eyebrow'), t.tech);
  setText($('.hello'), t.hello);
  setText($('.hero-role-primary'), t.role);
  $('.hero-role-support').innerHTML = t.roleSupport;
  setText($('.hero-description'), t.hero);
  setText($('.hero-note'), t.heroNote);
  const heroButtons = document.querySelectorAll('.hero-actions a');
  if (heroButtons[0]) setText(heroButtons[0], t.heroButtons[0]);
  if (heroButtons[1]?.lastChild) heroButtons[1].lastChild.textContent = t.heroButtons[1];
  setText($('.projects-section .section-heading .eyebrow'), t.projectsEye);
  const projectHeading = $('.projects-section .section-heading h2');
  if (projectHeading) {
    projectHeading.childNodes[0].nodeValue = `${t.projectsTitle[0]} `;
    setText(projectHeading.querySelector('.gradient'), t.projectsTitle[1]);
  }
  setText($('.projects-section .section-heading p'), t.projectsIntro);
  document.querySelectorAll('.project-copy').forEach((card, i) => {
    setText(card.querySelector('h3'), t.projectTitles[i]);
    setText(card.querySelector('p'), t.projectDescriptions[i]);
    setText(card.querySelector('.project-meta span:not(.number)'), t.projectMeta[i]);
    setText(card.querySelector('.button'), t.projectButtons[i]);
  });
  setText($('.project-visual.visual-2 .browser-bar small'), lang === 'en' ? 'Digital Mathematics · Web' : 'Matemática Digital · Web');
  setText($('.project-visual.visual-3 .browser-bar small'), lang === 'en' ? 'Auto Repair Website · Web' : 'Site Auto Mecânica · Web');
  setText($('.project-visual.visual-6 .browser-bar small'), lang === 'en' ? 'Oscar Analysis · Power BI' : 'Análise do Oscar · Power BI');
  setText($('.featured-label'), t.featured);
  setText($('#experiencia .section-heading .eyebrow'), t.journey);
  const expHeading = $('#experiencia .section-heading h2');
  if (expHeading) expHeading.childNodes[0].nodeValue = `${t.experience}\n              `;
  setText($('#experiencia .section-heading p'), t.experienceIntro);
  setText($('.independent .eyebrow'), t.independent);
  setText($('.independent p'), t.independentText);
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    setText(item.querySelector('h4'), t.jobs[i]);
    setText(item.querySelector('p'), t.jobDescriptions[i]);
  });
  setText($('#skills .section-heading .eyebrow'), t.toolbox);
  setText($('#skills .section-heading p'), t.skillsIntro);
  document.querySelectorAll('.skill-card h3').forEach((node, i) => setText(node, t.skillTitles[i]));
  setText($('#formacao .section-heading .eyebrow'), t.learning);
  setText($('#formacao .section-heading h2'), t.education);
  setText($('.education-card > .eyebrow'), t.academic);
  const degreeHeading = $('.education-card h3');
  if (degreeHeading) degreeHeading.innerHTML = t.degree;
  const degreeInfo = $('.education-card > p');
  if (degreeInfo) degreeInfo.textContent = t.degreeType ? `${t.degreeType} · FATEC Americana — SP` : ' · FATEC Americana — SP';
  document.querySelectorAll('.education-card .languages strong').forEach((node, i) => setText(node, i === 0 ? t.native : t.intermediate));
  setText($('.contact-copy .eyebrow'), t.contactEye);
  const contactHeading = $('.contact-copy h2');
  if (contactHeading) {
    contactHeading.childNodes[0].nodeValue = `${t.contactHeading[0]}\n            `;
    setText(contactHeading.querySelector('.gradient'), t.contactHeading[1]);
  }
  setText($('.contact-copy > p'), t.contact);
  document.querySelectorAll('.contact-form label').forEach((node, i) => setText(node, t.form[i]));
  if ($('#name')) $('#name').placeholder = t.placeholders[0];
  if ($('#email')) $('#email').placeholder = t.placeholders[1];
  if ($('#message')) $('#message').placeholder = t.placeholders[2];
  setText($('.contact-form button'), t.send);
  setText($('#form-status'), t.formNote);
  setText($('.footer-top > p'), t.footer);
  setText($('.footer-top > a:last-child'), t.back);
  document.querySelectorAll('.footer-links a').forEach((node, i) => setText(node, [t.nav[1], t.nav[5], t.resume][i]));
  $('.floating-top').setAttribute('aria-label', t.top);
  document.querySelectorAll('a[target="_blank"][aria-label]').forEach((link) => {
    if (!originalText.has(link)) originalText.set(link, link.getAttribute('aria-label'));
    link.setAttribute('aria-label', `${originalText.get(link).replace(/ \(nova aba\)| \(opens in a new tab\)/g, '')}${t.visit}`);
  });
  languageSelect.value = lang;
  try { localStorage.setItem('portfolio-language', lang); } catch { /* storage may be disabled */ }
}

languageSelect.addEventListener('change', () => applyLanguage(languageSelect.value));
let savedLanguage = 'pt';
try { savedLanguage = localStorage.getItem('portfolio-language') || 'pt'; } catch { /* storage may be disabled */ }
applyLanguage(savedLanguage);