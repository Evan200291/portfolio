module.exports = [
  {
    slug: 'predictive-cloud-autoscaling',
    title: 'Predictive Cloud Autoscaling',
    eyebrow: 'BSc (Hons) Dissertation',
    period: 'Oct 2024 - Mar 2025',
    category: 'Machine Learning + Cloud',
    summary: 'A predictive autoscaling system that forecasts CPU and RAM demand from cloud traces, then informs proactive container scaling.',
    description: 'My BSc (Hons) dissertation investigated proactive cloud resource management with Google Cloud trace data. I developed and evaluated complementary LSTM and ARIMA forecasting pipelines for CPU and RAM utilization, translating forecasts into Docker-based scaling decisions so capacity can be adjusted before demand causes resource pressure.',
    impact: [
      'Prepared historical VM metrics for chronological training and held-out validation, preserving the time-series sequence.',
      'Built a 64-unit LSTM with attention, batch normalization, dropout, and dual CPU/RAM prediction heads.',
      'Implemented per-machine ARIMA forecasting: (1,1,0) for CPU and (1,1,1) for memory behavior.',
      'Evaluated real-time predictions with MAE, MAPE, RMSE, and R-squared; the reported sample achieved CPU/RAM MAE of 6.70/6.34 and MAPE of 12.49%/10.77%.',
      'Connected predicted demand to Docker container scaling to reduce over-provisioning while protecting performance.'
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'statsmodels', 'LSTM', 'ARIMA', 'Docker', 'Google Cloud Trace Data'],
    accent: '#6ee7ff',
    symbol: '01',
    featured: true
  },
  {
    slug: 'video-conferencing-research',
    title: 'Video Conferencing at Global Scale',
    eyebrow: 'Computing Research Project',
    period: 'Apr 2022 - Sep 2022',
    category: 'Research + UX',
    summary: 'A mixed-method study of accessibility, performance, and user experience during the rapid global shift to remote collaboration.',
    description: 'The research investigated how enterprise video-conferencing platforms performed under sudden worldwide strain during the COVID-19 pandemic. It combined literature review, quantitative surveys, and user feedback synthesis to identify product and infrastructure bottlenecks.',
    impact: [
      'Evaluated scalability, accessibility, and reliability across enterprise platforms.',
      'Designed and deployed a quantitative user-experience survey.',
      'Mapped reported friction to interface and system-level constraints.',
      'Proposed practical improvements for high-load remote work environments.'
    ],
    stack: ['UX Research', 'Survey Design', 'Data Analysis', 'Literature Review'],
    accent: '#a78bfa',
    symbol: '02',
    featured: true
  },
  {
    slug: 'iot-circuit-breaker',
    title: 'IoT Circuit Breaker',
    eyebrow: 'Internet of Things Project',
    period: 'Oct 2020 - Dec 2020',
    category: 'IoT + Automation',
    summary: 'A remote home-electronics control concept designed around practical automation, reliability, and user acceptance.',
    description: 'The Internet Circuit Breaker explored the influence of connected devices on everyday life through a working home-automation concept. It enabled remote control of household electronic systems and used peer feedback to refine the system architecture.',
    impact: [
      'Built a remote control workflow for household electronic systems.',
      'Designed the project around practical daily-life automation.',
      'Directed user-acceptance testing with academic peers.',
      'Applied qualitative feedback to improve reliability and architecture.'
    ],
    stack: ['IoT', 'Embedded Systems', 'Home Automation', 'UAT'],
    accent: '#34d399',
    symbol: '03',
    featured: true
  },
  {
    slug: 'secure-commerce-infrastructure',
    title: 'Secure Commerce Infrastructure',
    eyebrow: 'Freelance Infrastructure',
    period: 'Jan 2025 - Present',
    category: 'Linux + Security',
    summary: 'Production Linux hosting, DNS orchestration, TLS deployment, and hardened reverse-proxy architecture for commerce platforms.',
    description: 'A continuing infrastructure engagement covering Linux virtual environments for e-commerce, including bananagameshop.com and atomgameshop.com. The work joins domain operations, TLS lifecycle management, reverse proxying, firewall configuration, and specialized port binding into a secure operating model.',
    impact: [
      'Maintained Linux-based virtual environments for e-commerce workloads.',
      'Implemented SSL/TLS across client domains for secure transactions.',
      'Orchestrated DNS-to-server binding and Nginx reverse proxy rules.',
      'Performed updates, firewall configuration, and port-binding audits.'
    ],
    stack: ['Linux', 'Nginx', 'SSL/TLS', 'DNS', 'VDS/VPS', 'Docker'],
    accent: '#f59e0b',
    symbol: '04',
    featured: true
  },
  {
    slug: 'kaithainkha-designer-portfolio',
    title: 'Kaithainkha.me',
    eyebrow: 'Client Web Project',
    period: 'Live portfolio website',
    category: 'Web Design + Development',
    summary: 'A tailored portfolio website created for a UI/UX designer to present their work with clarity and a strong visual identity.',
    description: 'I designed and built kaithainkha.me as a public-facing portfolio for a UI/UX designer. The project focuses on translating the designer\'s visual practice into a responsive, easy-to-navigate web experience that gives their case studies, process, and professional identity a clear digital home.',
    impact: [
      'Designed and developed a dedicated portfolio experience for a UI/UX professional.',
      'Organized the site around clear project discovery and a polished presentation of design work.',
      'Applied responsive implementation so the portfolio remains effective across desktop and mobile screens.',
      'Delivered a live, maintainable web presence that the designer can use to present their work professionally.'
    ],
    stack: ['Responsive Web Design', 'UI Implementation', 'Portfolio Architecture', 'Accessibility'],
    liveUrl: 'https://kaithainkha.me',
    accent: '#fb7185',
    symbol: '05',
    featured: true
  }
];
