import * as React from 'react';
import './App.css';
import { useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, TimelineViews, Week, Day, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const rooms = [
    { RoomId: 1, RoomName: 'Room A', RoomCapacity: 70, RoomColor: '#FF5733' },
    { RoomId: 2, RoomName: 'Room B', RoomCapacity: 50, RoomColor: '#33FF57' },
    { RoomId: 3, RoomName: 'Room C', RoomCapacity: 40, RoomColor: '#3380FF' },
    { RoomId: 4, RoomName: 'Room D', RoomCapacity: 30, RoomColor: '#FFC300' },
];

let events = [
    // Monday - AI & Machine Learning
    { Id: 1, Subject: 'Registration & Welcome', StartTime: new Date(2025, 1, 24, 8, 0), EndTime: new Date(2025, 1, 24, 8, 30), RoomId: 1, Capacity: 72 },
    { Id: 2, Subject: 'AI & Machine Learning Trends', StartTime: new Date(2025, 1, 24, 8, 30), EndTime: new Date(2025, 1, 24, 9, 30), RoomId: 2, Capacity: 27 },
    { Id: 3, Subject: 'Deep Learning in Healthcare', StartTime: new Date(2025, 1, 24, 9, 30), EndTime: new Date(2025, 1, 24, 10, 30), RoomId: 3, Capacity: 12 },
    { Id: 4, Subject: 'NLP & Chatbots', StartTime: new Date(2025, 1, 24, 10, 30), EndTime: new Date(2025, 1, 24, 11, 0), RoomId: 4, Capacity: 68 },
    { Id: 5, Subject: 'Break', StartTime: new Date(2025, 1, 24, 11, 0), EndTime: new Date(2025, 1, 24, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 6, Subject: 'Ethical AI & Bias', StartTime: new Date(2025, 1, 24, 11, 30), EndTime: new Date(2025, 1, 24, 12, 30), RoomId: 1, Capacity: 61 },
    { Id: 7, Subject: 'AI in Financial Analysis', StartTime: new Date(2025, 1, 24, 12, 30), EndTime: new Date(2025, 1, 24, 13, 0), RoomId: 2, Capacity: 39 },
    { Id: 8, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 24, 13, 0), EndTime: new Date(2025, 1, 24, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 9, Subject: 'AI in Cybersecurity', StartTime: new Date(2025, 1, 24, 14, 0), EndTime: new Date(2025, 1, 24, 15, 0), RoomId: 3, Capacity: 53 },
    { Id: 10, Subject: 'AI for Business', StartTime: new Date(2025, 1, 24, 15, 0), EndTime: new Date(2025, 1, 24, 16, 0), RoomId: 4, Capacity: 64 },
    { Id: 11, Subject: 'Break', StartTime: new Date(2025, 1, 24, 16, 0), EndTime: new Date(2025, 1, 24, 16, 30), RoomId: null, Capacity: 0 },
    { Id: 12, Subject: 'Hands-on Workshop: Computer Vision', StartTime: new Date(2025, 1, 24, 16, 30), EndTime: new Date(2025, 1, 24, 17, 30), RoomId: 1, Capacity: 27 },
    { Id: 13, Subject: 'Panel Discussion: The Future of AI', StartTime: new Date(2025, 1, 24, 17, 30), EndTime: new Date(2025, 1, 24, 18, 0), RoomId: 2, Capacity: 41 },
    { Id: 14, Subject: 'AI-Powered Automation', StartTime: new Date(2025, 1, 24, 8, 30), EndTime: new Date(2025, 1, 24, 9, 30), RoomId: 3, Capacity: 35 },
    { Id: 15, Subject: 'AI in Robotics', StartTime: new Date(2025, 1, 24, 9, 30), EndTime: new Date(2025, 1, 24, 10, 30), RoomId: 4, Capacity: 12 },
    { Id: 16, Subject: 'Quiz on AI Innovations', StartTime: new Date(2025, 1, 24, 10, 30), EndTime: new Date(2025, 1, 24, 11, 0), RoomId: 1, Capacity: 59 },
    { Id: 17, Subject: 'Raffle Draw', StartTime: new Date(2025, 1, 24, 12, 30), EndTime: new Date(2025, 1, 24, 13, 0), RoomId: 3, Capacity: 20 },
    { Id: 18, Subject: 'AI Startup Pitches', StartTime: new Date(2025, 1, 24, 14, 0), EndTime: new Date(2025, 1, 24, 15, 0), RoomId: 2, Capacity: 43 },
    { Id: 19, Subject: 'Contest: AI Hackathon', StartTime: new Date(2025, 1, 24, 15, 0), EndTime: new Date(2025, 1, 24, 16, 0), RoomId: 3, Capacity: 38 },
    { Id: 20, Subject: 'Closing Remarks & Awards', StartTime: new Date(2025, 1, 24, 17, 30), EndTime: new Date(2025, 1, 24, 18, 0), RoomId: 4, Capacity: 51 },
    { Id: 21, Subject: 'Keynote: Future of AI', StartTime: new Date(2025, 1, 24, 8, 0), EndTime: new Date(2025, 1, 24, 8, 30), RoomId: 4, Capacity: 12 },
    { Id: 22, Subject: 'Blockchain & AI', StartTime: new Date(2025, 1, 24, 9, 30), EndTime: new Date(2025, 1, 24, 10, 30), RoomId: 1, Capacity: 29 },
    { Id: 23, Subject: 'Quantum Computing', StartTime: new Date(2025, 1, 24, 10, 30), EndTime: new Date(2025, 1, 24, 11, 0), RoomId: 2, Capacity: 62 },
    { Id: 24, Subject: 'IoT & AI Convergence', StartTime: new Date(2025, 1, 24, 14, 0), EndTime: new Date(2025, 1, 24, 15, 0), RoomId: 1, Capacity: 57 },
    { Id: 25, Subject: 'AI in Autonomous Vehicles', StartTime: new Date(2025, 1, 24, 16, 30), EndTime: new Date(2025, 1, 24, 17, 30), RoomId: 3, Capacity: 50 },

    // Tuesday - Web & Frontend Technologies
    { Id: 26, Subject: 'Registration & Welcome', StartTime: new Date(2025, 1, 25, 8, 0), EndTime: new Date(2025, 1, 25, 8, 30), RoomId: 1, Capacity: 42 },
    { Id: 27, Subject: 'Modern JavaScript Frameworks', StartTime: new Date(2025, 1, 25, 8, 30), EndTime: new Date(2025, 1, 25, 9, 30), RoomId: 2, Capacity: 26 },
    { Id: 28, Subject: 'React Performance Optimization', StartTime: new Date(2025, 1, 25, 9, 30), EndTime: new Date(2025, 1, 25, 10, 30), RoomId: 3, Capacity: 18 },
    { Id: 29, Subject: 'State Management in Vue', StartTime: new Date(2025, 1, 25, 10, 30), EndTime: new Date(2025, 1, 25, 11, 0), RoomId: 4, Capacity: 33 },
    { Id: 30, Subject: 'Break', StartTime: new Date(2025, 1, 25, 11, 0), EndTime: new Date(2025, 1, 25, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 31, Subject: 'Web Accessibility Best Practices', StartTime: new Date(2025, 1, 25, 11, 30), EndTime: new Date(2025, 1, 25, 12, 30), RoomId: 1, Capacity: 24 },
    { Id: 32, Subject: 'CSS-in-JS vs Traditional CSS', StartTime: new Date(2025, 1, 25, 12, 30), EndTime: new Date(2025, 1, 25, 13, 0), RoomId: 2, Capacity: 17 },
    { Id: 33, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 25, 13, 0), EndTime: new Date(2025, 1, 25, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 34, Subject: 'Progressive Web Apps', StartTime: new Date(2025, 1, 25, 14, 0), EndTime: new Date(2025, 1, 25, 15, 0), RoomId: 3, Capacity: 64 },
    { Id: 35, Subject: 'GraphQL & REST API Differences', StartTime: new Date(2025, 1, 25, 15, 0), EndTime: new Date(2025, 1, 25, 16, 0), RoomId: 4, Capacity: 28 },
    { Id: 36, Subject: 'Serverless Architecture in Practice', StartTime: new Date(2025, 1, 25, 16, 0), EndTime: new Date(2025, 1, 25, 17, 0), RoomId: 1, Capacity: 55 },
    { Id: 37, Subject: 'CSS Grid & Flexbox Mastery', StartTime: new Date(2025, 1, 25, 17, 0), EndTime: new Date(2025, 1, 25, 18, 0), RoomId: 2, Capacity: 45 },
    { Id: 38, Subject: 'Web Security Best Practices', StartTime: new Date(2025, 1, 25, 8, 0), EndTime: new Date(2025, 1, 25, 9, 0), RoomId: 3, Capacity: 32 },
    { Id: 39, Subject: 'JavaScript Debugging Techniques', StartTime: new Date(2025, 1, 25, 9, 0), EndTime: new Date(2025, 1, 25, 10, 0), RoomId: 4, Capacity: 50 },
    { Id: 40, Subject: 'Next.js for Production', StartTime: new Date(2025, 1, 25, 10, 30), EndTime: new Date(2025, 1, 25, 11, 30), RoomId: 1, Capacity: 62 },
    { Id: 41, Subject: 'Optimizing JavaScript for Performance', StartTime: new Date(2025, 1, 25, 11, 30), EndTime: new Date(2025, 1, 25, 12, 30), RoomId: 2, Capacity: 37 },
    { Id: 42, Subject: 'Component-Based Architecture with React', StartTime: new Date(2025, 1, 25, 12, 30), EndTime: new Date(2025, 1, 25, 13, 0), RoomId: 3, Capacity: 29 },
    { Id: 43, Subject: 'Build Real-Time Apps with WebSockets', StartTime: new Date(2025, 1, 25, 14, 0), EndTime: new Date(2025, 1, 25, 15, 0), RoomId: 4, Capacity: 31 },
    { Id: 44, Subject: 'Tailwind CSS: Utility First Design', StartTime: new Date(2025, 1, 25, 15, 0), EndTime: new Date(2025, 1, 25, 16, 0), RoomId: 1, Capacity: 54 },
    { Id: 45, Subject: 'Building Multi-Language Websites', StartTime: new Date(2025, 1, 25, 16, 0), EndTime: new Date(2025, 1, 25, 17, 0), RoomId: 2, Capacity: 60 },
    { Id: 46, Subject: 'Advanced Animations with CSS', StartTime: new Date(2025, 1, 25, 17, 0), EndTime: new Date(2025, 1, 25, 18, 0), RoomId: 3, Capacity: 23 },
    { Id: 47, Subject: 'Server-Side Rendering with React', StartTime: new Date(2025, 1, 25, 8, 0), EndTime: new Date(2025, 1, 25, 9, 0), RoomId: 4, Capacity: 35 },
    { Id: 48, Subject: 'Building RESTful APIs with Node.js', StartTime: new Date(2025, 1, 25, 9, 0), EndTime: new Date(2025, 1, 25, 10, 0), RoomId: 1, Capacity: 38 },
    { Id: 49, Subject: 'Optimizing Web Performance', StartTime: new Date(2025, 1, 25, 10, 0), EndTime: new Date(2025, 1, 25, 11, 0), RoomId: 2, Capacity: 40 },
    { Id: 50, Subject: 'JavaScript & Web Assembly', StartTime: new Date(2025, 1, 25, 11, 0), EndTime: new Date(2025, 1, 25, 12, 0), RoomId: 3, Capacity: 46 },

    // Wednesday - Cloud & DevOps
    { Id: 51, Subject: 'Registration & Welcome', StartTime: new Date(2025, 1, 26, 8, 0), EndTime: new Date(2025, 1, 26, 8, 30), RoomId: 1, Capacity: 40 },
    { Id: 52, Subject: 'Cloud Security Best Practices', StartTime: new Date(2025, 1, 26, 8, 30), EndTime: new Date(2025, 1, 26, 9, 30), RoomId: 2, Capacity: 35 },
    { Id: 53, Subject: 'CI/CD Pipelines with GitHub Actions', StartTime: new Date(2025, 1, 26, 9, 30), EndTime: new Date(2025, 1, 26, 10, 30), RoomId: 3, Capacity: 45 },
    { Id: 54, Subject: 'Serverless Computing Explained', StartTime: new Date(2025, 1, 26, 10, 30), EndTime: new Date(2025, 1, 26, 11, 0), RoomId: 4, Capacity: 50 },
    { Id: 55, Subject: 'Break', StartTime: new Date(2025, 1, 26, 11, 0), EndTime: new Date(2025, 1, 26, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 56, Subject: 'Introduction to Kubernetes', StartTime: new Date(2025, 1, 26, 11, 30), EndTime: new Date(2025, 1, 26, 12, 30), RoomId: 1, Capacity: 40 },
    { Id: 57, Subject: 'Terraform for Infrastructure as Code', StartTime: new Date(2025, 1, 26, 12, 30), EndTime: new Date(2025, 1, 26, 13, 0), RoomId: 2, Capacity: 35 },
    { Id: 58, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 26, 13, 0), EndTime: new Date(2025, 1, 26, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 59, Subject: 'Hybrid Cloud Strategies', StartTime: new Date(2025, 1, 26, 14, 0), EndTime: new Date(2025, 1, 26, 15, 0), RoomId: 3, Capacity: 45 },
    { Id: 60, Subject: 'Monitoring & Observability', StartTime: new Date(2025, 1, 26, 15, 0), EndTime: new Date(2025, 1, 26, 16, 0), RoomId: 4, Capacity: 50 },
    { Id: 61, Subject: 'Break', StartTime: new Date(2025, 1, 26, 16, 0), EndTime: new Date(2025, 1, 26, 16, 30), RoomId: null, Capacity: 0 },
    { Id: 62, Subject: 'DevOps Culture & Practices', StartTime: new Date(2025, 1, 26, 16, 30), EndTime: new Date(2025, 1, 26, 17, 30), RoomId: 1, Capacity: 40 },
    { Id: 63, Subject: 'Cloud Cost Optimization', StartTime: new Date(2025, 1, 26, 17, 30), EndTime: new Date(2025, 1, 26, 18, 0), RoomId: 2, Capacity: 35 },
    { Id: 64, Subject: 'Networking in Cloud Computing', StartTime: new Date(2025, 1, 26, 8, 30), EndTime: new Date(2025, 1, 26, 9, 30), RoomId: 3, Capacity: 45 },
    { Id: 65, Subject: 'Edge Computing Trends', StartTime: new Date(2025, 1, 26, 9, 30), EndTime: new Date(2025, 1, 26, 10, 30), RoomId: 4, Capacity: 50 },
    { Id: 66, Subject: 'GitOps in Cloud Environments', StartTime: new Date(2025, 1, 26, 10, 30), EndTime: new Date(2025, 1, 26, 11, 0), RoomId: 1, Capacity: 40 },
    { Id: 67, Subject: 'Security in DevOps', StartTime: new Date(2025, 1, 26, 11, 30), EndTime: new Date(2025, 1, 26, 12, 30), RoomId: 2, Capacity: 35 },
    { Id: 68, Subject: 'Automated Testing in DevOps', StartTime: new Date(2025, 1, 26, 12, 30), EndTime: new Date(2025, 1, 26, 13, 0), RoomId: 3, Capacity: 45 },
    { Id: 69, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 26, 13, 0), EndTime: new Date(2025, 1, 26, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 70, Subject: 'Serverless & Containerization', StartTime: new Date(2025, 1, 26, 14, 0), EndTime: new Date(2025, 1, 26, 15, 0), RoomId: 4, Capacity: 50 },
    { Id: 71, Subject: 'AI/ML in Cloud', StartTime: new Date(2025, 1, 26, 15, 0), EndTime: new Date(2025, 1, 26, 16, 0), RoomId: 1, Capacity: 40 },
    { Id: 72, Subject: 'Break', StartTime: new Date(2025, 1, 26, 16, 0), EndTime: new Date(2025, 1, 26, 16, 30), RoomId: null, Capacity: 0 },
    { Id: 73, Subject: 'Cloud-Native DevOps', StartTime: new Date(2025, 1, 26, 16, 30), EndTime: new Date(2025, 1, 26, 17, 30), RoomId: 2, Capacity: 35 },
    { Id: 74, Subject: 'Closing & Raffle Draw', StartTime: new Date(2025, 1, 26, 17, 30), EndTime: new Date(2025, 1, 26, 18, 0), RoomId: 3, Capacity: 45 },

    // Thursday - Cybersecurity
    { Id: 75, Subject: 'Registration & Welcome', StartTime: new Date(2025, 1, 27, 8, 0), EndTime: new Date(2025, 1, 27, 8, 30), RoomId: 1, Capacity: 40 },
    { Id: 76, Subject: 'Cyber Threat Intelligence', StartTime: new Date(2025, 1, 27, 8, 30), EndTime: new Date(2025, 1, 27, 9, 30), RoomId: 2, Capacity: 35 },
    { Id: 77, Subject: 'Ethical Hacking Basics', StartTime: new Date(2025, 1, 27, 9, 30), EndTime: new Date(2025, 1, 27, 10, 30), RoomId: 3, Capacity: 45 },
    { Id: 78, Subject: 'Zero Trust Security', StartTime: new Date(2025, 1, 27, 10, 30), EndTime: new Date(2025, 1, 27, 11, 0), RoomId: 4, Capacity: 50 },
    { Id: 79, Subject: 'Break', StartTime: new Date(2025, 1, 27, 11, 0), EndTime: new Date(2025, 1, 27, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 80, Subject: 'Cloud Security', StartTime: new Date(2025, 1, 27, 11, 30), EndTime: new Date(2025, 1, 27, 12, 30), RoomId: 1, Capacity: 40 },
    { Id: 81, Subject: 'Penetration Testing', StartTime: new Date(2025, 1, 27, 12, 30), EndTime: new Date(2025, 1, 27, 13, 0), RoomId: 2, Capacity: 35 },
    { Id: 82, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 27, 13, 0), EndTime: new Date(2025, 1, 27, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 83, Subject: 'Ransomware Defense', StartTime: new Date(2025, 1, 27, 14, 0), EndTime: new Date(2025, 1, 27, 15, 0), RoomId: 3, Capacity: 45 },
    { Id: 84, Subject: 'Advanced Threat Detection', StartTime: new Date(2025, 1, 27, 15, 0), EndTime: new Date(2025, 1, 27, 16, 0), RoomId: 4, Capacity: 50 },
    { Id: 85, Subject: 'Break', StartTime: new Date(2025, 1, 27, 16, 0), EndTime: new Date(2025, 1, 27, 16, 30), RoomId: null, Capacity: 0 },
    { Id: 86, Subject: 'Security Operations Centers', StartTime: new Date(2025, 1, 27, 16, 30), EndTime: new Date(2025, 1, 27, 17, 30), RoomId: 1, Capacity: 40 },
    { Id: 87, Subject: 'Threat Hunting Techniques', StartTime: new Date(2025, 1, 27, 17, 30), EndTime: new Date(2025, 1, 27, 18, 0), RoomId: 2, Capacity: 35 },
    { Id: 88, Subject: 'Closing & Networking', StartTime: new Date(2025, 1, 27, 18, 0), EndTime: new Date(2025, 1, 27, 18, 30), RoomId: 3, Capacity: 45 },

    // Friday - Data Science
    { Id: 89, Subject: 'Registration & Welcome', StartTime: new Date(2025, 1, 28, 8, 0), EndTime: new Date(2025, 1, 28, 8, 30), RoomId: 1, Capacity: 40 },
    { Id: 90, Subject: 'Introduction to Data Science', StartTime: new Date(2025, 1, 28, 8, 30), EndTime: new Date(2025, 1, 28, 9, 30), RoomId: 2, Capacity: 35 },
    { Id: 91, Subject: 'Exploratory Data Analysis', StartTime: new Date(2025, 1, 28, 9, 30), EndTime: new Date(2025, 1, 28, 10, 30), RoomId: 3, Capacity: 45 },
    { Id: 92, Subject: 'Machine Learning Overview', StartTime: new Date(2025, 1, 28, 10, 30), EndTime: new Date(2025, 1, 28, 11, 0), RoomId: 4, Capacity: 50 },
    { Id: 93, Subject: 'Break', StartTime: new Date(2025, 1, 28, 11, 0), EndTime: new Date(2025, 1, 28, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 94, Subject: 'Deep Learning Fundamentals', StartTime: new Date(2025, 1, 28, 11, 30), EndTime: new Date(2025, 1, 28, 12, 30), RoomId: 1, Capacity: 40 },
    { Id: 95, Subject: 'Natural Language Processing', StartTime: new Date(2025, 1, 28, 12, 30), EndTime: new Date(2025, 1, 28, 13, 0), RoomId: 2, Capacity: 35 },
    { Id: 96, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 28, 13, 0), EndTime: new Date(2025, 1, 28, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 97, Subject: 'Data Science in Healthcare', StartTime: new Date(2025, 1, 28, 14, 0), EndTime: new Date(2025, 1, 28, 15, 0), RoomId: 3, Capacity: 45 },
    { Id: 98, Subject: 'Time Series Forecasting', StartTime: new Date(2025, 1, 28, 15, 0), EndTime: new Date(2025, 1, 28, 16, 0), RoomId: 4, Capacity: 50 },
    { Id: 99, Subject: 'Break', StartTime: new Date(2025, 1, 28, 16, 0), EndTime: new Date(2025, 1, 28, 16, 30), RoomId: null, Capacity: 0 },
    { Id: 100, Subject: 'Big Data Analytics', StartTime: new Date(2025, 1, 28, 16, 30), EndTime: new Date(2025, 1, 28, 17, 30), RoomId: 1, Capacity: 40 },
    { Id: 101, Subject: 'AI in Data Science', StartTime: new Date(2025, 1, 28, 17, 30), EndTime: new Date(2025, 1, 28, 18, 0), RoomId: 2, Capacity: 35 },
    { Id: 102, Subject: 'Closing Remarks', StartTime: new Date(2025, 1, 28, 18, 0), EndTime: new Date(2025, 1, 28, 18, 30), RoomId: 3, Capacity: 45 },

    // (Next sessions are added till Id: 123)
    { Id: 103, Subject: 'AI in Healthcare', StartTime: new Date(2025, 1, 29, 8, 0), EndTime: new Date(2025, 1, 29, 8, 30), RoomId: 1, Capacity: 40 },
    { Id: 104, Subject: 'Data Visualization Best Practices', StartTime: new Date(2025, 1, 29, 8, 30), EndTime: new Date(2025, 1, 29, 9, 30), RoomId: 2, Capacity: 35 },
    { Id: 105, Subject: 'AI for Predictive Analytics', StartTime: new Date(2025, 1, 29, 9, 30), EndTime: new Date(2025, 1, 29, 10, 30), RoomId: 3, Capacity: 45 },
    { Id: 106, Subject: 'Ethical AI in Data Science', StartTime: new Date(2025, 1, 29, 10, 30), EndTime: new Date(2025, 1, 29, 11, 0), RoomId: 4, Capacity: 50 },
    { Id: 107, Subject: 'Break', StartTime: new Date(2025, 1, 29, 11, 0), EndTime: new Date(2025, 1, 29, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 108, Subject: 'AI Ethics & Regulation', StartTime: new Date(2025, 1, 29, 11, 30), EndTime: new Date(2025, 1, 29, 12, 30), RoomId: 1, Capacity: 40 },
    { Id: 109, Subject: 'Reinforcement Learning', StartTime: new Date(2025, 1, 29, 12, 30), EndTime: new Date(2025, 1, 29, 13, 0), RoomId: 2, Capacity: 35 },
    { Id: 110, Subject: 'Lunch Break', StartTime: new Date(2025, 1, 29, 13, 0), EndTime: new Date(2025, 1, 29, 14, 0), RoomId: null, Capacity: 0 },
    { Id: 111, Subject: 'Neural Networks Explained', StartTime: new Date(2025, 1, 29, 14, 0), EndTime: new Date(2025, 1, 29, 15, 0), RoomId: 3, Capacity: 45 },
    { Id: 112, Subject: 'Generative Adversarial Networks', StartTime: new Date(2025, 1, 29, 15, 0), EndTime: new Date(2025, 1, 29, 16, 0), RoomId: 4, Capacity: 50 },
    { Id: 113, Subject: 'Break', StartTime: new Date(2025, 1, 29, 16, 0), EndTime: new Date(2025, 1, 29, 16, 30), RoomId: null, Capacity: 0 },
    { Id: 114, Subject: 'Model Deployment & Scalability', StartTime: new Date(2025, 1, 29, 16, 30), EndTime: new Date(2025, 1, 29, 17, 30), RoomId: 1, Capacity: 40 },
    { Id: 115, Subject: 'AI in Business Intelligence', StartTime: new Date(2025, 1, 29, 17, 30), EndTime: new Date(2025, 1, 29, 18, 0), RoomId: 2, Capacity: 35 },
    { Id: 116, Subject: 'Closing Remarks', StartTime: new Date(2025, 1, 29, 18, 0), EndTime: new Date(2025, 1, 29, 18, 30), RoomId: 3, Capacity: 45 },
    { Id: 117, Subject: 'AI for Climate Change', StartTime: new Date(2025, 1, 30, 8, 0), EndTime: new Date(2025, 1, 30, 8, 30), RoomId: 1, Capacity: 40 },
    { Id: 118, Subject: 'Automated Machine Learning', StartTime: new Date(2025, 1, 30, 8, 30), EndTime: new Date(2025, 1, 30, 9, 30), RoomId: 2, Capacity: 35 },
    { Id: 119, Subject: 'Data Science for Social Good', StartTime: new Date(2025, 1, 30, 9, 30), EndTime: new Date(2025, 1, 30, 10, 30), RoomId: 3, Capacity: 45 },
    { Id: 120, Subject: 'Big Data Infrastructure', StartTime: new Date(2025, 1, 30, 10, 30), EndTime: new Date(2025, 1, 30, 11, 0), RoomId: 4, Capacity: 50 },
    { Id: 121, Subject: 'Break', StartTime: new Date(2025, 1, 30, 11, 0), EndTime: new Date(2025, 1, 30, 11, 30), RoomId: null, Capacity: 0 },
    { Id: 122, Subject: 'AI in Financial Services', StartTime: new Date(2025, 1, 30, 11, 30), EndTime: new Date(2025, 1, 30, 12, 30), RoomId: 1, Capacity: 40 },
    { Id: 123, Subject: 'Wrap-up & Networking', StartTime: new Date(2025, 1, 30, 12, 30), EndTime: new Date(2025, 1, 30, 13, 0), RoomId: 2, Capacity: 35 }
];

function isOverlapping(event1, event2) {
    return event1.RoomId === event2.RoomId &&
        ((event1.StartTime >= event2.StartTime && event1.StartTime < event2.EndTime) ||
            (event1.EndTime > event2.StartTime && event1.EndTime <= event2.EndTime) ||
            (event1.StartTime <= event2.StartTime && event1.EndTime >= event2.EndTime));
}

// Function to remove overlapping events from the events collection
function removeOverlappingEvents(events) {
    let filteredEvents = [];
    let toRemoveIndexes = new Set(); // To track events that should be removed

    // Iterate through each event
    for (let i = 0; i < events.length; i++) {
        const currentEvent = events[i];

        // Compare with all subsequent events (i + 1 onward)
        for (let j = i + 1; j < events.length; j++) {
            const compareEvent = events[j];
            if (isOverlapping(currentEvent, compareEvent)) {
                // If there's an overlap, mark the event at index j for removal
                toRemoveIndexes.add(j);
            }
        }

        // Always add the current event to the filtered list, unless it's in the remove list
        if (!toRemoveIndexes.has(i) && !checkRoomCapacity(currentEvent.RoomId, currentEvent.Capacity)) {
            filteredEvents.push(currentEvent);
        }
    }

    return filteredEvents;
}

const checkRoomAvailability = (startTime, endTime, roomId) => {
    let result = events.some((event) => {
        return (
            event.RoomId === roomId &&
            ((startTime >= event.StartTime && startTime < event.EndTime) ||
                (endTime > event.StartTime && endTime <= event.EndTime) ||
                (startTime <= event.StartTime && endTime >= event.EndTime))
        );
    });
    return result;
};



const checkRoomCapacity = (RoomId, Capacity) => {
    const room = rooms.find((room) => room.RoomId === RoomId);
    return room && room.RoomCapacity < Capacity;
}

events = removeOverlappingEvents(events);

const App = () => {
    const scheduleObj = useRef(null);

    let eventsData = events;
    const [selectedRoom, setSelectedRoom] = useState(null);

    const onActionBegin = (args) => {
        if (args.requestType === "eventCreate") {
            let eventsData = args.data[0];
            const { StartTime, EndTime, RoomId, Capacity } = eventsData;

            if (checkRoomAvailability(StartTime, EndTime, RoomId)) {
                alert('Room is already booked for this time slot.');
                args.cancel = true;
                return;
            }

            if (checkRoomCapacity(RoomId, Capacity)) {
                alert('Room cannot accommodate the number of attendees.');
                args.cancel = true;
                return;
            }
        }

    }

    const onRoomChange = (e) => {
        let value = e.value;
        setSelectedRoom(value);
        if (e.previousItem === null) {
            let resourceData = rooms.filter((calendar) => calendar.RoomId !== value);
            for (let idx = 0; idx < resourceData.length; idx++) {
                let resource = resourceData[idx];
                scheduleObj.current.removeResource(resource.RoomId, 'Rooms');
            }
        } else {
            scheduleObj.current.removeResource(e.previousItemData.RoomId, 'Rooms');
            let resourceData = rooms.filter((calendar) => calendar.RoomId === value);
            scheduleObj.current.addResource(resourceData[0], 'Rooms', value - 1);
        }

    };

    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper event-sample-wrapper'>
                <div className="schedule-container">
                    <ScheduleComponent
                        ref={scheduleObj}
                        selectedDate={new Date(2025, 1, 25)}
                        width='100%' height='650px'
                        startHour="07:00"
                        endHour="19:00"
                        eventSettings={{
                            dataSource: eventsData,
                            fields: {
                                subject: { name: 'Subject' },
                                startTime: { name: 'StartTime' },
                                endTime: { name: 'EndTime' },
                                roomId: { name: 'RoomId' },
                                description: { name: 'Capacity', title: 'Capacity' },
                                // description: { name: 'Description' },
                            },
                        }}
                        group={{ resources: ['Rooms'] }}
                        actionBegin={onActionBegin}
                    >
                        <ViewsDirective>
                            <ViewDirective option="Week" />
                            <ViewDirective option="Day" />
                            <ViewDirective option="Agenda" />
                        </ViewsDirective>
                        <ResourcesDirective>
                            <ResourceDirective
                                field="RoomId"
                                title="Conference Room"
                                name="Rooms"
                                dataSource={rooms}
                                textField="RoomName"
                                idField="RoomId"
                                colorField="RoomColor"
                            />
                        </ResourcesDirective>
                        <Inject services={[TimelineViews, Agenda, Week, Day]} />
                    </ScheduleComponent>
                </div>
                <div className='e-room-selection'>
                    <div className="title-container">
                        <h4 className="title-text">Select Room</h4>
                    </div>
                    <DropDownListComponent
                        dataSource={rooms}
                        fields={{ text: 'RoomName', value: 'RoomId' }}
                        placeholder="Select Room"
                        value={selectedRoom}
                        change={onRoomChange}
                    />

                </div>
            </div>
        </div>
    </div>);
};
export default App;