import * as React from 'react';
import './App.css';
import { useRef, useState } from 'react';
import {
    ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective,
    TimelineViews, Week, Day, Agenda, Inject, DragAndDrop, ExcelExport, Print
} from '@syncfusion/ej2-react-schedule';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { Internationalization, closest, addClass, remove, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { TabComponent, TabItemsDirective, TabItemDirective } from '@syncfusion/ej2-react-navigations';

const rooms = [
    { RoomId: 1, RoomName: 'Room A', RoomCapacity: 110, RoomColor: '#FF5733' },
    { RoomId: 2, RoomName: 'Room B', RoomCapacity: 100, RoomColor: '#33FF57' },
    { RoomId: 3, RoomName: 'Room C', RoomCapacity: 100, RoomColor: '#3380FF' },
    { RoomId: 4, RoomName: 'Room D', RoomCapacity: 100, RoomColor: '#FFC300' },
];

let events = [

    // Room 1 - February 24
    {
        Id: 1,
        Title: 'AI for Business Automation',
        Subject: 'The Impact of AI on Business Efficiency',
        StartTime: new Date(2025, 1, 24, 9, 0),
        EndTime: new Date(2025, 1, 24, 10, 0),
        RoomId: 1,
        Capacity: 110,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'Exploring how AI is transforming business processes and increasing efficiency.'
            }
        ],
        Description: 'Overview of AI and how it’s transforming business operations, enhancing productivity, and driving innovation.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers, Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Artificial Intelligence', 'Business Automation', 'Machine Learning']
    },
    {
        Id: 2,
        Title: 'AI for Business Automation',
        Subject: 'Short Break for Relaxation',
        StartTime: new Date(2025, 1, 24, 10, 0),
        EndTime: new Date(2025, 1, 24, 10, 30),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Take a short break to refresh and network with fellow attendees.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Networking', 'Relaxation']
    },
    {
        Id: 3,
        Title: 'AI for Business Automation',
        Subject: 'AI-Driven Business Intelligence: Improving Decision-Making',
        StartTime: new Date(2025, 1, 24, 10, 30),
        EndTime: new Date(2025, 1, 24, 11, 15),
        RoomId: 1,
        Capacity: 110,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'How AI and machine learning enhance business intelligence tools for smarter decision-making.'
            }
        ],
        Description: 'How AI and machine learning enhance business intelligence tools to make better, more data-driven decisions.',
        Duration: '30 minutes',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers, Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Artificial Intelligence', 'Business Intelligence', 'Machine Learning']
    },
    {
        Id: 4,
        Title: 'AI for Business Automation',
        Subject: 'Implementing AI-Powered Automation in Business',
        StartTime: new Date(2025, 1, 24, 11, 30),
        EndTime: new Date(2025, 1, 24, 12, 0),
        RoomId: 1,
        Capacity: 110,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'A deep dive into real-world applications of AI-powered automation in various industries.'
            }
        ],
        Description: 'Exploring real-world applications of AI-powered automation in various sectors, including customer service, logistics, and marketing.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers, Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Artificial Intelligence', 'Automation', 'Machine Learning']
    },
    {
        Id: 5,
        Title: 'AI for Business Automation',
        Subject: 'Networking and Lunch',
        StartTime: new Date(2025, 1, 24, 12, 0),
        EndTime: new Date(2025, 1, 24, 13, 0),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Enjoy lunch and connect with peers during the break.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Networking', 'Lunch']
    },
    {
        Id: 6,
        Title: 'AI for Business Automation',
        Subject: 'AI for Customer Engagement and Personalization',
        StartTime: new Date(2025, 1, 24, 13, 0),
        EndTime: new Date(2025, 1, 24, 15, 0),
        RoomId: 1,
        Capacity: 110,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'Using AI to create personalized customer experiences through targeted recommendations and services.'
            },
            {
                name: 'Sophia Collins',
                title: 'Customer Experience Strategist',
                note: 'Specializing in integrating AI for enhancing customer engagement and building personalized journeys.'
            }
        ],
        Description: 'Discussing the application of AI in creating personalized customer experiences, such as product recommendations and tailored content.',
        Duration: '2 hours',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers, Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Artificial Intelligence', 'Customer Engagement', 'Personalization']
    },
    {
        Id: 7,
        Title: 'AI for Business Automation',
        Subject: 'Coffee Break and Networking',
        StartTime: new Date(2025, 1, 24, 15, 0),
        EndTime: new Date(2025, 1, 24, 15, 30),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Enjoy a coffee break and network with your peers.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All participants',
        EventLevel: 'All levels',
        EventTags: ['Networking', 'Coffee Break']
    },
    {
        Id: 8,
        Title: 'AI for Business Automation',
        Subject: 'Implementing AI-Powered Automation in Business',
        StartTime: new Date(2025, 1, 24, 15, 30),
        EndTime: new Date(2025, 1, 24, 16, 30),
        RoomId: 1,
        Capacity: 110,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'A deep dive into real-world applications of AI-powered automation in various industries.'
            }
        ],
        Description: 'Exploring real-world applications of AI-powered automation in various sectors, including customer service, logistics, and marketing.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers, Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Artificial Intelligence', 'Automation', 'Machine Learning']
    },
    {
        Id: 9,
        Title: 'AI for Business Automation',
        Subject: 'Panel Discussion: The Future of AI in Business Automation',
        StartTime: new Date(2025, 1, 24, 17, 0),
        EndTime: new Date(2025, 1, 24, 18, 0),
        RoomId: 1,
        Capacity: 110,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'Industry experts discuss the next big steps for AI technologies in business automation and upcoming trends.'
            },
            {
                name: 'Sophia Collins',
                title: 'Machine Learning Expert',
                note: 'Insights into the future impact of AI on industries such as retail, healthcare, and logistics.'
            }
        ],
        Description: 'Panel discussion featuring industry experts who share their insights into the future of AI in business automation.',
        Duration: '1 hour',
        EventType: 'Panel Discussion',
        TargetAudience: 'Developers, Engineers, Business Analysts, Managers',
        EventLevel: 'Advanced',
        EventTags: ['Artificial Intelligence', 'Business Automation', 'Future Trends']
    },


    // Room 2 - February 24
    {
        Id: 10,
        Title: 'Database Systems and Data Management',
        Subject: 'Introduction to Relational Databases',
        StartTime: new Date(2025, 1, 24, 9, 15),
        EndTime: new Date(2025, 1, 24, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'James White',
                title: 'Database Expert',
                note: 'Understanding the foundations of relational databases and their role in business.'
            }
        ],
        Description: 'This session will introduce the fundamentals of relational databases and how they’re applied in modern enterprises.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Database Administrators, Data Analysts',
        EventLevel: 'Beginner',
        EventTags: ['Database Management', 'SQL', 'Data Modeling']
    },
    {
        Id: 11,
        Title: 'Database Systems and Data Management',
        Subject: 'Optimizing SQL Queries for Performance',
        StartTime: new Date(2025, 1, 24, 11, 0),
        EndTime: new Date(2025, 1, 24, 11, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'James White',
                title: 'Database Expert',
                note: 'Techniques and strategies for improving the performance of SQL queries in large databases.'
            }
        ],
        Description: 'In this session, we will dive into SQL query optimization strategies to enhance database performance.',
        Duration: '30 minutes',
        EventType: 'Technical Session',
        TargetAudience: 'Database Administrators, Developers, Data Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['SQL Optimization', 'Performance Tuning', 'Database Administration']
    },
    {
        Id: 12,
        Title: 'Database Systems and Data Management',
        Subject: 'Database Security Best Practices',
        StartTime: new Date(2025, 1, 24, 11, 30),
        EndTime: new Date(2025, 1, 24, 12, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Green',
                title: 'Security Analyst',
                note: 'Exploring best practices for securing databases and ensuring the protection of sensitive data.'
            }
        ],
        Description: 'Learn the best practices for securing databases, including encryption, access control, and backup strategies.',
        Duration: '1 hour 30 minutes',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Database Administrators, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Database Security', 'Encryption', 'Data Protection']
    },
    {
        Id: 13,
        Title: 'Database Systems and Data Management',
        Subject: 'Advanced Database Architectures',
        StartTime: new Date(2025, 1, 24, 13, 30),
        EndTime: new Date(2025, 1, 24, 14, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'James White',
                title: 'Database Expert',
                note: 'Exploring next-generation database architectures, including NoSQL and distributed databases.'
            }
        ],
        Description: 'A deep dive into the most advanced database architectures and how they are being applied in the modern world.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Database Architects, Developers, Engineers',
        EventLevel: 'Advanced',
        EventTags: ['NoSQL', 'Distributed Databases', 'Database Design']
    },
    {
        Id: 14,
        Title: 'Database Systems and Data Management',
        Subject: 'Database Troubleshooting and Performance Monitoring',
        StartTime: new Date(2025, 1, 24, 14, 30),
        EndTime: new Date(2025, 1, 24, 15, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Green',
                title: 'Database Administrator',
                note: 'Techniques and tools for troubleshooting database performance issues in a live environment.'
            }
        ],
        Description: 'Learn to troubleshoot and monitor databases effectively, ensuring seamless database performance.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Database Administrators, System Engineers, IT Support',
        EventLevel: 'Advanced',
        EventTags: ['Database Performance', 'Troubleshooting', 'Monitoring']
    },
    {
        Id: 61,
        Subject: 'Break',
        StartTime: new Date(2025, 1, 24, 15, 0),
        EndTime: new Date(2025, 1, 24, 15, 30),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'Short break to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 16,
        Title: 'Database Systems and Data Management',
        Subject: 'Panel Discussion: The Future of Databases',
        StartTime: new Date(2025, 1, 24, 15, 30),
        EndTime: new Date(2025, 1, 24, 17, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'James White',
                title: 'Database Expert',
                note: 'A panel discussion featuring experts in database technology and their visions of the future of databases.'
            },
            {
                name: 'Sophia Green',
                title: 'Security Analyst',
                note: 'Security concerns and the next wave of database technology.'
            }
        ],
        Description: 'Panel discussion exploring emerging trends, new database technologies, and the future of data management.',
        Duration: '1 hour',
        EventType: 'Panel Discussion',
        TargetAudience: 'Developers, Data Scientists, Database Administrators',
        EventLevel: 'Advanced',
        EventTags: ['Future of Databases', 'Emerging Trends', 'Panel Discussion']
    },

    // Room 3 - February 24 (Expanded)
    {
        Id: 17,
        Title: 'Networking Strategies for Tech Professionals',
        Subject: 'Building a Professional Network in Tech',
        StartTime: new Date(2025, 1, 24, 9, 0),
        EndTime: new Date(2025, 1, 24, 10, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ella Roberts',
                title: 'Tech Networking Specialist',
                note: 'Strategies for building meaningful professional relationships within the technology industry.'
            }
        ],
        Description: 'This session covers effective strategies for building a professional network in the tech industry.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Tech Professionals, Entrepreneurs, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Networking', 'Career Development', 'Professional Growth']
    },
    {
        Id: 18,
        Title: 'Networking Strategies for Tech Professionals',
        Subject: 'Leveraging LinkedIn for Professional Networking',
        StartTime: new Date(2025, 1, 24, 11, 0),
        EndTime: new Date(2025, 1, 24, 12, 15),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ella Roberts',
                title: 'Tech Networking Specialist',
                note: 'Learn how to use LinkedIn to connect with professionals and enhance career opportunities.'
            }
        ],
        Description: 'A session focused on utilizing LinkedIn to build a strong professional network and increase career opportunities.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Entrepreneurs, Job Seekers',
        EventLevel: 'Beginner',
        EventTags: ['Networking', 'LinkedIn', 'Career Growth']
    },
    {
        Id: 19,
        Title: 'Networking Strategies for Tech Professionals',
        Subject: 'Networking at Conferences and Meetups',
        StartTime: new Date(2025, 1, 24, 12, 30),
        EndTime: new Date(2025, 1, 24, 14, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ella Roberts',
                title: 'Tech Networking Specialist',
                note: 'Practical advice on making meaningful connections at conferences and tech meetups.'
            }
        ],
        Description: 'Tech professionals will learn how to make lasting connections while attending conferences and meetups.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Entrepreneurs, Tech Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Networking', 'Conferences', 'Tech Meetups']
    },
    {
        Id: 21,
        Title: 'Networking Strategies for Tech Professionals',
        Subject: 'Building an Online Presence for Career Growth',
        StartTime: new Date(2025, 1, 24, 15, 0),
        EndTime: new Date(2025, 1, 24, 17, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ella Roberts',
                title: 'Tech Networking Specialist',
                note: 'Learn how to build and leverage an online presence to boost your career in the tech industry.'
            }
        ],
        Description: 'Building an online presence is key to career growth in tech. This session will teach participants how to do it effectively.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Entrepreneurs, Job Seekers',
        EventLevel: 'Intermediate',
        EventTags: ['Networking', 'Online Presence', 'Career Growth']
    },


    // Room 4 - February 24 (Expanded)
    {
        Id: 22,
        Title: 'Cloud Computing and Architecture',
        Subject: 'Introduction to Cloud Computing',
        StartTime: new Date(2025, 1, 24, 9, 0),
        EndTime: new Date(2025, 1, 24, 10, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Miller',
                title: 'Cloud Architect',
                note: 'Exploring the fundamentals of cloud computing and its impact on business and technology.'
            }
        ],
        Description: 'This session provides an introduction to cloud computing, its advantages, and the different cloud service models.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Engineers, IT Architects',
        EventLevel: 'Beginner',
        EventTags: ['Cloud Computing', 'Cloud Services', 'Infrastructure as a Service']
    },
    {
        Id: 23,
        Title: 'Cloud Computing and Architecture',
        Subject: 'Choosing the Right Cloud Provider for Your Business',
        StartTime: new Date(2025, 1, 24, 10, 30),
        EndTime: new Date(2025, 1, 24, 11, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Miller',
                title: 'Cloud Architect',
                note: 'Guidelines for selecting the right cloud provider based on business needs and scalability.'
            }
        ],
        Description: 'This session will help you evaluate cloud providers and choose the best option for your organization.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IT Decision Makers, Developers, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Providers', 'Cloud Architecture', 'Scalability']
    },
    {
        Id: 24,
        Title: 'Cloud Computing and Architecture',
        Subject: 'Building Scalable Cloud Architectures',
        StartTime: new Date(2025, 1, 24, 11, 0),
        EndTime: new Date(2025, 1, 24, 12, 0),
        RoomId: 4,
        Capacity: 90,
        Speakers: [
            {
                name: 'Emily Walker',
                title: 'Cloud Solutions Architect',
                note: 'Learn how to design and deploy scalable cloud infrastructures for modern applications.'
            }
        ],
        Description: 'In this session, you will learn best practices for building scalable and resilient cloud architectures.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Architects, Developers, IT Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Architecture', 'Scalability', 'Cloud Solutions']
    },
    {
        Id: 25,
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 24, 12, 0),
        EndTime: new Date(2025, 1, 24, 13, 0),
        RoomId: 4,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch Break for attendees to relax and network.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Networking', 'Break']
    },
    {
        Id: 26,
        Title: 'Cloud Computing and Architecture',
        Subject: 'Cloud Security Best Practices',
        StartTime: new Date(2025, 1, 24, 13, 0),
        EndTime: new Date(2025, 1, 24, 14, 0),
        RoomId: 4,
        Capacity: 90,
        Speakers: [
            {
                name: 'Michael Davis',
                title: 'Cloud Security Specialist',
                note: 'Learn the best security practices for ensuring the safety of your data in the cloud.'
            }
        ],
        Description: 'This session covers cloud security strategies, focusing on protecting your data and maintaining compliance.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, IT Professionals, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Security', 'Data Protection', 'Compliance']
    },
    {
        Id: 27,
        Title: 'Cloud Computing and Architecture',
        Subject: 'Containerization and Cloud-Native Applications',
        StartTime: new Date(2025, 1, 24, 14, 30),
        EndTime: new Date(2025, 1, 24, 15, 30),
        RoomId: 4,
        Capacity: 90,
        Speakers: [
            {
                name: 'Sarah Lee',
                title: 'Cloud-Native Expert',
                note: 'Exploring how containerization technologies like Docker and Kubernetes are transforming cloud-native applications.'
            }
        ],
        Description: 'This session will dive into the world of containerization and its application in cloud-native environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Architects, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Containers', 'Cloud-Native', 'Kubernetes']
    },
    {
        Id: 28,
        Title: 'Cloud Computing and Architecture',
        Subject: 'Panel Discussion: The Future of Cloud Computing',
        StartTime: new Date(2025, 1, 24, 16, 30),
        EndTime: new Date(2025, 1, 24, 18, 0),
        RoomId: 4,
        Capacity: 80,
        Speakers: [
            {
                name: 'David Miller',
                title: 'Cloud Architect',
                note: 'Industry leaders discuss the future of cloud computing, new trends, and emerging technologies.'
            },
            {
                name: 'Emily Walker',
                title: 'Cloud Solutions Architect',
                note: 'Insights into the evolving role of cloud computing in the modern tech landscape.'
            }
        ],
        Description: 'A panel of cloud computing experts will discuss the future of cloud architecture, emerging trends, and upcoming challenges.',
        Duration: '1 hour',
        EventType: 'Panel Discussion',
        TargetAudience: 'Cloud Architects, Developers, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Computing', 'Future Trends', 'Emerging Technologies']
    },

    // Room 1 - February 25
    {
        Id: 17,
        Title: 'DevOps and Continuous Integration',
        Subject: 'Introduction to DevOps Practices',
        StartTime: new Date(2025, 1, 25, 9, 30),
        EndTime: new Date(2025, 1, 25, 10, 45),
        RoomId: 1,
        Capacity: 90,
        Speakers: [
            {
                name: 'John Carter',
                title: 'DevOps Engineer',
                note: 'Understanding the key principles of DevOps and how it helps streamline software development processes.'
            }
        ],
        Description: 'This session introduces the core principles of DevOps, including continuous integration and continuous delivery.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, DevOps Engineers, IT Professionals',
        EventLevel: 'Beginner',
        EventTags: ['DevOps', 'Continuous Integration', 'Agile Development']
    },
    {
        Id: 18,
        Title: 'DevOps and Continuous Integration',
        Subject: 'Automating CI/CD Pipelines with Jenkins',
        StartTime: new Date(2025, 1, 25, 11, 15),
        EndTime: new Date(2025, 1, 25, 12, 30),
        RoomId: 1,
        Capacity: 80,
        Speakers: [
            {
                name: 'John Carter',
                title: 'DevOps Engineer',
                note: 'Learn how to set up automated CI/CD pipelines using Jenkins for streamlined software deployment.'
            }
        ],
        Description: 'In this session, we’ll walk through the process of setting up and automating CI/CD pipelines using Jenkins.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, DevOps Engineers, IT Managers',
        EventLevel: 'Intermediate',
        EventTags: ['CI/CD', 'Jenkins', 'Automation']
    },
    {
        Id: 19,
        Title: 'DevOps and Continuous Integration',
        Subject: 'Scaling DevOps in Large Organizations',
        StartTime: new Date(2025, 1, 25, 14, 0),
        EndTime: new Date(2025, 1, 25, 16, 0),
        RoomId: 1,
        Capacity: 70,
        Speakers: [
            {
                name: 'Emily Carter',
                title: 'Senior DevOps Engineer',
                note: 'Explore strategies for scaling DevOps practices across larger teams and enterprises.'
            }
        ],
        Description: 'This session will cover strategies to scale DevOps practices in large organizations, ensuring smoother workflows and faster deployment.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Enterprise DevOps Engineers, IT Managers, Senior Developers',
        EventLevel: 'Advanced',
        EventTags: ['Scaling DevOps', 'Enterprise Solutions', 'Agile Development']
    },
    {
        Id: 21,
        Title: 'DevOps and Continuous Integration',
        Subject: 'Advanced Continuous Integration Practices',
        StartTime: new Date(2025, 1, 25, 16, 30),
        EndTime: new Date(2025, 1, 25, 17, 30),
        RoomId: 1,
        Capacity: 90,
        Speakers: [
            {
                name: 'John Carter',
                title: 'DevOps Engineer',
                note: 'Advanced techniques in automating CI/CD processes, including blue/green deployments.'
            }
        ],
        Description: 'This session will focus on advanced CI/CD automation strategies, including advanced Jenkins features, blue/green deployment strategies, and more.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Senior Developers, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['CI/CD', 'Jenkins', 'Advanced Automation']
    },

    // Room 2 - February 25
    {
        Id: 33,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Introduction to Cybersecurity',
        StartTime: new Date(2025, 1, 25, 9, 0),
        EndTime: new Date(2025, 1, 25, 10, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Walker',
                title: 'Cybersecurity Specialist',
                note: 'Overview of cybersecurity concepts and its significance in modern IT infrastructure.'
            }
        ],
        Description: 'Introduction to cybersecurity threats and their impact on modern IT infrastructure.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, IT Professionals, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Cybersecurity', 'IT Infrastructure', 'Security']
    },
    {
        Id: 34,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Network Security and Threats',
        StartTime: new Date(2025, 1, 25, 10, 0),
        EndTime: new Date(2025, 1, 25, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Walker',
                title: 'Cybersecurity Specialist',
                note: 'Exploring the most common network security threats and how to protect your infrastructure.'
            }
        ],
        Description: 'An in-depth session on network security, common threats, and methods for protecting your infrastructure.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Security Specialists, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Network Security', 'Threats', 'Infrastructure']
    },
    {
        Id: 2,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Short Break for Relaxation',
        StartTime: new Date(2025, 1, 25, 10, 0),
        EndTime: new Date(2025, 1, 25, 10, 30),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'Take a short break to refresh and network with fellow attendees.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All attendees',
        EventLevel: 'All levels',
        EventTags: ['Networking', 'Relaxation']
    },
    {
        Id: 35,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Firewalls and Intrusion Detection Systems',
        StartTime: new Date(2025, 1, 25, 10, 30),
        EndTime: new Date(2025, 1, 25, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Scott',
                title: 'Network Security Expert',
                note: 'How to configure and manage firewalls and intrusion detection systems to safeguard your network.'
            }
        ],
        Description: 'Techniques for configuring firewalls and intrusion detection systems (IDS) to prevent network attacks.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Administrators, Security Engineers, System Admins',
        EventLevel: 'Intermediate',
        EventTags: ['Firewall', 'IDS', 'Network Security']
    },
    {
        Id: 36,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Encryption and Data Protection',
        StartTime: new Date(2025, 1, 25, 13, 0),
        EndTime: new Date(2025, 1, 25, 14, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Scott',
                title: 'Network Security Expert',
                note: 'Exploring encryption techniques and how they are used to protect sensitive data.'
            }
        ],
        Description: 'An overview of encryption protocols and strategies to protect sensitive information across networks.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, IT Professionals, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Encryption', 'Data Protection', 'Security']
    },
    {
        Id: 38,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Cloud Security Practices',
        StartTime: new Date(2025, 1, 25, 14, 0),
        EndTime: new Date(2025, 1, 25, 15, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Walker',
                title: 'Cybersecurity Specialist',
                note: 'Best practices for securing cloud environments against cyber threats.'
            }
        ],
        Description: 'Learn cloud security best practices and how to ensure the security of your data and applications in the cloud.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Security Specialists, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Security', 'Cybersecurity', 'Cloud Infrastructure']
    },
    {
        Id: 61,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Break',
        StartTime: new Date(2025, 1, 25, 15, 0),
        EndTime: new Date(2025, 1, 25, 15, 30),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'Short break to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 39,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Incident Response and Recovery',
        StartTime: new Date(2025, 1, 25, 15, 30),
        EndTime: new Date(2025, 1, 25, 16, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Scott',
                title: 'Network Security Expert',
                note: 'Discussing incident response strategies and recovery techniques in the event of a cyberattack.'
            }
        ],
        Description: 'Techniques and strategies for responding to cybersecurity incidents and recovering from data breaches and attacks.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Incident Response Teams, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Incident Response', 'Cybersecurity', 'Recovery']
    },
    {
        Id: 40,
        Title: 'Cybersecurity in Modern IT Infrastructure',
        Subject: 'Panel Discussion: The Future of Cybersecurity',
        StartTime: new Date(2025, 1, 25, 16, 15),
        EndTime: new Date(2025, 1, 25, 18, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Walker',
                title: 'Cybersecurity Specialist',
                note: 'Experts discuss the evolving landscape of cybersecurity and the technologies shaping the future.'
            },
            {
                name: 'Olivia Scott',
                title: 'Network Security Expert',
                note: 'Insights into the future of cybersecurity with new technologies and upcoming challenges.'
            }
        ],
        Description: 'Industry experts discuss the next steps for cybersecurity as it continues to evolve in the face of new threats and technologies.',
        Duration: '1 hour',
        EventType: 'Panel Discussion',
        TargetAudience: 'Security Engineers, IT Professionals, Managers',
        EventLevel: 'Advanced',
        EventTags: ['Cybersecurity', 'Future Trends', 'Panel Discussion']
    },

    // Room 3 - February 25
    {
        Id: 41,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Introduction to Data Science',
        StartTime: new Date(2025, 1, 25, 9, 0),
        EndTime: new Date(2025, 1, 25, 10, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ava Parker',
                title: 'Data Scientist',
                note: 'Learn the fundamentals of data science and its role in modern industries.'
            }
        ],
        Description: 'Introduction to the principles of data science, including data collection, cleaning, and basic analysis techniques.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, Analysts, IT Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Data Science', 'Big Data', 'Machine Learning']
    },
    {
        Id: 42,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Exploring Machine Learning Algorithms',
        StartTime: new Date(2025, 1, 25, 10, 30),
        EndTime: new Date(2025, 1, 25, 12, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ava Parker',
                title: 'Data Scientist',
                note: 'A closer look at common machine learning algorithms such as linear regression, classification, and clustering.'
            }
        ],
        Description: 'A session focused on understanding machine learning algorithms, including their applications and use cases.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, Developers, AI Researchers',
        EventLevel: 'Intermediate',
        EventTags: ['Machine Learning', 'Algorithms', 'Data Science']
    },
    {
        Id: 43,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Supervised vs Unsupervised Learning',
        StartTime: new Date(2025, 1, 25, 13, 0),
        EndTime: new Date(2025, 1, 25, 14, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Liam Brown',
                title: 'AI Engineer',
                note: 'Deep dive into the differences and applications of supervised and unsupervised machine learning models.'
            }
        ],
        Description: 'Understanding the fundamental differences between supervised and unsupervised learning and when to use each.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers, Data Scientists, Machine Learning Practitioners',
        EventLevel: 'Intermediate',
        EventTags: ['Supervised Learning', 'Unsupervised Learning', 'Machine Learning']
    },
    {
        Id: 44,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Deep Learning Introduction',
        StartTime: new Date(2025, 1, 25, 14, 0),
        EndTime: new Date(2025, 1, 25, 15, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Liam Brown',
                title: 'AI Engineer',
                note: 'Introduction to deep learning, neural networks, and their applications.'
            }
        ],
        Description: 'A primer on deep learning techniques, including an overview of neural networks, CNNs, and RNNs.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers, Machine Learning Researchers, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Deep Learning', 'Neural Networks', 'AI']
    },
    {
        Id: 45,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Break',
        StartTime: new Date(2025, 1, 25, 15, 0),
        EndTime: new Date(2025, 1, 25, 15, 30),
        RoomId: 3,
        Capacity: 0,
        Speakers: [],
        Description: 'Beak for relaxation and networking.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 46,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Evaluating Model Performance',
        StartTime: new Date(2025, 1, 25, 15, 30),
        EndTime: new Date(2025, 1, 25, 17, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ava Parker',
                title: 'Data Scientist',
                note: 'How to evaluate machine learning models and improve performance.'
            }
        ],
        Description: 'Exploring techniques for evaluating and tuning machine learning models to improve their accuracy.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, Machine Learning Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Model Evaluation', 'Performance', 'Machine Learning']
    },
    {
        Id: 47,
        Title: 'Data Science and Machine Learning Fundamentals',
        Subject: 'Ethical Considerations in Data Science',
        StartTime: new Date(2025, 1, 25, 17, 15),
        EndTime: new Date(2025, 1, 25, 18, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ava Parker',
                title: 'Data Scientist',
                note: 'Discussing the ethical challenges and responsibilities when working with data.'
            }
        ],
        Description: 'A session dedicated to exploring the ethical implications of data science and machine learning applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, AI Practitioners, Ethics Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Ethics', 'Data Science', 'Machine Learning']
    },

    // Room 4 - February 25
    {
        Id: 48,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Introduction to Blockchain Technology',
        StartTime: new Date(2025, 1, 25, 9, 15),
        EndTime: new Date(2025, 1, 25, 10, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Henry Clarke',
                title: 'Blockchain Expert',
                note: 'An introduction to the basics of blockchain technology and how it revolutionizes industries.'
            }
        ],
        Description: 'Understanding blockchain fundamentals, its architecture, and how it underpins cryptocurrency systems.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Business Professionals, IT Specialists',
        EventLevel: 'Beginner',
        EventTags: ['Blockchain', 'Cryptocurrency', 'Technology']
    },
    {
        Id: 49,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Cryptocurrency Basics and Bitcoin Overview',
        StartTime: new Date(2025, 1, 25, 10, 0),
        EndTime: new Date(2025, 1, 25, 10, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Mitchell',
                title: 'Cryptocurrency Expert',
                note: 'A deep dive into Bitcoin and its place in the cryptocurrency ecosystem.'
            }
        ],
        Description: 'Exploring the fundamentals of cryptocurrencies, with a special focus on Bitcoin, and how it’s used in digital transactions.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Enthusiasts, Financial Technologists, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Bitcoin', 'Cryptocurrency', 'Blockchain']
    },
    {
        Id: 93,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Break',
        StartTime: new Date(2025, 1, 25, 10, 30),
        EndTime: new Date(2025, 1, 25, 11, 0),
        RoomId: 4,
        Capacity: 0,
        Speakers: [],
        Description: 'A short break for attendees to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 50,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Decentralization and Consensus Algorithms',
        StartTime: new Date(2025, 1, 25, 11, 0),
        EndTime: new Date(2025, 1, 25, 12, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Henry Clarke',
                title: 'Blockchain Expert',
                note: 'Exploring decentralization and various consensus algorithms like PoW, PoS, and more.'
            }
        ],
        Description: 'Understanding the importance of decentralization and learning about consensus algorithms used in blockchain networks.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Developers, IT Engineers, Researchers',
        EventLevel: 'Intermediate',
        EventTags: ['Blockchain', 'Consensus Algorithms', 'Decentralization']
    },
    {
        Id: 52,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 25, 12, 0),
        EndTime: new Date(2025, 1, 25, 13, 0),
        RoomId: 4,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for relaxation and networking.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 51,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Smart Contracts and DApps',
        StartTime: new Date(2025, 1, 25, 13, 0),
        EndTime: new Date(2025, 1, 25, 14, 15),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Mitchell',
                title: 'Cryptocurrency Expert',
                note: 'Exploring smart contracts, decentralized applications (DApps), and how they operate on blockchain platforms.'
            }
        ],
        Description: 'A session dedicated to smart contracts and decentralized applications (DApps), which are built on blockchain platforms like Ethereum.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Developers, Ethereum Developers, Smart Contract Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Smart Contracts', 'DApps', 'Ethereum']
    },

    {
        Id: 53,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Blockchain for Enterprise Applications',
        StartTime: new Date(2025, 1, 25, 14, 15),
        EndTime: new Date(2025, 1, 25, 15, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Henry Clarke',
                title: 'Blockchain Expert',
                note: 'How blockchain can be used for enterprise applications, improving transparency and security in business processes.'
            }
        ],
        Description: 'A look into enterprise-level blockchain implementations and how companies are using this technology for improved efficiency and security.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Business Analysts, Blockchain Developers, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Enterprise Blockchain', 'Business Applications', 'Security']
    },
    {
        Id: 54,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Future of Blockchain and Cryptocurrency',
        StartTime: new Date(2025, 1, 25, 15, 30),
        EndTime: new Date(2025, 1, 25, 16, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Mitchell',
                title: 'Cryptocurrency Expert',
                note: 'Discussing the future trends and innovations in blockchain and cryptocurrency technologies.'
            }
        ],
        Description: 'A forward-looking discussion on the potential future of blockchain and cryptocurrency technologies, their societal impacts, and upcoming trends.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Crypto Enthusiasts, Blockchain Innovators, IT Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain Future', 'Cryptocurrency Trends', 'Innovation']
    },
    {
        Id: 55,
        Title: 'Blockchain and Cryptocurrency Fundamentals',
        Subject: 'Panel Discussion: The Regulatory Landscape of Cryptocurrencies',
        StartTime: new Date(2025, 1, 25, 17, 0),
        EndTime: new Date(2025, 1, 25, 18, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Henry Clarke',
                title: 'Blockchain Expert',
                note: 'An expert panel discusses the regulatory challenges and frameworks for cryptocurrencies and blockchain technologies.'
            },
            {
                name: 'Sophia Mitchell',
                title: 'Cryptocurrency Expert',
                note: 'Insights on how governments and financial institutions are handling the regulation of digital currencies.'
            }
        ],
        Description: 'Industry leaders discuss the evolving regulatory landscape for cryptocurrencies and blockchain-based technologies.',
        Duration: '1 hour',
        EventType: 'Panel Discussion',
        TargetAudience: 'Regulatory Experts, Developers, Financial Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Cryptocurrency Regulation', 'Blockchain', 'Panel Discussion']
    },

    // Room 1 - February 26
    {
        Id: 56,
        Title: 'Internet of Things (IoT) for Smart Solutions',
        Subject: 'Introduction to IoT and Its Applications',
        StartTime: new Date(2025, 1, 26, 9, 0),
        EndTime: new Date(2025, 1, 26, 9, 45),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'James Porter',
                title: 'IoT Specialist',
                note: 'An introduction to the Internet of Things (IoT) and its real-world applications in smart cities, homes, and industries.'
            }
        ],
        Description: 'Exploring the concept of IoT, its key technologies, and how it’s being used to develop smart solutions in various industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IoT Engineers, Developers, IT Professionals',
        EventLevel: 'Beginner',
        EventTags: ['IoT', 'Smart Solutions', 'Technology']
    },
    {
        Id: 57,
        Title: 'Internet of Things (IoT) for Smart Solutions',
        Subject: 'IoT Architecture and Devices',
        StartTime: new Date(2025, 1, 26, 10, 0),
        EndTime: new Date(2025, 1, 26, 11, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Rose',
                title: 'IoT Engineer',
                note: 'Understanding IoT architecture and how IoT devices communicate in a connected environment.'
            }
        ],
        Description: 'An in-depth look at IoT architecture, communication protocols, and devices that power the Internet of Things.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IoT Developers, Network Engineers, Solution Architects',
        EventLevel: 'Intermediate',
        EventTags: ['IoT Devices', 'Architecture', 'Networking']
    },
    {
        Id: 58,
        Title: 'Internet of Things (IoT) for Smart Solutions',
        Subject: 'Security Challenges in IoT',
        StartTime: new Date(2025, 1, 26, 11, 30),
        EndTime: new Date(2025, 1, 26, 12, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'James Porter',
                title: 'IoT Security Expert',
                note: 'Exploring the security challenges in IoT systems and strategies to secure connected devices.'
            }
        ],
        Description: 'Addressing the unique security challenges posed by IoT systems and exploring solutions to protect connected devices and networks.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, IoT Developers, Network Specialists',
        EventLevel: 'Advanced',
        EventTags: ['IoT Security', 'Data Protection', 'Internet of Things']
    },
    {
        Id: 60,
        Title: 'Lunch break',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 26, 12, 0),
        EndTime: new Date(2025, 1, 26, 13, 0),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for relaxation and networking.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 59,
        Title: 'Internet of Things (IoT) for Smart Solutions',
        Subject: 'IoT Data Management and Analytics',
        StartTime: new Date(2025, 1, 26, 13, 0),
        EndTime: new Date(2025, 1, 26, 14, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Rose',
                title: 'IoT Engineer',
                note: 'Discussing how IoT systems collect, manage, and analyze data for smart decision-making.'
            }
        ],
        Description: 'Exploring the ways IoT systems generate massive data and how it’s analyzed for smart solutions and business intelligence.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, IoT Developers, Analytics Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['IoT Data', 'Analytics', 'Big Data']
    },
    {
        Id: 61,
        Title: 'Internet of Things (IoT) for Smart Solutions',
        Subject: 'IoT for Smart Cities and Homes',
        StartTime: new Date(2025, 1, 26, 14, 0),
        EndTime: new Date(2025, 1, 26, 15, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'James Porter',
                title: 'IoT Specialist',
                note: 'Exploring how IoT is transforming cities and homes with smart technologies that improve living standards.'
            }
        ],
        Description: 'A session focused on how IoT technologies are shaping the development of smart cities and homes, improving efficiency and quality of life.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Smart City Planners, IoT Engineers, Urban Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Smart Cities', 'IoT', 'Urban Planning']
    },
    {
        Id: 62,
        Title: 'Internet of Things (IoT) for Smart Solutions',
        Subject: 'The Future of IoT',
        StartTime: new Date(2025, 1, 26, 16, 0),
        EndTime: new Date(2025, 1, 26, 18, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Rose',
                title: 'IoT Engineer',
                note: 'Looking ahead to the next frontier of IoT innovation and the transformative potential of connected devices.'
            }
        ],
        Description: 'A discussion on the future of IoT, emerging trends, and how the Internet of Things will continue to shape industries and everyday life.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'IoT Innovators, Tech Enthusiasts, Developers',
        EventLevel: 'Advanced',
        EventTags: ['Future IoT', 'Technology Trends', 'Innovation']
    },

    // Room 2 - February 26
    {
        Id: 63,
        Title: 'Data Science and Machine Learning',
        Subject: 'Introduction to Data Science',
        StartTime: new Date(2025, 1, 26, 9, 0),
        EndTime: new Date(2025, 1, 26, 9, 45),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Alice Johnson',
                title: 'Data Scientist',
                note: 'Introducing the core concepts and tools of data science, including data wrangling, visualization, and analysis.'
            }
        ],
        Description: 'An introductory session to the world of data science, covering fundamental concepts and tools used in the field.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Enthusiasts, Developers, Business Analysts',
        EventLevel: 'Beginner',
        EventTags: ['Data Science', 'Data Analysis', 'Machine Learning']
    },
    {
        Id: 64,
        Title: 'Data Science and Machine Learning',
        Subject: 'Supervised Learning Algorithms',
        StartTime: new Date(2025, 1, 26, 10, 0),
        EndTime: new Date(2025, 1, 26, 11, 15),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Alice Johnson',
                title: 'Data Scientist',
                note: 'A detailed exploration of supervised learning algorithms, including linear regression and decision trees.'
            }
        ],
        Description: 'An in-depth session on supervised learning algorithms and their applications in machine learning and data analysis.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, ML Enthusiasts, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Supervised Learning', 'Algorithms', 'Machine Learning']
    },
    {
        Id: 65,
        Title: 'Data Science and Machine Learning',
        Subject: 'Unsupervised Learning and Clustering Techniques',
        StartTime: new Date(2025, 1, 26, 11, 15),
        EndTime: new Date(2025, 1, 26, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Alice Johnson',
                title: 'Data Scientist',
                note: 'Exploring unsupervised learning techniques like clustering and dimensionality reduction.'
            }
        ],
        Description: 'A session covering unsupervised learning techniques, including K-means clustering and PCA, used to analyze unlabeled data.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Machine Learning Enthusiasts, Data Scientists, Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['Unsupervised Learning', 'Clustering', 'Machine Learning']
    },
    {
        Id: 67,
        Title: 'Data Science and Machine Learning',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 26, 12, 0),
        EndTime: new Date(2025, 1, 26, 13, 0),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for relaxation and networking.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 66,
        Title: 'Data Science and Machine Learning',
        Subject: 'Deep Learning and Neural Networks',
        StartTime: new Date(2025, 1, 26, 13, 0),
        EndTime: new Date(2025, 1, 26, 14, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Alice Johnson',
                title: 'Deep Learning Expert',
                note: 'Introduction to deep learning techniques and how neural networks are transforming data science.'
            }
        ],
        Description: 'An introductory session on deep learning, explaining neural networks, CNNs, and their use in various applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Deep Learning Enthusiasts, Data Scientists, AI Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Deep Learning', 'Neural Networks', 'Machine Learning']
    },

    {
        Id: 68,
        Title: 'Data Science and Machine Learning',
        Subject: 'Model Evaluation and Performance Metrics',
        StartTime: new Date(2025, 1, 26, 15, 0),
        EndTime: new Date(2025, 1, 26, 16, 15),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Alice Johnson',
                title: 'Data Scientist',
                note: 'Understanding the different model evaluation metrics like accuracy, precision, recall, and F1-score.'
            }
        ],
        Description: 'A session on the importance of evaluating machine learning models using various performance metrics.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, Machine Learning Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Model Evaluation', 'Performance Metrics', 'Machine Learning']
    },
    {
        Id: 69,
        Title: 'Data Science and Machine Learning',
        Subject: 'Deploying Machine Learning Models in Production',
        StartTime: new Date(2025, 1, 26, 17, 0),
        EndTime: new Date(2025, 1, 26, 18, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Alice Johnson',
                title: 'Machine Learning Engineer',
                note: 'Discussing best practices and tools for deploying machine learning models to production environments.'
            }
        ],
        Description: 'A session focused on the strategies, tools, and challenges of deploying machine learning models into production environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, ML Engineers, Data Scientists',
        EventLevel: 'Advanced',
        EventTags: ['Deployment', 'Machine Learning', 'Production']
    },

    // Room 3 - February 26
    {
        Id: 70,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Introduction to Cloud Computing',
        StartTime: new Date(2025, 1, 26, 9, 30),
        EndTime: new Date(2025, 1, 26, 10, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Daniel Smith',
                title: 'Cloud Architect',
                note: 'An introduction to cloud computing and its core concepts including IaaS, PaaS, and SaaS.'
            }
        ],
        Description: 'A session that introduces cloud computing, its different models, and its benefits for businesses and individuals.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Enthusiasts, IT Professionals, Developers',
        EventLevel: 'Beginner',
        EventTags: ['Cloud Computing', 'IaaS', 'PaaS', 'SaaS']
    },
    {
        Id: 93,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Break',
        StartTime: new Date(2025, 1, 26, 10, 30),
        EndTime: new Date(2025, 1, 26, 11, 0),
        RoomId: 3,
        Capacity: 0,
        Speakers: [],
        Description: 'A short break for attendees to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 71,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Scaling Applications in the Cloud',
        StartTime: new Date(2025, 1, 26, 11, 0),
        EndTime: new Date(2025, 1, 26, 12, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Daniel Smith',
                title: 'Cloud Architect',
                note: 'How to scale cloud-based applications and utilize cloud features to handle increasing traffic and demand.'
            }
        ],
        Description: 'This session covers techniques for scaling applications in the cloud using services like auto-scaling and load balancing.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Developers, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Scalability', 'Load Balancing', 'Auto-Scaling']
    },
    {
        Id: 74,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 26, 12, 0),
        EndTime: new Date(2025, 1, 26, 13, 0),
        RoomId: 3,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for relaxation and networking.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 72,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Cloud Security Best Practices',
        StartTime: new Date(2025, 1, 26, 13, 0),
        EndTime: new Date(2025, 1, 26, 14, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Davis',
                title: 'Cloud Security Expert',
                note: 'Discussing security best practices and tools for ensuring data protection in the cloud.'
            }
        ],
        Description: 'This session focuses on security best practices, tools, and techniques for safeguarding data and applications in the cloud.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Cloud Engineers, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Security', 'Data Protection', 'Encryption']
    },
    {
        Id: 73,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Cloud Databases and Storage',
        StartTime: new Date(2025, 1, 26, 14, 30),
        EndTime: new Date(2025, 1, 26, 15, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Daniel Smith',
                title: 'Cloud Architect',
                note: 'Overview of cloud databases and storage services like AWS RDS, Google Cloud SQL, and Azure Blob Storage.'
            }
        ],
        Description: 'A session focusing on cloud databases and storage solutions that scale according to your data needs and application demands.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Database Administrators, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Databases', 'Storage Solutions', 'AWS', 'Google Cloud']
    },
    {
        Id: 75,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Multi-cloud and Hybrid Cloud Architectures',
        StartTime: new Date(2025, 1, 26, 16, 0),
        EndTime: new Date(2025, 1, 26, 17, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Davis',
                title: 'Cloud Security Expert',
                note: 'Understanding multi-cloud and hybrid cloud strategies to optimize performance, flexibility, and costs.'
            }
        ],
        Description: 'Learn about multi-cloud and hybrid cloud architectures and their benefits in achieving operational flexibility and reliability.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, System Architects, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Multi-cloud', 'Hybrid Cloud', 'Cloud Architecture']
    },
    {
        Id: 76,
        Title: 'Cloud Computing for Scalability',
        Subject: 'Serverless Architectures and Functions',
        StartTime: new Date(2025, 1, 26, 17, 0),
        EndTime: new Date(2025, 1, 26, 18, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Daniel Smith',
                title: 'Cloud Architect',
                note: 'Exploring serverless computing, serverless functions, and how it can simplify scaling applications.'
            }
        ],
        Description: 'An in-depth look at serverless architectures, including AWS Lambda and Google Cloud Functions, and their scalability benefits.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Developers, DevOps Engineers, IT Architects',
        EventLevel: 'Advanced',
        EventTags: ['Serverless', 'Cloud Functions', 'Scalability']
    },


    // Room 4 - February 26
    {
        Id: 77,
        Title: 'Network Automation and Orchestration',
        Subject: 'Introduction to Network Automation',
        StartTime: new Date(2025, 1, 26, 9, 30),
        EndTime: new Date(2025, 1, 26, 10, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Robert Lee',
                title: 'Network Engineer',
                note: 'Introducing the fundamentals of network automation and how it optimizes network management.'
            }
        ],
        Description: 'An introductory session to network automation tools and techniques to automate manual processes and increase efficiency.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, IT Administrators, DevOps Professionals',
        EventLevel: 'Beginner',
        EventTags: ['Network Automation', 'IT Management', 'Orchestration']
    },
    {
        Id: 78,
        Title: 'Network Automation and Orchestration',
        Subject: 'Automation Tools: Ansible, Puppet, and Chef',
        StartTime: new Date(2025, 1, 26, 11, 0),
        EndTime: new Date(2025, 1, 26, 12, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Robert Lee',
                title: 'Network Automation Specialist',
                note: 'Exploring popular automation tools like Ansible, Puppet, and Chef for network orchestration.'
            }
        ],
        Description: 'A technical session exploring the use of automation tools like Ansible, Puppet, and Chef for configuring and managing network devices.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, DevOps Engineers, Systems Administrators',
        EventLevel: 'Intermediate',
        EventTags: ['Ansible', 'Puppet', 'Chef', 'Network Automation']
    },
    {
        Id: 79,
        Title: 'Network Automation and Orchestration',
        Subject: 'SDN (Software-Defined Networking) Concepts',
        StartTime: new Date(2025, 1, 26, 13, 30),
        EndTime: new Date(2025, 1, 26, 14, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Robert Lee',
                title: 'Network Engineer',
                note: 'An introduction to SDN, its architecture, and how it changes the way networks are managed and configured.'
            }
        ],
        Description: 'This session covers Software-Defined Networking (SDN), a new approach to managing network infrastructure through centralized control.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, IT Managers, SDN Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['SDN', 'Network Automation', 'Software-Defined']
    },
    {
        Id: 80,
        Title: 'Network Automation and Orchestration',
        Subject: 'Network Orchestration Using Kubernetes',
        StartTime: new Date(2025, 1, 26, 15, 0),
        EndTime: new Date(2025, 1, 26, 16, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Robinson',
                title: 'Kubernetes Expert',
                note: 'Explaining how Kubernetes can be used for network orchestration in modern network infrastructures.'
            }
        ],
        Description: 'A session dedicated to using Kubernetes for network orchestration, simplifying network management and increasing scalability.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Kubernetes Enthusiasts, IT Administrators',
        EventLevel: 'Intermediate',
        EventTags: ['Kubernetes', 'Network Orchestration', 'Automation']
    },
    {
        Id: 82,
        Title: 'Network Automation and Orchestration',
        Subject: 'Automation in Network Security',
        StartTime: new Date(2025, 1, 26, 17, 0),
        EndTime: new Date(2025, 1, 26, 17, 45),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Robinson',
                title: 'Network Security Expert',
                note: 'Focusing on how automation can be used to enhance network security and detect vulnerabilities.'
            }
        ],
        Description: 'An in-depth look at how network automation can play a significant role in securing networks and improving threat detection.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Security Engineers, IT Managers, Security Enthusiasts',
        EventLevel: 'Advanced',
        EventTags: ['Network Security', 'Automation', 'Threat Detection']
    },

    // Room 1 - February 27
    {
        Id: 83,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Introduction to Advanced Cybersecurity Threats',
        StartTime: new Date(2025, 1, 27, 9, 15),
        EndTime: new Date(2025, 1, 27, 10, 15),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Samuel Harris',
                title: 'Cybersecurity Expert',
                note: 'Exploring the advanced threats facing modern businesses and organizations in the digital age.'
            }
        ],
        Description: 'A session that introduces common and emerging cybersecurity threats, including advanced persistent threats (APTs) and ransomware.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cybersecurity Professionals, IT Managers, Security Analysts',
        EventLevel: 'Advanced',
        EventTags: ['Cybersecurity', 'Ransomware', 'Threats']
    },
    {
        Id: 84,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Phishing Attacks and Social Engineering',
        StartTime: new Date(2025, 1, 27, 10, 30),
        EndTime: new Date(2025, 1, 27, 11, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Samuel Harris',
                title: 'Cybersecurity Expert',
                note: 'Understanding phishing attacks, social engineering tactics, and how to mitigate them.'
            }
        ],
        Description: 'A session focused on phishing, social engineering, and the techniques attackers use to trick employees into revealing sensitive information.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Professionals, Employees, IT Managers',
        EventLevel: 'Intermediate',
        EventTags: ['Phishing', 'Social Engineering', 'Cybersecurity']
    },
    {
        Id: 85,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Malware and Ransomware Attacks',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Samuel Harris',
                title: 'Cybersecurity Expert',
                note: 'An analysis of various types of malware, ransomware, and how to protect systems from these threats.'
            }
        ],
        Description: 'This session will explore common types of malware and ransomware, their delivery mechanisms, and best practices for defense.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cybersecurity Professionals, IT Support Staff, Business Leaders',
        EventLevel: 'Advanced',
        EventTags: ['Malware', 'Ransomware', 'Cybersecurity']
    },
    {
        Id: 87,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 27, 12, 0),
        EndTime: new Date(2025, 1, 27, 13, 0),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for relaxation and networking.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 89,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Network Security and Intrusion Detection',
        StartTime: new Date(2025, 1, 27, 13, 0),
        EndTime: new Date(2025, 1, 27, 14, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Williams',
                title: 'Network Security Expert',
                note: 'Discussing the importance of intrusion detection systems (IDS) and other network defense mechanisms.'
            }
        ],
        Description: 'In this session, we’ll examine intrusion detection systems, firewalls, and other tools to detect and prevent unauthorized access.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Administrators, Security Engineers, IT Managers',
        EventLevel: 'Advanced',
        EventTags: ['Network Security', 'Intrusion Detection', 'Firewalls']
    },
    {
        Id: 88,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Advanced Persistent Threats (APTs)',
        StartTime: new Date(2025, 1, 27, 15, 0),
        EndTime: new Date(2025, 1, 27, 16, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Dr. Samuel Harris',
                title: 'Cybersecurity Expert',
                note: 'An advanced session on APTs, focusing on their persistence, methods of attack, and how to combat them.'
            }
        ],
        Description: 'This session will dive into APTs, how they are carried out by advanced hackers, and strategies for defending against them.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cybersecurity Experts, IT Managers, Network Administrators',
        EventLevel: 'Advanced',
        EventTags: ['APT', 'Cybersecurity', 'Advanced Threats']
    },
    {
        Id: 89,
        Title: 'Advanced Cybersecurity Threats and Mitigations',
        Subject: 'Incident Response and Forensics',
        StartTime: new Date(2025, 1, 27, 17, 0),
        EndTime: new Date(2025, 1, 27, 18, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Williams',
                title: 'Cybersecurity Forensics Expert',
                note: 'Understanding the importance of incident response and how to conduct proper forensics after a cyberattack.'
            }
        ],
        Description: 'A session on handling security incidents effectively, from detection to response and the forensic analysis needed afterward.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Incident Response Teams, Forensics Experts, Cybersecurity Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Incident Response', 'Forensics', 'Cybersecurity']
    },

    // Room 2 - February 27
    {
        Id: 90,
        Title: 'Blockchain and Cryptocurrency Technologies',
        Subject: 'Introduction to Blockchain Technology',
        StartTime: new Date(2025, 1, 27, 9, 30),
        EndTime: new Date(2025, 1, 27, 10, 45),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'John Cooper',
                title: 'Blockchain Expert',
                note: 'An overview of blockchain technology and its potential to transform various industries.'
            }
        ],
        Description: 'This session introduces the basics of blockchain technology, its components, and its applications in various sectors.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Business Leaders, Crypto Enthusiasts',
        EventLevel: 'Beginner',
        EventTags: ['Blockchain', 'Cryptocurrency', 'Tech Innovations']
    },
    {
        Id: 91,
        Title: 'Blockchain and Cryptocurrency Technologies',
        Subject: 'Smart Contracts and DApps',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'John Cooper',
                title: 'Blockchain Developer',
                note: 'Exploring how smart contracts and decentralized applications (DApps) function on blockchain networks.'
            }
        ],
        Description: 'An in-depth session on the role of smart contracts and decentralized apps (DApps) in blockchain ecosystems.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Blockchain Enthusiasts, Entrepreneurs',
        EventLevel: 'Intermediate',
        EventTags: ['Smart Contracts', 'DApps', 'Blockchain']
    },
    {
        Id: 92,
        Title: 'Blockchain and Cryptocurrency Technologies',
        Subject: 'Cryptocurrency Mining and Consensus Algorithms',
        StartTime: new Date(2025, 1, 27, 13, 0),
        EndTime: new Date(2025, 1, 27, 14, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'John Cooper',
                title: 'Blockchain Developer',
                note: 'Understanding how cryptocurrency mining works, and an introduction to consensus algorithms like Proof of Work (PoW) and Proof of Stake (PoS).'
            }
        ],
        Description: 'A technical session on how mining works in the world of cryptocurrency and how consensus algorithms play a crucial role.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Crypto Enthusiasts, Developers, Miners',
        EventLevel: 'Intermediate',
        EventTags: ['Cryptocurrency Mining', 'PoW', 'PoS']
    },
    {
        Id: 93,
        Title: 'Blockchain and Cryptocurrency Technologies',
        Subject: 'Blockchain Use Cases Beyond Cryptocurrency',
        StartTime: new Date(2025, 1, 27, 14, 30),
        EndTime: new Date(2025, 1, 27, 15, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Lee',
                title: 'Blockchain Researcher',
                note: 'Exploring how blockchain is applied in supply chains, healthcare, voting systems, and more.'
            }
        ],
        Description: 'This session explores real-world use cases of blockchain beyond cryptocurrency, such as logistics, health tech, and digital identity.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Enthusiasts, Developers, Entrepreneurs',
        EventLevel: 'Intermediate',
        EventTags: ['Blockchain Use Cases', 'Tech Innovations', 'Industry Applications']
    },
    {
        Id: 95,
        Title: 'Blockchain and Cryptocurrency Technologies',
        Subject: 'Blockchain Security and Privacy Concerns',
        StartTime: new Date(2025, 1, 27, 15, 30),
        EndTime: new Date(2025, 1, 27, 16, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Lee',
                title: 'Blockchain Security Expert',
                note: 'Understanding security challenges in blockchain and strategies for mitigating privacy and security risks.'
            }
        ],
        Description: 'A session on security risks in blockchain, with a focus on potential vulnerabilities in blockchain applications and privacy concerns.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Developers, Blockchain Enthusiasts',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain Security', 'Privacy', 'Vulnerabilities']
    },
    {
        Id: 96,
        Title: 'Blockchain and Cryptocurrency Technologies',
        Subject: 'Future Trends in Blockchain and Cryptocurrency',
        StartTime: new Date(2025, 1, 27, 16, 30),
        EndTime: new Date(2025, 1, 27, 17, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'John Cooper',
                title: 'Blockchain Visionary',
                note: 'Discussing the future trends in blockchain technology, from scalability improvements to decentralized finance (DeFi).'
            }
        ],
        Description: 'A discussion on the future direction of blockchain technology, focusing on scalability, DeFi, and innovations to come.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Blockchain Enthusiasts, Developers, Entrepreneurs',
        EventLevel: 'Advanced',
        EventTags: ['Blockchain Future', 'DeFi', 'Tech Innovations']
    },

    // Room 3 - February 27
    {
        Id: 97,
        Title: 'Modern Web Development and Frameworks',
        Subject: 'Introduction to Web Development with React',
        StartTime: new Date(2025, 1, 27, 9, 15),
        EndTime: new Date(2025, 1, 27, 10, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Alex Johnson',
                title: 'Web Developer',
                note: 'An introduction to modern web development using the React framework and its components.'
            }
        ],
        Description: 'This session will cover the basics of building modern web applications with React, from setting up a project to rendering components.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Web Developers, Frontend Engineers, React Enthusiasts',
        EventLevel: 'Beginner',
        EventTags: ['React', 'Web Development', 'Frontend']
    },
    {
        Id: 98,
        Title: 'Modern Web Development and Frameworks',
        Subject: 'Advanced React Techniques',
        StartTime: new Date(2025, 1, 27, 10, 0),
        EndTime: new Date(2025, 1, 27, 11, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Alex Johnson',
                title: 'Web Developer',
                note: 'A deep dive into advanced React features like hooks, context, and state management.'
            }
        ],
        Description: 'An in-depth session on advanced React concepts such as hooks, context API, Redux for state management, and performance optimizations.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'React Developers, Frontend Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['React', 'State Management', 'JavaScript']
    },
    {
        Id: 99,
        Title: 'Modern Web Development and Frameworks',
        Subject: 'Building Responsive UIs with CSS Grid and Flexbox',
        StartTime: new Date(2025, 1, 27, 11, 30),
        EndTime: new Date(2025, 1, 27, 12, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Mitchell',
                title: 'UI/UX Designer',
                note: 'Mastering modern CSS layout techniques, including Grid and Flexbox for building flexible and responsive web designs.'
            }
        ],
        Description: 'This session focuses on building modern, responsive user interfaces using CSS Grid and Flexbox to create flexible layouts.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'UI/UX Designers, Frontend Developers',
        EventLevel: 'Intermediate',
        EventTags: ['CSS', 'Grid', 'Flexbox']
    },
    {
        Id: 100,
        Title: 'Modern Web Development and Frameworks',
        Subject: 'Server-Side Rendering with Next.js',
        StartTime: new Date(2025, 1, 27, 13, 30),
        EndTime: new Date(2025, 1, 27, 15, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Lee',
                title: 'Full Stack Developer',
                note: 'Exploring server-side rendering with Next.js and how it improves performance and SEO for React apps.'
            }
        ],
        Description: 'Learn about the advantages of server-side rendering with Next.js, and how it can enhance the performance and SEO of React applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Full Stack Developers, React Developers, SEO Specialists',
        EventLevel: 'Intermediate',
        EventTags: ['Next.js', 'Server-Side Rendering', 'React']
    },

    {
        Id: 102,
        Title: 'Modern Web Development and Frameworks',
        Subject: 'State Management with Redux',
        StartTime: new Date(2025, 1, 27, 15, 30),
        EndTime: new Date(2025, 1, 27, 16, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Lee',
                title: 'Full Stack Developer',
                note: 'Understanding how to use Redux for global state management in React applications.'
            }
        ],
        Description: 'This session dives deep into state management with Redux, helping you build more maintainable React applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'React Developers, Full Stack Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Redux', 'React', 'State Management']
    },
    {
        Id: 103,
        Title: 'Modern Web Development and Frameworks',
        Subject: 'JavaScript Performance Optimization Techniques',
        StartTime: new Date(2025, 1, 27, 17, 0),
        EndTime: new Date(2025, 1, 27, 18, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Alex Johnson',
                title: 'Web Developer',
                note: 'Best practices for optimizing JavaScript performance in large-scale web applications.'
            }
        ],
        Description: 'This session focuses on performance optimization strategies for JavaScript, including lazy loading, memoization, and efficient rendering techniques.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Frontend Developers, Web Performance Engineers',
        EventLevel: 'Advanced',
        EventTags: ['JavaScript', 'Performance Optimization', 'Web Development']
    },

    // Room 4 - February 27
    {
        Id: 104,
        Title: 'Cloud Infrastructure and Kubernetes',
        Subject: 'Introduction to Cloud Computing and Services',
        StartTime: new Date(2025, 1, 27, 9, 0),
        EndTime: new Date(2025, 1, 27, 10, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mark Thompson',
                title: 'Cloud Architect',
                note: 'Exploring the fundamentals of cloud computing, including IaaS, PaaS, and SaaS models.'
            }
        ],
        Description: 'This session introduces cloud computing services, their architecture, and how businesses can leverage them to scale their operations.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, IT Professionals, Business Leaders',
        EventLevel: 'Beginner',
        EventTags: ['Cloud Computing', 'IaaS', 'PaaS']
    },
    {
        Id: 105,
        Title: 'Cloud Infrastructure and Kubernetes',
        Subject: 'Introduction to Kubernetes and Containerization',
        StartTime: new Date(2025, 1, 27, 10, 0),
        EndTime: new Date(2025, 1, 27, 10, 45),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mark Thompson',
                title: 'Cloud Architect',
                note: 'Understanding Kubernetes, container orchestration, and how it simplifies cloud infrastructure management.'
            }
        ],
        Description: 'Learn about Kubernetes, containerization, and the role they play in modern cloud infrastructure and application deployment.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Architects, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Kubernetes', 'Containerization', 'DevOps']
    },
    {
        Id: 106,
        Title: 'Cloud Infrastructure and Kubernetes',
        Subject: 'Automating Deployments with Kubernetes',
        StartTime: new Date(2025, 1, 27, 11, 0),
        EndTime: new Date(2025, 1, 27, 12, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Nelson',
                title: 'DevOps Engineer',
                note: 'Exploring how Kubernetes can be used to automate deployment pipelines and scale applications effectively.'
            }
        ],
        Description: 'This session focuses on using Kubernetes for automating continuous integration and deployment (CI/CD) pipelines.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Architects',
        EventLevel: 'Intermediate',
        EventTags: ['CI/CD', 'Kubernetes', 'Automation']
    },
    {
        Id: 107,
        Title: 'Cloud Infrastructure and Kubernetes',
        Subject: 'Scaling Applications in Kubernetes',
        StartTime: new Date(2025, 1, 27, 13, 0),
        EndTime: new Date(2025, 1, 27, 14, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Nelson',
                title: 'DevOps Engineer',
                note: 'Understanding how Kubernetes helps scale containerized applications efficiently across multiple nodes.'
            }
        ],
        Description: 'In this session, we will cover scaling techniques in Kubernetes and how to maintain high availability for cloud-native applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, DevOps Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Scaling', 'Kubernetes', 'Cloud Infrastructure']
    },
    {
        Id: 109,
        Title: 'Cloud Infrastructure and Kubernetes',
        Subject: 'Monitoring and Troubleshooting Kubernetes Applications',
        StartTime: new Date(2025, 1, 27, 14, 30),
        EndTime: new Date(2025, 1, 27, 15, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mark Thompson',
                title: 'Cloud Architect',
                note: 'Learn about the tools and strategies for monitoring and troubleshooting Kubernetes-based applications.'
            }
        ],
        Description: 'This session dives deep into monitoring and troubleshooting Kubernetes applications using tools like Prometheus and Grafana.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Monitoring', 'Kubernetes', 'Troubleshooting']
    },
    {
        Id: 110,
        Title: 'Cloud Infrastructure and Kubernetes',
        Subject: 'Kubernetes Security Best Practices',
        StartTime: new Date(2025, 1, 27, 16, 0),
        EndTime: new Date(2025, 1, 27, 17, 15),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Nelson',
                title: 'DevOps Engineer',
                note: 'Best practices for securing your Kubernetes clusters and managing security risks.'
            }
        ],
        Description: 'A session on Kubernetes security practices, from securing clusters to managing network policies and container vulnerabilities.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, DevOps Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Kubernetes', 'Security', 'Best Practices']
    },

    // Room 1 - February 28
    {
        Id: 111,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'Introduction to Machine Learning Algorithms',
        StartTime: new Date(2025, 1, 28, 9, 0),
        EndTime: new Date(2025, 1, 28, 10, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Williams',
                title: 'Data Scientist',
                note: 'An overview of essential machine learning algorithms such as linear regression, decision trees, and k-nearest neighbors.'
            }
        ],
        Description: 'This session introduces core machine learning algorithms, their uses, and how they are applied in real-world problems.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, Machine Learning Enthusiasts',
        EventLevel: 'Beginner',
        EventTags: ['Machine Learning', 'Algorithms', 'Data Science']
    },
    {
        Id: 93,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'Break',
        StartTime: new Date(2025, 1, 28, 10, 0),
        EndTime: new Date(2025, 1, 28, 10, 30),
        RoomId: 1,
        Capacity: 0,
        Speakers: [],
        Description: 'A short break for attendees to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: []
    },
    {
        Id: 112,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'Deep Learning: Fundamentals and Applications',
        StartTime: new Date(2025, 1, 28, 10, 30),
        EndTime: new Date(2025, 1, 28, 11, 45),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Williams',
                title: 'Data Scientist',
                note: 'A look at deep learning, neural networks, and their applications in image recognition and natural language processing.'
            }
        ],
        Description: 'An introduction to deep learning, its architectures like CNN and RNN, and how they’re transforming industries.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers, Data Scientists',
        EventLevel: 'Intermediate',
        EventTags: ['Deep Learning', 'Neural Networks', 'Artificial Intelligence']
    },
    {
        Id: 113,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'Natural Language Processing and Text Analytics',
        StartTime: new Date(2025, 1, 28, 13, 0),
        EndTime: new Date(2025, 1, 28, 14, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Clark',
                title: 'AI Researcher',
                note: 'Exploring how NLP is used to analyze and understand human language, including sentiment analysis and chatbots.'
            }
        ],
        Description: 'This session covers the basics of NLP, its applications in real-world systems, and how to use NLP for text analytics.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers, Data Scientists',
        EventLevel: 'Intermediate',
        EventTags: ['Natural Language Processing', 'AI', 'Text Analytics']
    },
    {
        Id: 114,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'Computer Vision and Image Processing',
        StartTime: new Date(2025, 1, 28, 14, 30),
        EndTime: new Date(2025, 1, 28, 16, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Clark',
                title: 'AI Researcher',
                note: 'A session on image classification, object detection, and advanced techniques in computer vision.'
            }
        ],
        Description: 'In this session, we’ll dive into computer vision and the methods used to extract useful information from images.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Computer Vision Engineers, AI Enthusiasts',
        EventLevel: 'Intermediate',
        EventTags: ['Computer Vision', 'AI', 'Image Processing']
    },
    {
        Id: 116,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'AI in Healthcare: Opportunities and Challenges',
        StartTime: new Date(2025, 1, 28, 16, 15),
        EndTime: new Date(2025, 1, 28, 17, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Liam Johnson',
                title: 'AI Specialist',
                note: 'Exploring how AI technologies are transforming healthcare, from diagnostic tools to personalized treatments.'
            }
        ],
        Description: 'AI is making a big impact in healthcare, improving diagnosis, treatment, and patient outcomes. This session explores these applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Enthusiasts, Healthcare Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Healthcare', 'Medical Tech']
    },
    {
        Id: 117,
        Title: 'Artificial Intelligence and Data Science',
        Subject: 'AI in Autonomous Vehicles',
        StartTime: new Date(2025, 1, 28, 17, 0),
        EndTime: new Date(2025, 1, 28, 17, 45),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Williams',
                title: 'Data Scientist',
                note: 'Exploring the role of AI in autonomous driving, from computer vision to decision-making algorithms.'
            }
        ],
        Description: 'This session dives into the technologies that power autonomous vehicles, such as computer vision, machine learning, and sensor integration.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers, Automotive Engineers',
        EventLevel: 'Advanced',
        EventTags: ['AI', 'Autonomous Vehicles', 'Machine Learning']
    },

    // Room 2 - February 28
    {
        Id: 118,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Introduction to Cloud Computing and Services',
        StartTime: new Date(2025, 1, 28, 9, 0),
        EndTime: new Date(2025, 1, 28, 10, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mark Thompson',
                title: 'Cloud Architect',
                note: 'Exploring the fundamentals of cloud computing, including IaaS, PaaS, and SaaS models.'
            }
        ],
        Description: 'This session introduces cloud computing services, their architecture, and how businesses can leverage them to scale their operations.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, IT Professionals, Business Leaders',
        EventLevel: 'Beginner',
        EventTags: ['Cloud Computing', 'IaaS', 'PaaS']
    },
    {
        Id: 119,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Introduction to Kubernetes and Containerization',
        StartTime: new Date(2025, 1, 28, 10, 0),
        EndTime: new Date(2025, 1, 28, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Lee',
                title: 'DevOps Engineer',
                note: 'Understanding Kubernetes, container orchestration, and how it simplifies cloud infrastructure management.'
            }
        ],
        Description: 'This session introduces Kubernetes and how containerization helps improve scalability and deployment in cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Architects, Developers',
        EventLevel: 'Intermediate',
        EventTags: ['Kubernetes', 'Containerization', 'DevOps']
    },
    {
        Id: 93,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Break',
        StartTime: new Date(2025, 1, 28, 10, 30),
        EndTime: new Date(2025, 1, 28, 11, 0),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'A short break for attendees to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 120,
        Title: 'Cloud Computing and DevOps',
        Subject: 'CI/CD Pipelines with Jenkins and Kubernetes',
        StartTime: new Date(2025, 1, 28, 11, 0),
        EndTime: new Date(2025, 1, 28, 12, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Lee',
                title: 'DevOps Engineer',
                note: 'Leveraging Jenkins to automate CI/CD pipelines in Kubernetes environments.'
            }
        ],
        Description: 'In this session, you’ll learn how Jenkins is used in combination with Kubernetes to automate the CI/CD process.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['CI/CD', 'Jenkins', 'Kubernetes']
    },
    {
        Id: 122,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 1, 28, 12, 30),
        EndTime: new Date(2025, 1, 28, 13, 30),
        RoomId: 2,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for networking and relaxation.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All Levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 121,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Cloud Infrastructure Automation with Terraform',
        StartTime: new Date(2025, 1, 28, 13, 30),
        EndTime: new Date(2025, 1, 28, 14, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mark Thompson',
                title: 'Cloud Architect',
                note: 'Using Terraform to automate cloud infrastructure deployment and management.'
            }
        ],
        Description: 'Terraform is a powerful tool for cloud automation. This session covers its features, benefits, and best practices.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, DevOps Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Terraform', 'Cloud Automation', 'Infrastructure as Code']
    },
    {
        Id: 123,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Serverless Architectures and Their Benefits',
        StartTime: new Date(2025, 1, 28, 15, 0),
        EndTime: new Date(2025, 1, 28, 16, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Nelson',
                title: 'Cloud Specialist',
                note: 'Exploring serverless computing and how it simplifies cloud architectures while reducing costs.'
            }
        ],
        Description: 'In this session, we explore the benefits of serverless architectures in cloud computing and when to use them.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Architects',
        EventLevel: 'Intermediate',
        EventTags: ['Serverless', 'Cloud Computing', 'DevOps']
    },
    {
        Id: 124,
        Title: 'Cloud Computing and DevOps',
        Subject: 'Automating Infrastructure with Ansible',
        StartTime: new Date(2025, 1, 28, 17, 0),
        EndTime: new Date(2025, 1, 28, 17, 45),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Nelson',
                title: 'Cloud Specialist',
                note: 'Ansible for automating cloud infrastructure deployment and configuration management.'
            }
        ],
        Description: 'This session focuses on how to use Ansible for automating infrastructure tasks and configuration management in the cloud.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, DevOps Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Ansible', 'Cloud Automation', 'Infrastructure Management']
    },

    // Room 3 - February 28
    {
        Id: 125,
        Title: 'Cloud Infrastructure and Security',
        Subject: 'Cloud Security Best Practices',
        StartTime: new Date(2025, 1, 28, 9, 0),
        EndTime: new Date(2025, 1, 28, 10, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Oliver Smith',
                title: 'Cloud Security Engineer',
                note: 'Security best practices for cloud environments to ensure data protection and compliance.'
            }
        ],
        Description: 'This session will cover best practices for securing cloud environments, including encryption, access control, and vulnerability management.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Security', 'Encryption', 'Compliance']
    },
    {
        Id: 126,
        Title: 'Cloud Infrastructure and Security',
        Subject: 'Identity and Access Management in the Cloud',
        StartTime: new Date(2025, 1, 28, 10, 15),
        EndTime: new Date(2025, 1, 28, 11, 15),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Oliver Smith',
                title: 'Cloud Security Engineer',
                note: 'Understanding IAM services in cloud platforms and how to implement them for secure access management.'
            }
        ],
        Description: 'In this session, we will explore Identity and Access Management services (IAM) in the cloud and how to implement best practices for access control.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['IAM', 'Cloud Security', 'Access Control']
    },
    {
        Id: 127,
        Title: 'Cloud Infrastructure and Security',
        Subject: 'Cloud Vulnerability Scanning and Remediation',
        StartTime: new Date(2025, 1, 28, 11, 15),
        EndTime: new Date(2025, 1, 28, 12, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mia Roberts',
                title: 'Security Specialist',
                note: 'Scanning cloud environments for vulnerabilities and effective remediation strategies to minimize risks.'
            }
        ],
        Description: 'This session covers tools and techniques for scanning cloud infrastructure for security vulnerabilities and how to remediate them.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, DevOps Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Security', 'Vulnerability Management', 'Risk Remediation']
    },
    {
        Id: 128,
        Title: 'Cloud Infrastructure and Security',
        Subject: 'Disaster Recovery and Business Continuity in Cloud',
        StartTime: new Date(2025, 1, 28, 13, 0),
        EndTime: new Date(2025, 1, 28, 14, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Mia Roberts',
                title: 'Security Specialist',
                note: 'Designing disaster recovery and business continuity plans to ensure availability of cloud-based services.'
            }
        ],
        Description: 'This session discusses designing disaster recovery strategies and business continuity plans for cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Business Continuity Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Disaster Recovery', 'Business Continuity', 'Cloud Security']
    },
    {
        Id: 130,
        Title: 'Cloud Infrastructure and Security',
        Subject: 'Cloud Network Security',
        StartTime: new Date(2025, 1, 28, 14, 30),
        EndTime: new Date(2025, 1, 28, 16, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Michael Brown',
                title: 'Network Security Expert',
                note: 'Securing cloud networks with firewalls, load balancers, and virtual private networks (VPNs).'
            }
        ],
        Description: 'This session covers the importance of securing cloud networks using various techniques such as VPNs, firewalls, and encryption.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Security Experts',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Network Security', 'Encryption', 'Firewall']
    },
    {
        Id: 131,
        Title: 'Cloud Infrastructure and Security',
        Subject: 'Zero Trust Security Model in Cloud Environments',
        StartTime: new Date(2025, 1, 28, 16, 30),
        EndTime: new Date(2025, 1, 28, 17, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Michael Brown',
                title: 'Network Security Expert',
                note: 'Understanding the Zero Trust model and how it helps secure cloud environments against modern threats.'
            }
        ],
        Description: 'In this session, we will discuss the Zero Trust security model and its importance in securing cloud-based systems.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Cloud Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Zero Trust', 'Cloud Security', 'Network Security']
    },

    // Room 4 - February 28
    {
        Id: 132,
        Title: 'Networking and Cloud Infrastructure',
        Subject: 'Networking Fundamentals for Cloud Environments',
        StartTime: new Date(2025, 1, 28, 9, 30),
        EndTime: new Date(2025, 1, 28, 10, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'James Wilson',
                title: 'Network Engineer',
                note: 'Networking concepts and protocols critical to deploying cloud infrastructure.'
            }
        ],
        Description: 'This session covers the basic networking concepts and protocols used when designing and deploying cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Architects',
        EventLevel: 'Beginner',
        EventTags: ['Networking', 'Cloud', 'Infrastructure']
    },
    {
        Id: 133,
        Title: 'Networking and Cloud Infrastructure',
        Subject: 'SDN (Software Defined Networking) and Cloud',
        StartTime: new Date(2025, 1, 28, 10, 0),
        EndTime: new Date(2025, 1, 28, 11, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'James Wilson',
                title: 'Network Engineer',
                note: 'Exploring how SDN is revolutionizing network management and the deployment of cloud services.'
            }
        ],
        Description: 'SDN allows more flexibility and control over cloud networks. This session covers its role and impact in cloud computing environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['SDN', 'Cloud', 'Networking']
    },
    {
        Id: 134,
        Title: 'Networking and Cloud Infrastructure',
        Subject: 'Virtualization and Network Function Virtualization (NFV)',
        StartTime: new Date(2025, 1, 28, 11, 30),
        EndTime: new Date(2025, 1, 28, 12, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Green',
                title: 'Cloud Engineer',
                note: 'Understanding how virtualization and NFV are used to deploy scalable, flexible, and cost-efficient cloud services.'
            }
        ],
        Description: 'In this session, we will explore how network function virtualization (NFV) and network virtualization can optimize cloud infrastructure.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Network Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Virtualization', 'NFV', 'Cloud Infrastructure']
    },
    {
        Id: 135,
        Title: 'Networking and Cloud Infrastructure',
        Subject: 'Cloud Networking Services: AWS, GCP, Azure',
        StartTime: new Date(2025, 1, 28, 13, 30),
        EndTime: new Date(2025, 1, 28, 14, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Green',
                title: 'Cloud Engineer',
                note: 'Exploring networking services provided by AWS, GCP, and Azure and their applications in cloud networking.'
            }
        ],
        Description: 'This session will compare the networking services provided by major cloud platforms like AWS, Google Cloud, and Azure.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Network Architects',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Networking', 'AWS', 'Azure', 'GCP']
    },
    {
        Id: 137,
        Title: 'Networking and Cloud Infrastructure',
        Subject: '5G Networks and Cloud Integration',
        StartTime: new Date(2025, 1, 28, 15, 0),
        EndTime: new Date(2025, 1, 28, 16, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Noah Taylor',
                title: 'Network Architect',
                note: 'Exploring the integration of 5G networks with cloud infrastructures for ultra-fast and reliable connectivity.'
            }
        ],
        Description: 'This session explores how 5G networks can be integrated with cloud infrastructures to enable faster and more reliable communication.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Architects',
        EventLevel: 'Advanced',
        EventTags: ['5G', 'Cloud Integration', 'Networking']
    },
    {
        Id: 138,
        Title: 'Networking and Cloud Infrastructure',
        Subject: 'Cloud Load Balancing and Scaling Networks',
        StartTime: new Date(2025, 1, 28, 16, 30),
        EndTime: new Date(2025, 1, 28, 17, 45),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Noah Taylor',
                title: 'Network Architect',
                note: 'Exploring techniques for load balancing and scaling networks to ensure high availability in the cloud.'
            }
        ],
        Description: 'This session will teach you how to design and implement cloud load balancing and network scaling strategies.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Networking', 'Load Balancing', 'Network Scaling']
    },

    // Room 1 - March 1
    {
        Id: 139,
        Title: 'Advanced Networking Techniques',
        Subject: 'BGP (Border Gateway Protocol) Fundamentals',
        StartTime: new Date(2025, 2, 1, 9, 0),
        EndTime: new Date(2025, 2, 1, 10, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'John Carter',
                title: 'Network Engineer',
                note: 'Understanding the fundamentals and practical applications of BGP in large-scale networks.'
            }
        ],
        Description: 'This session introduces the basics of Border Gateway Protocol (BGP) and its usage in inter-domain routing.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['BGP', 'Networking', 'Routing']
    },
    {
        Id: 140,
        Title: 'Advanced Networking Techniques',
        Subject: 'IPv6 Networking in the Cloud Era',
        StartTime: new Date(2025, 2, 1, 11, 0),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'John Carter',
                title: 'Network Engineer',
                note: 'Exploring the implementation and challenges of IPv6 addressing in cloud environments.'
            }
        ],
        Description: 'This session explores IPv6 networking fundamentals, benefits, and its role in modern cloud infrastructures.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IPv6', 'Cloud Networking', 'Networking']
    },
    {
        Id: 141,
        Title: 'Advanced Networking Techniques',
        Subject: 'Software-Defined Networking (SDN) Architecture',
        StartTime: new Date(2025, 2, 1, 12, 0),
        EndTime: new Date(2025, 2, 1, 12, 30),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Green',
                title: 'Cloud Engineer',
                note: 'In-depth look into SDN architecture and its advantages in cloud networking.'
            }
        ],
        Description: 'This session covers SDN architecture and how it enhances flexibility and management of cloud-based networks.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Architects',
        EventLevel: 'Advanced',
        EventTags: ['SDN', 'Networking', 'Cloud Architecture']
    },
    {
        Id: 142,
        Title: 'Advanced Networking Techniques',
        Subject: 'VLANs and Network Segmentation for Cloud Security',
        StartTime: new Date(2025, 2, 1, 13, 30),
        EndTime: new Date(2025, 2, 1, 15, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Michael Brown',
                title: 'Network Architect',
                note: 'Utilizing VLANs and network segmentation to improve cloud security and performance.'
            }
        ],
        Description: 'Learn how VLANs can be used to segment networks and enhance security in cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Security Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['VLAN', 'Network Security', 'Cloud']
    },

    {
        Id: 144,
        Title: 'Advanced Networking Techniques',
        Subject: 'Network Automation with Ansible and Python',
        StartTime: new Date(2025, 2, 1, 16, 0),
        EndTime: new Date(2025, 2, 1, 16, 45),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'James Wilson',
                title: 'Cloud Network Specialist',
                note: 'Automating network configurations and operations using Ansible and Python.'
            }
        ],
        Description: 'This session discusses how to automate network configuration, monitoring, and management using Ansible and Python.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Automation Engineers',
        EventLevel: 'Advanced',
        EventTags: ['Network Automation', 'Ansible', 'Python']
    },
    {
        Id: 145,
        Title: 'Advanced Networking Techniques',
        Subject: 'Network Performance Monitoring in Cloud Environments',
        StartTime: new Date(2025, 2, 1, 17, 0),
        EndTime: new Date(2025, 2, 1, 18, 0),
        RoomId: 1,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sophia Green',
                title: 'Cloud Engineer',
                note: 'Understanding how to monitor and optimize network performance in cloud-based infrastructures.'
            }
        ],
        Description: 'This session focuses on the best practices and tools for monitoring network performance in the cloud.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Network Engineers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Network Monitoring', 'Cloud Networking', 'Optimization']
    },

    // Room 2 - March 1
    {
        Id: 146,
        Title: 'Cloud Infrastructure Optimization',
        Subject: 'Optimizing Cloud Storage Solutions',
        StartTime: new Date(2025, 2, 1, 9, 30),
        EndTime: new Date(2025, 2, 1, 10, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Davis',
                title: 'Cloud Architect',
                note: 'Optimizing cloud storage solutions for performance, security, and cost-effectiveness.'
            }
        ],
        Description: 'This session covers best practices for optimizing cloud storage, ensuring efficiency and cost control.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, IT Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Storage', 'Optimization', 'Cost Management']
    },
    {
        Id: 147,
        Title: 'Cloud Infrastructure Optimization',
        Subject: 'Scaling Cloud Infrastructure with Auto-scaling Groups',
        StartTime: new Date(2025, 2, 1, 10, 45),
        EndTime: new Date(2025, 2, 1, 11, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Davis',
                title: 'Cloud Architect',
                note: 'Leveraging auto-scaling to dynamically scale cloud infrastructure based on demand.'
            }
        ],
        Description: 'Learn how auto-scaling works in cloud platforms to handle fluctuating demand and optimize resources.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Architects',
        EventLevel: 'Intermediate',
        EventTags: ['Auto-scaling', 'Cloud Infrastructure', 'Cloud Optimization']
    },
    {
        Id: 148,
        Title: 'Cloud Infrastructure Optimization',
        Subject: 'Cost Optimization in Cloud with Reserved Instances',
        StartTime: new Date(2025, 2, 1, 11, 30),
        EndTime: new Date(2025, 2, 1, 12, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Michael Green',
                title: 'Cloud Specialist',
                note: 'How to reduce costs by using reserved instances and other cost-saving strategies in the cloud.'
            }
        ],
        Description: 'This session explores how to optimize costs in the cloud by using reserved instances and other cloud cost-saving mechanisms.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Finance Professionals',
        EventLevel: 'Intermediate',
        EventTags: ['Cost Optimization', 'Cloud Economics', 'Cloud Management']
    },
    {
        Id: 149,
        Title: 'Cloud Infrastructure Optimization',
        Subject: 'Managing Multi-Cloud Environments',
        StartTime: new Date(2025, 2, 1, 13, 30),
        EndTime: new Date(2025, 2, 1, 14, 0),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Brown',
                title: 'Cloud Engineer',
                note: 'Best practices for managing resources and services in a multi-cloud environment.'
            }
        ],
        Description: 'This session will discuss best practices for handling multi-cloud environments and ensuring smooth operations.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Multi-Cloud Architects',
        EventLevel: 'Advanced',
        EventTags: ['Multi-cloud', 'Cloud Management', 'Cloud Optimization']
    },
    {
        Id: 151,
        Title: 'Cloud Infrastructure Optimization',
        Subject: 'Optimizing Cloud Database Performance',
        StartTime: new Date(2025, 2, 1, 14, 30),
        EndTime: new Date(2025, 2, 1, 16, 30),
        RoomId: 2,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Brown',
                title: 'Cloud Database Expert',
                note: 'Tips and tools for optimizing the performance of cloud-hosted databases.'
            }
        ],
        Description: 'This session will focus on strategies for improving cloud database performance and ensuring fast, efficient data retrieval.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Database Administrators, Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Databases', 'Optimization', 'Performance']
    },

    // Room 3 - March 1
    {
        Id: 152,
        Title: 'Cloud Security and Privacy',
        Subject: 'Cloud Security Essentials: Protecting Your Data in the Cloud',
        StartTime: new Date(2025, 2, 1, 9, 0),
        EndTime: new Date(2025, 2, 1, 10, 15),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Jack Turner',
                title: 'Cloud Security Specialist',
                note: 'Understanding the key principles of cloud security and data protection best practices.'
            }
        ],
        Description: 'Learn the fundamentals of cloud security, covering encryption, data protection, and risk mitigation strategies.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Cloud Architects',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Security', 'Data Protection', 'Encryption']
    },
    {
        Id: 153,
        Title: 'Cloud Security and Privacy',
        Subject: 'Implementing Identity and Access Management in Cloud',
        StartTime: new Date(2025, 2, 1, 10, 30),
        EndTime: new Date(2025, 2, 1, 11, 15),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Jack Turner',
                title: 'Cloud Security Specialist',
                note: 'Best practices for implementing IAM in cloud-based systems to ensure secure access.'
            }
        ],
        Description: 'In this session, we discuss how to implement robust Identity and Access Management (IAM) strategies for secure cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Cloud Developers',
        EventLevel: 'Intermediate',
        EventTags: ['IAM', 'Cloud Security', 'Access Management']
    },
    {
        Id: 154,
        Title: 'Cloud Security and Privacy',
        Subject: 'Securing Cloud-Based APIs and Microservices',
        StartTime: new Date(2025, 2, 1, 11, 15),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Sarah Collins',
                title: 'Cloud Engineer',
                note: 'Focusing on securing APIs and microservices in a cloud-based environment using the latest tools.'
            }
        ],
        Description: 'Learn how to secure APIs and microservices, including OAuth, encryption, and token management for cloud applications.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, API Developers',
        EventLevel: 'Intermediate',
        EventTags: ['API Security', 'Microservices', 'Cloud Security']
    },
    {
        Id: 156,
        Title: 'Cloud Security and Privacy',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 2, 1, 12, 0),
        EndTime: new Date(2025, 2, 1, 13, 0),
        RoomId: 3,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for networking and relaxation.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All Levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 155,
        Title: 'Cloud Security and Privacy',
        Subject: 'Understanding Cloud Compliance and Regulatory Requirements',
        StartTime: new Date(2025, 2, 1, 13, 0),
        EndTime: new Date(2025, 2, 1, 14, 30),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'Michael Davis',
                title: 'Cloud Compliance Expert',
                note: 'A guide to navigating the regulatory requirements that affect cloud deployments and services.'
            }
        ],
        Description: 'This session will help you understand various compliance frameworks and their implementation in the cloud environment.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Architects, Compliance Officers',
        EventLevel: 'Advanced',
        EventTags: ['Compliance', 'Cloud Security', 'Regulatory Requirements']
    },
    {
        Id: 157,
        Title: 'Cloud Security and Privacy',
        Subject: 'Incident Response in Cloud Environments',
        StartTime: new Date(2025, 2, 1, 15, 0),
        EndTime: new Date(2025, 2, 1, 16, 15),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Wright',
                title: 'Incident Response Specialist',
                note: 'Learn how to effectively respond to and manage security incidents in a cloud environment.'
            }
        ],
        Description: 'In this session, we’ll cover the incident response process in cloud environments, including tools and strategies for mitigation.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Professionals, Incident Response Teams',
        EventLevel: 'Advanced',
        EventTags: ['Incident Response', 'Cloud Security', 'Security Mitigation']
    },
    {
        Id: 158,
        Title: 'Cloud Security and Privacy',
        Subject: 'Advanced Cloud Encryption Techniques',
        StartTime: new Date(2025, 2, 1, 17, 0),
        EndTime: new Date(2025, 2, 1, 17, 45),
        RoomId: 3,
        Capacity: 100,
        Speakers: [
            {
                name: 'David Wright',
                title: 'Encryption Specialist',
                note: 'A deep dive into advanced encryption methods used to protect data in cloud environments.'
            }
        ],
        Description: 'This session will discuss advanced encryption techniques, key management, and how to protect sensitive data in cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Security Engineers, Cloud Architects',
        EventLevel: 'Advanced',
        EventTags: ['Encryption', 'Cloud Security', 'Data Protection']
    },

    // Room 4 - March 1
    {
        Id: 159,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Introduction to DevOps in Cloud Environments',
        StartTime: new Date(2025, 2, 1, 9, 0),
        EndTime: new Date(2025, 2, 1, 9, 45),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Martinez',
                title: 'DevOps Engineer',
                note: 'An introduction to the key principles and practices of DevOps in cloud-based systems.'
            }
        ],
        Description: 'This session covers the basics of DevOps principles, including continuous integration and continuous delivery in the cloud.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['DevOps', 'Cloud Automation', 'CI/CD']
    },
    {
        Id: 160,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Automating Cloud Deployments with Infrastructure as Code (IaC)',
        StartTime: new Date(2025, 2, 1, 9, 45),
        EndTime: new Date(2025, 2, 1, 10, 15),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Martinez',
                title: 'DevOps Engineer',
                note: 'Using IaC tools like Terraform and CloudFormation to automate infrastructure deployment in the cloud.'
            }
        ],
        Description: 'This session will demonstrate how to use Infrastructure as Code (IaC) tools to automate and manage cloud infrastructure.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Architects',
        EventLevel: 'Intermediate',
        EventTags: ['IaC', 'Cloud Automation', 'Terraform']
    },
    {
        Id: 93,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Break',
        StartTime: new Date(2025, 2, 1, 10, 15),
        EndTime: new Date(2025, 2, 1, 10, 45),
        RoomId: 4,
        Capacity: 0,
        Speakers: [],
        Description: 'A short break for attendees to relax and network.',
        Duration: '30 minutes',
        EventType: 'Break',
        TargetAudience: 'All Participants',
        EventLevel: 'All Levels',
        EventTags: ['Networking', 'Relax']
    },
    {
        Id: 161,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Continuous Integration and Delivery (CI/CD) for Cloud Applications',
        StartTime: new Date(2025, 2, 1, 10, 45),
        EndTime: new Date(2025, 2, 1, 12, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Parker',
                title: 'Cloud DevOps Engineer',
                note: 'In-depth exploration of CI/CD pipelines in cloud environments using Jenkins, CircleCI, and AWS CodePipeline.'
            }
        ],
        Description: 'This session focuses on setting up and managing CI/CD pipelines for cloud-based applications to achieve faster development cycles.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Developers',
        EventLevel: 'Advanced',
        EventTags: ['CI/CD', 'Cloud Applications', 'DevOps']
    },
    {
        Id: 163,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Lunch Break',
        StartTime: new Date(2025, 2, 1, 12, 0),
        EndTime: new Date(2025, 2, 1, 13, 0),
        RoomId: 4,
        Capacity: 0,
        Speakers: [],
        Description: 'Lunch break for networking and relaxation.',
        Duration: '1 hour',
        EventType: 'Break',
        TargetAudience: 'All Attendees',
        EventLevel: 'All Levels',
        EventTags: ['Break', 'Networking']
    },
    {
        Id: 162,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Serverless Architectures and Automation in the Cloud',
        StartTime: new Date(2025, 2, 1, 13, 0),
        EndTime: new Date(2025, 2, 1, 14, 30),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Ethan Parker',
                title: 'Cloud DevOps Engineer',
                note: 'Exploring serverless architecture and how to automate deployments with cloud-native tools.'
            }
        ],
        Description: 'This session will cover the benefits of serverless architecture and how to automate deployments using cloud-native services.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Architects',
        EventLevel: 'Advanced',
        EventTags: ['Serverless', 'Cloud Automation', 'DevOps']
    },
    {
        Id: 164,
        Title: 'Cloud DevOps and Automation',
        Subject: 'Monitoring and Logging for Cloud Infrastructure',
        StartTime: new Date(2025, 2, 1, 15, 0),
        EndTime: new Date(2025, 2, 1, 17, 0),
        RoomId: 4,
        Capacity: 100,
        Speakers: [
            {
                name: 'Hannah Lee',
                title: 'DevOps Specialist',
                note: 'Best practices for monitoring and logging cloud infrastructure, using tools like CloudWatch and ELK Stack.'
            }
        ],
        Description: 'In this session, we’ll discuss how to monitor and log cloud infrastructure effectively to ensure operational efficiency.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'DevOps Engineers, Cloud Administrators',
        EventLevel: 'Intermediate',
        EventTags: ['Monitoring', 'Cloud Logging', 'DevOps']
    }
];

let treeView2Data = [
    {
        Id: 1,
        Title: 'Cloud Security Essentials',
        Subject: 'Securing Cloud Networks and Data',
        Capacity: 100,
        Speakers: [
            {
                name: 'Aidan Cole',
                title: 'Cloud Security Expert',
                note: 'Best practices for securing cloud networks and protecting sensitive data in the cloud.'
            },
            {
                name: 'Riley Smith',
                title: 'Security Engineer',
                note: 'Hands-on strategies for implementing robust cloud security measures.'
            }
        ],
        Description: 'Learn key strategies and tools for securing cloud networks and managing cloud data securely.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Security Experts',
        EventLevel: 'Intermediate',
        EventTags: ['Cloud Security', 'Data Protection', 'Network Security']
    },
    {
        Id: 2,
        Title: 'Cloud Security Essentials',
        Subject: 'Identity and Access Management in Cloud',
        Capacity: 100,
        Speakers: [
            {
                name: 'Emily Parker',
                title: 'IAM Specialist',
                note: 'Implementing identity and access management in cloud environments to enhance security.'
            },
            {
                name: 'Mason Reed',
                title: 'Cloud Engineer',
                note: 'Configuring IAM solutions like AWS IAM, Azure Active Directory for optimal security.'
            }
        ],
        Description: 'Discover how to implement Identity and Access Management (IAM) solutions to secure cloud-based resources.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Administrators, Security Engineers',
        EventLevel: 'Intermediate',
        EventTags: ['IAM', 'Cloud Security', 'Access Control']
    },
    {
        Id: 3,
        Title: 'Cloud Security Essentials',
        Subject: 'Cloud Data Encryption and Privacy',
        Capacity: 100,
        Speakers: [
            {
                name: 'Jordan Lee',
                title: 'Security Consultant',
                note: 'Data encryption techniques for securing sensitive data in the cloud environment.'
            },
            {
                name: 'Sarah Khan',
                title: 'Cloud Architect',
                note: 'Architecting systems that comply with data privacy regulations and ensure data integrity.'
            }
        ],
        Description: 'Implement data encryption techniques and privacy measures to safeguard cloud-based data.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Architects, Data Protection Officers',
        EventLevel: 'Intermediate',
        EventTags: ['Encryption', 'Cloud Privacy', 'Data Protection']
    },
    {
        Id: 4,
        Title: 'Cloud Security Essentials',
        Subject: 'Threat Detection in Cloud Environments',
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Brooks',
                title: 'Security Analyst',
                note: 'Exploring tools and methodologies for detecting security threats in cloud platforms.'
            },
            {
                name: 'David Shaw',
                title: 'Security Engineer',
                note: 'Using cloud-native threat detection systems like AWS GuardDuty, Azure Security Center.'
            }
        ],
        Description: 'Learn how to detect threats using advanced security tools and AI-powered threat intelligence in cloud environments.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Security Engineers, IT Professionals',
        EventLevel: 'Advanced',
        EventTags: ['Cloud Threats', 'Cloud Security', 'Threat Detection']
    },
    {
        Id: 5,
        Title: 'Cloud Security Essentials',
        Subject: 'Disaster Recovery and Backup in Cloud',
        Capacity: 100,
        Speakers: [
            {
                name: 'Maxwell Davis',
                title: 'Cloud Recovery Specialist',
                note: 'Implementing robust disaster recovery and backup strategies in cloud infrastructure.'
            },
            {
                name: 'Grace Evans',
                title: 'Cloud Engineer',
                note: 'Best practices for backup and disaster recovery to ensure business continuity in the cloud.'
            }
        ],
        Description: 'Strategies for implementing disaster recovery and backup solutions in the cloud for maximum data protection.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Cloud Engineers, Disaster Recovery Experts',
        EventLevel: 'Intermediate',
        EventTags: ['Backup', 'Disaster Recovery', 'Cloud Security']
    }
];

let treeView3Data = [
    {
        Id: 6,
        Title: 'AI for Automation',
        Subject: 'Automating Tasks with AI and Machine Learning',
        Capacity: 100,
        Speakers: [
            {
                name: 'Olivia Grant',
                title: 'AI Researcher',
                note: 'Exploring the use of AI to automate repetitive tasks and optimize workflows.'
            },
            {
                name: 'Liam Young',
                title: 'AI Engineer',
                note: 'Hands-on implementation of machine learning models for automation.'
            }
        ],
        Description: 'Learn how AI and machine learning can automate processes, enhancing productivity and efficiency.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'AI Engineers, Automation Specialists',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Automation', 'Machine Learning']
    },
    {
        Id: 7,
        Title: 'AI for Automation',
        Subject: 'AI for Process Optimization',
        Capacity: 100,
        Speakers: [
            {
                name: 'Nina Brooks',
                title: 'Machine Learning Expert',
                note: 'Optimizing processes and workflows using AI algorithms for better outcomes.'
            },
            {
                name: 'Daniel Foster',
                title: 'Data Scientist',
                note: 'Practical applications of AI in process optimization across industries.'
            }
        ],
        Description: 'Explore how AI can optimize business processes to reduce costs and improve performance.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Data Scientists, Business Analysts',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Process Optimization', 'Automation']
    },
    {
        Id: 8,
        Title: 'AI for Automation',
        Subject: 'Implementing AI-Powered Automation Solutions',
        Capacity: 100,
        Speakers: [
            {
                name: 'George Walsh',
                title: 'AI Solutions Architect',
                note: 'Designing end-to-end AI-powered automation systems for various business needs.'
            },
            {
                name: 'Isabella Johnson',
                title: 'Machine Learning Developer',
                note: 'Integrating AI models into business applications for real-world automation.'
            }
        ],
        Description: 'Learn how to implement AI-powered automation solutions to streamline processes in business.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Solutions Architects, AI Engineers',
        EventLevel: 'Advanced',
        EventTags: ['AI Automation', 'Business Solutions', 'Machine Learning']
    },
    {
        Id: 9,
        Title: 'AI for Automation',
        Subject: 'AI for Predictive Maintenance',
        Capacity: 100,
        Speakers: [
            {
                name: 'Lena Parker',
                title: 'AI Expert',
                note: 'Using AI for predictive maintenance in industries like manufacturing and healthcare.'
            },
            {
                name: 'Oscar Lee',
                title: 'Maintenance Engineer',
                note: 'Leveraging AI-driven insights to predict equipment failure before it occurs.'
            }
        ],
        Description: 'Discover how AI-driven predictive maintenance can enhance operational efficiency and reduce costs.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Manufacturing Engineers, Data Scientists',
        EventLevel: 'Advanced',
        EventTags: ['AI', 'Predictive Maintenance', 'Industrial Automation']
    },
    {
        Id: 10,
        Title: 'AI for Automation',
        Subject: 'AI-Powered Chatbots for Business',
        Capacity: 100,
        Speakers: [
            {
                name: 'David Morris',
                title: 'AI Specialist',
                note: 'Building intelligent AI-powered chatbots to automate customer support and services.'
            },
            {
                name: 'Sophie Turner',
                title: 'Chatbot Developer',
                note: 'Creating and integrating AI-powered chatbots into customer service workflows.'
            }
        ],
        Description: 'Learn how to design and deploy AI chatbots to automate customer interactions and improve service delivery.',
        Duration: '1 hour',
        EventType: 'Technical Session',
        TargetAudience: 'Developers, Customer Service Managers',
        EventLevel: 'Intermediate',
        EventTags: ['AI', 'Chatbots', 'Automation']
    }
];

let availableEvents = treeView2Data.concat(treeView3Data);

let eventsName = [];

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
        if (!toRemoveIndexes.has(i) && !checkRoomCapacity(currentEvent.Capacity, currentEvent.RoomId)) {
            filteredEvents.push(currentEvent);
            if (currentEvent.Title && !eventsName.some((item) => item.name === currentEvent.Title)) {
                eventsName.push({ id: eventsName.length + 1, name: currentEvent.Title });
            }
        }
    }

    return filteredEvents;
}

const checkRoomAvailability = (startTime, endTime, eventId, roomId) => {

    let result = events.some((event) => {
        if (event.Id === eventId) {
            return false; // Skip this event
        }
        return (
            event.RoomId === roomId &&
            ((startTime >= event.StartTime && startTime < event.EndTime) ||
                (endTime > event.StartTime && endTime <= event.EndTime) ||
                (startTime <= event.StartTime && endTime >= event.EndTime))
        );
    });
    return result;
};



const checkRoomCapacity = (Capacity, RoomId) => {
    const room = rooms.find((room) => room.RoomId === RoomId);
    return room && room.RoomCapacity < Capacity;
}

events = removeOverlappingEvents(events);








const App = () => {
    const scheduleObj = useRef(null);
    const instance = new Internationalization();

    let eventsData = events;
    const [selectedRoom, setSelectedRoom] = useState(null);

    const onActionBegin = (args) => {
        if (args.requestType === "eventCreate") {
            let eventsData = args.requestType === "eventCreate" ? args.data[0] : args.data;
            const { StartTime, EndTime, RoomId, capacity, Title } = eventsData;

            if (checkRoomAvailability(StartTime, EndTime, null, RoomId)) {
                dialogInstance.current.content = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
                setStatus(true);
                args.cancel = true;
                return;
            }

            if (checkRoomCapacity(capacity, RoomId)) {
                dialogInstance.current.content = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
                setStatus(true);
                args.cancel = true;
                return;
            }

            if (!eventsName.some((item) => item.name === Title)) {
                eventsName.push({ id: eventsName.length + 1, name: Title });
            }
        }
        if (args.requestType === 'toolbarItemRendering') {
            let exportItem1 = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-export-excel',
                text: 'Excel Export', cssClass: 'e-excel-export', click: onExportClick
            };
            let exportItem2 = {
                align: 'Right', showTextOn: 'Both', prefixIcon: 'e-icons e-print',
                text: 'Print', cssClass: 'e-schedule-print', click: onPrintIconClick
            };
            args.items.push({ align: 'Right', cssClass: 'e-toolbar-item e-schedule-seperator e-separator' });
            args.items.push(exportItem1);
            args.items.push(exportItem2);
        }

        if (args.requestType === 'eventCreate' && isTreeItemDropped) {
            let listObjects = [treeObj1, treeObj2, treeObj3];
            let treeObj = listObjects[activeTab].current;
            let treeViewData = treeObj.fields.dataSource;
            const filteredPeople = treeViewData.filter((item) => item.Id !== parseInt(draggedItemId, 10));
            treeObj.fields.dataSource = filteredPeople;
            let elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i = 0; i < elements.length; i++) {
                remove(elements[i]);
            }
        }

    }

    const onExportClick = () => {
        const exportFields = [
            { name: 'RoomId', text: 'RoomId' },
            { name: 'Subject', text: 'Subject' },
            { name: 'StartTime', text: 'StartTime' },
            { name: 'EndTime', text: 'EndTime' }
        ];
        const exportValues = { fieldsInfo: exportFields };
        scheduleObj.current.exportToExcel(exportValues);
    }

    const onPrintIconClick = () => {
        scheduleObj.current.print();
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

    const getRoomName = (value) => {
        return ((value.resourceData) ?
            value.resourceData[value.resource.textField] :
            value.resourceName);
    }

    const getCapacity = (value) => {
        return 'Capacity - ' + value.resourceData.RoomCapacity;
    }

    const resourceHeaderTemplate = (props) => {
        console.log(props);
        return (<div className="template-wrap">
            <div className="resource-detail"><div className="resource-name">{getRoomName(props)}</div>
                <div>
                    <span className='e-icons e-capacity-icon'></span>
                    <span className='e-capacity'>{getCapacity(props)}</span>
                </div>
                {/* <div className="resource-designation">{getCapacity(props)}</div> */}
            </div></div>);
    }

    const onEventRendered = (args) => {
        console.log(args.data);
    }

    const onDragStop = (args) => {
        console.log(args);
        let eventsData = args.data;
        const { StartTime, EndTime, RoomId, Capacity } = eventsData;

        if (checkRoomAvailability(StartTime, EndTime, null, RoomId)) {
            dialogInstance.current.content = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
            setStatus(true);
            args.cancel = true;
            // return;
        } else if (checkRoomCapacity(Capacity, RoomId)) {
            dialogInstance.current.content = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
            setStatus(true);
            args.cancel = true;
        }
    }


    let dialogInstance = useRef(null);
    const [status, setStatus] = useState(false);
    let animationSettings = { effect: 'None' };
    let buttons = [
        {
            // Click the footer buttons to hide the Dialog
            click: () => {
                setStatus(false);
            },
            // Accessing button component properties by buttonModel property
            buttonModel: {
                //Enables the primary button
                isPrimary: true,
                content: 'OK',
            },
        },
    ];
    const dialogClose = () => {
        setStatus(false);
    };
    const dialogOpen = () => {
        setStatus(true);
    };

    const headerTooltipTemplate = (props) => {
        let roomName = getRoomName(props); // Assuming getRoomName is a function that returns room name

        if (roomName === 'Room A') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>Projector</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>High-speed Internet</li>
                        <li>Conference Phone</li>
                        <li>Adjustable Lighting</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                    </ul>
                </div>
            );
        } else if (roomName === 'Room B') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>4K Display</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>Video Conferencing Setup</li>
                        <li>High-speed Internet</li>
                        <li>Adjustable Lighting</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                    </ul>
                </div>
            );
        } else if (roomName === 'Room C') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>Projector</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>High-speed Internet</li>
                        <li>Air Conditioning</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                        <li>Video Recording Setup</li>
                    </ul>
                </div>
            );
        } else if (roomName === 'Room D') {
            return (
                <div className="template-wrap">
                    <div className="header">
                        Room Facilities
                    </div>
                    <ul className="facilities-list">
                        <li>Projector</li>
                        <li>Whiteboard</li>
                        <li>Audio System</li>
                        <li>High-speed Internet</li>
                        <li>Conference Phone</li>
                        <li>Adjustable Lighting</li>
                        <li>Power outlets available</li>
                        <li>Coffee/Water Station</li>
                    </ul>
                </div>
            );
        }

        // Return null or any fallback if the room name is neither Room A nor Room B
        return null;
    };

    const fieldsData = {
        subject: { name: 'Subject' },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } },
        roomId: { name: 'RoomId' },
        description: {
            name: 'Capacity', title: 'Participants Count',
            validation: { required: true }
            // validation: { required: true, minLength: [minValidation(fieldsData), 'Need atleast 5 letters to be entered'] }
        },
        location: { name: 'Title', title: 'Event Title' }
    };

    let cellTarget;

    const onPopupOpen = (args) => {
        cellTarget = args.target;
    }

    const onPopupClose = (args) => {
        if (args.type === 'Editor' && args.event.target.textContent === 'Save') {
            let roomId = args.data.RoomId;
            let startTime = args.data.StartTime;
            let endTime = args.data.EndTime;
            let capacity = args.data.Capacity;
            let eventId = null;
            if (args.target) {
                eventId = scheduleObj.current.getEventDetails(args.target).Id;
            }
            let isRoomAvailable = !checkRoomAvailability(startTime, endTime, eventId, roomId);
            let isCapacityAvailable = !checkRoomCapacity(capacity, roomId);

            if (!isRoomAvailable) {
                let timeElement = args.element.querySelector('.e-start-end-row');
                if (!args.element.querySelector('.time-alert')) {
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('time-alert');
                    newDiv.textContent = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
                    timeElement.insertAdjacentElement('afterend', newDiv);
                }
            } else {
                if (args.element.querySelector('.time-alert')) {
                    args.element.querySelector('.time-alert').remove();
                }
            }

            if (!isCapacityAvailable) {
                let timeElement = args.element.querySelector('.e-description-row');
                if (!args.element.querySelector('.capacity-alert')) {
                    const newDiv = document.createElement('div');
                    newDiv.classList.add('capacity-alert');
                    newDiv.textContent = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
                    timeElement.insertAdjacentElement('afterend', newDiv);
                }
            } else {
                if (args.element.querySelector('.capacity-alert')) {
                    args.element.querySelector('.capacity-alert').remove();
                }
            }

            if (!isRoomAvailable || !isCapacityAvailable) {
                args.cancel = true;
            }
        }
    }


    const getTimeString = (value) => {
        return instance.formatDate(value, { type: 'time', skeleton: 'short' });
    }

    const agendaTemplate = (props) => {
        console.log(props);
        return (
            <div className="agenda-event">
                <div className="event-header">
                    <div className="event-subject">
                        <strong>{props.Subject}</strong>
                    </div>
                    <div className="event-description">{props.Description}</div>
                </div>

                <div className="event-time">
                    <strong><label>Time Slot</label>: </strong>{getTimeString(props.StartTime) + ' - ' + getTimeString(props.EndTime)}
                </div>

                {props.Subject.toLowerCase().indexOf('break') === -1 && props.Subject.toLowerCase().indexOf('lunch') === -1 && (
                    <div className="event-details">
                        <div className="event-type"><strong><label>Event Type</label>: </strong>{props.EventType}</div>
                        <div className="event-capacity"><strong><label>Audience Size</label>: </strong>{props.Capacity}</div>
                    </div>
                )}

                {props.Speakers && props.Speakers.length > 0 && (
                    <div className="event-speaker">
                        <strong><label>Speakers</label>:</strong>
                        {props.Speakers.map((speaker, index) => (
                            <div className="speaker-details">
                                <div className="speaker-image"></div>
                                <div className="speaker-info">
                                    <div><strong>{props.Speakers[index].name}</strong></div>
                                    <div>{props.Speakers[index].title}</div>
                                    <div>{props.Speakers[index].note}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    const [filter, setFilter] = useState('');

    // Handle filtering based on the text input
    const onFilterChange = (e) => {
        setFilter(e.itemData.name);
    };

    // Create the query to filter events
    const filteredQuery = new Query().where('Title', 'contains', filter, true);

    let treeObj1 = useRef(null);
    let treeObj2 = useRef(null);
    let treeObj3 = useRef(null);
    let isTreeItemDropped = false;
    let draggedItemId = '';
    const allowDragAndDrops = true;
    const fields1 = { dataSource: availableEvents, id: 'Id', text: 'Subject', duration: 'Duration' };
    const fields2 = { dataSource: treeView2Data, id: 'Id', text: 'Subject', duration: 'Duration' };
    const fields3 = { dataSource: treeView3Data, id: 'Id', text: 'Subject', duration: 'Duration' };

    const treeTemplate = (props) => {
        return (
            <div id="waiting">
                <div id="waitdetails">
                    <div id="waitlist">{props.Subject}</div>
                    <div id="waitduration">Duration: {props.Duration}</div>
                    <div id="waitcapacity">Audience Size: {props.Capacity}</div>
                </div>
            </div>
        );
    }

    const onItemSelecting = (args) => {
        args.cancel = true;
    };
    const onTreeDrag = (event) => {
        if (scheduleObj.current.isAdaptive) {
            let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
    };

    const onTreeDragStop = (event) => {
        let treeElement = closest(event.target, '.e-treeview');
        let classElement = scheduleObj.current.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement = closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData = treeObj1.current.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    const { Subject, Capacity, Speakers, Description, Duration, EventType, TargetAudience, EventLevel, EventTags, Title } = filteredData[0];

                    let cellData = scheduleObj.current.getCellDetails(event.target);
                    let StartTime = cellData.startTime;
                    let EndTime;

                    // Extracting the number and the unit from the duration
                    let durationValue = parseInt(Duration.split(' ')[0]);
                    let durationUnit = Duration.split(' ')[1];

                    // Create a copy of the StartTime to avoid mutating the original StartTime
                    let endTime = new Date(StartTime);

                    if (durationUnit === 'hour' || durationUnit === 'hours') {
                        endTime.setHours(endTime.getHours() + durationValue);  // Adds hours to StartTime
                    } else if (durationUnit === 'minute' || durationUnit === 'minutes') {
                        endTime.setMinutes(endTime.getMinutes() + durationValue);  // Adds minutes to StartTime
                    }

                    EndTime = endTime;

                    let resourceDetails = scheduleObj.current.getResourcesByIndex(cellData.groupIndex);
                    let roomId = resourceDetails.resourceData.RoomId;

                    if (checkRoomAvailability(StartTime, EndTime, null, roomId)) {
                        dialogInstance.current.content = 'The room is already booked for this time slot. Please select a different room or choose another available time.';
                        setStatus(true);
                        return;
                    } else if (checkRoomCapacity(Capacity, roomId)) {
                        dialogInstance.current.content = 'The room cannot accommodate the number of attendees. Please select a different room that is suitable for the required capacity.';
                        setStatus(true);
                        return;
                    }

                    let eventData = {
                        Subject: Subject,
                        Title: Title,
                        StartTime: StartTime,
                        EndTime: EndTime,
                        RoomId: roomId,
                        Capacity: Capacity,
                        Speakers: Speakers,
                        Description: Description,
                        Duration: Duration,
                        EventType: EventType,
                        TargetAudience: TargetAudience,
                        EventLevel: EventLevel,
                        EventTags: EventTags,
                        IsAllDay: cellData.isAllDay,
                    };
                    scheduleObj.current.openEditor(eventData, 'Add', true);
                    isTreeItemDropped = true;
                    draggedItemId = event.draggedNodeData.id;
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    };

    const onTreeDragStart = () => {
        document.body.classList.add('e-disble-not-allowed');
    };


    const getResourceData = (data) => {
        const resources = scheduleObj.current.getResourceCollections().slice(-1)[0];
        const resourceData = (resources.dataSource).filter((resource) => resource.RoomId === data.RoomId)[0];
        return resourceData;
    }

    const getHeaderStyles = (data) => {
        if (data.elementType === 'cell') {
            return { alignItems: 'center', color: '#919191' };
        }
        else {
            const resourceData = getResourceData(data);
            return { background: resourceData.RoomColor, color: '#FFFFFF' };
        }
    }

    const getHeaderTitle = (data) => {
        return (data.elementType === 'cell') ? 'Add Event Details' : data.Subject;
    }

    const getHeaderDetails = (data) => {
        return instance.formatDate(data.StartTime, { type: 'date', skeleton: 'full' }) + ' (' +
            instance.formatDate(data.StartTime, { skeleton: 'hm' }) + ' - ' +
            instance.formatDate(data.EndTime, { skeleton: 'hm' }) + ')';
    }

    const buttonClickActions = (e) => {
        const eventDetails = scheduleObj.current.activeEventData.event;
        const addObj = {};
        const quickPopup = closest(e.target, '.e-quick-popup-wrapper');
        const isCellPopup = quickPopup.firstElementChild.classList.contains('e-cell-popup');
        if (isCellPopup) {
            let cellData = scheduleObj.current.getCellDetails(cellTarget);
            let resourceDetails = scheduleObj.current.getResourcesByIndex(cellData.groupIndex);
            let roomId = resourceDetails.resourceData.RoomId;

            addObj.Id = scheduleObj.current.getEventMaxID();
            addObj.Subject = isNullOrUndefined(topicObj.current.value) ? '' : topicObj.current.value;
            addObj.StartTime = new Date(scheduleObj.current.activeCellsData.startTime);
            addObj.EndTime = new Date(scheduleObj.current.activeCellsData.endTime);
            addObj.IsAllDay = scheduleObj.current.activeCellsData.isAllDay;
            addObj.Capacity = isNullOrUndefined(capacityObj.current.value) ? 'Add notes' : capacityObj.current.value;
            addObj.Title = isNullOrUndefined(titleObj.current.value) ? '' : titleObj.current.value;
            addObj.RoomId = roomId;
        }
        if (e.target.id === 'add') {
            scheduleObj.current.addEvent(addObj);
        } else if (e.target.id === 'delete') {
            let currentAction = 'Delete';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'DeleteOccurrence';
            }
            scheduleObj.current.deleteEvent(eventDetails, currentAction);
        }
        else {
            const eventDetails = isCellPopup ? addObj : scheduleObj.current.activeEventData.event;
            let currentAction = isCellPopup ? 'Add' : 'Save';
            if (eventDetails.RecurrenceRule) {
                currentAction = 'EditOccurrence';
            }
            scheduleObj.current.openEditor(eventDetails, currentAction, true);
        }
        scheduleObj.current.closeQuickInfoPopup();
    };

    const headerTemplate = (props) => {
        return (
            <div className="quick-info-header">
                <div className="quick-info-header-content" style={getHeaderStyles(props)}>
                    <div className="quick-info-title">{getHeaderTitle(props)}</div>
                    {props.elementType !== 'cell' && (
                        <div className="duration-text">{getHeaderDetails(props)}</div>
                    )}
                </div>
            </div>
        );
    }

    let titleObj = useRef(null);
    let topicObj = useRef(null);
    let capacityObj = useRef(null);

    const contentTemplate = (props) => {
        return (
            <div className="quick-info-content">
                {props.elementType === 'cell' ?
                    <div className="e-cell-content">
                        <div className="content-area">
                            <TextBoxComponent id="topic" ref={topicObj} placeholder="Topic" />
                        </div>
                        <div className="content-area">
                            <TextBoxComponent id="title" ref={titleObj} placeholder="Title" />
                        </div>
                        {/* <div className="content-area">
                            <DropDownListComponent id="eventType" ref={eventTypeObj} dataSource={roomData} fields={{ text: "Name", value: "Id" }} placeholder="Choose Type" index={0} popupHeight="200px" />
                        </div> */}
                        <div className="content-area">
                            <TextBoxComponent id="capacity" ref={capacityObj} placeholder="Participants Count" />
                        </div>
                    </div>
                    :
                    <div className="event-content">
                        <div className="meeting-type-wrap">
                            <label>Subject</label>:
                            <span>{props.Description}</span>
                        </div>
                        <div className="meeting-subject-wrap">
                            <label>Type</label>:
                            <span>{props.EventType}</span>
                        </div>
                        {props.Speakers && props.Speakers.length > 0 && (
                            <div className="notes-wrap">
                                <label>Speakers</label>:
                                {props.Speakers.map((speaker, index) => (
                                    <div key={index}>
                                        {speaker.name} ({speaker.title})
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                }
            </div>
        );
    }

    const footerTemplate = (props) => {
        return (
            <div className="quick-info-footer">
                {props.elementType === "cell" ?
                    <div className="cell-footer">
                        <ButtonComponent id="more-details" cssClass='e-flat' content="More Details" onClick={buttonClickActions.bind(this)} />
                        <ButtonComponent id="add" cssClass='e-flat' content="Add" isPrimary={true} onClick={buttonClickActions.bind(this)} />
                    </div>
                    :
                    <div className="event-footer">
                        <ButtonComponent id="delete" cssClass='e-flat' content="Delete" onClick={buttonClickActions.bind(this)} />
                        <ButtonComponent id="edit" cssClass='e-flat' content="Edit" isPrimary={true} onClick={buttonClickActions.bind(this)} />
                    </div>
                }
            </div>
        );
    }




    let listObjects = [];
    let activeTab = 0;
    let styleNone = { display: "none" };

    let type = ['', 'Cloud Security Essentials', 'AI for Automation'];

    let headerText = [
        { "text": "All" },
        { "text": "Cloud Security Essentials" },
        { "text": "AI for Automation" }];

    const filterData = (dataSource, value) => {
        let newData = dataSource.filter((data) => data.Title === value);
        return newData;
    }


    const selectedHanlder = (args) => {
        if (treeObj1 !== undefined) {
            activeTab = args.selectedIndex;
            listObjects = [treeObj1, treeObj2, treeObj3];
            let newData;
            if (activeTab === 0) {
                listObjects[activeTab].current.fields.dataSource = (listObjects[1].current.fields.dataSource).concat(listObjects[2].current.fields.dataSource);
            } else {
                newData = filterData(availableEvents, type[activeTab]); // Filter the data while selecting tab
                listObjects[activeTab].current.fields.dataSource = newData;
            }
        }
    };

    return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
            <div className='control-wrapper drag-sample-wrapper'>
                <div className="schedule-container">
                    <ScheduleComponent
                        ref={scheduleObj}
                        cssClass='schedule-drag-drop'
                        currentView='Day'
                        selectedDate={new Date(2025, 1, 24)}
                        width='100%' height='600px'
                        startHour="08:00"
                        endHour="18:00"
                        eventSettings={{ dataSource: eventsData, fields: fieldsData, query: filteredQuery }}
                        group={{ resources: ['Rooms'], headerTooltipTemplate: headerTooltipTemplate.bind(this) }}
                        actionBegin={onActionBegin}
                        resourceHeaderTemplate={resourceHeaderTemplate}
                        eventRendered={onEventRendered}
                        dragStop={onDragStop}
                        popupClose={onPopupClose}

                        quickInfoTemplates={{ header: headerTemplate.bind(this), content: contentTemplate.bind(this), footer: footerTemplate.bind(this) }} popupOpen={onPopupOpen.bind(this)}

                    >
                        <ViewsDirective>
                            <ViewDirective option="Day" />
                            <ViewDirective option="Week" />
                            <ViewDirective option="Agenda" eventTemplate={agendaTemplate} />
                        </ViewsDirective>
                        <ResourcesDirective>
                            <ResourceDirective
                                field="RoomId"
                                title="Rooms"
                                name="Rooms"
                                dataSource={rooms}
                                textField="RoomName"
                                idField="RoomId"
                                colorField="RoomColor"
                                capacityField='Capacity'
                            />
                        </ResourcesDirective>
                        <Inject services={[TimelineViews, Agenda, Week, Day, DragAndDrop, ExcelExport, Print]} />
                    </ScheduleComponent>
                </div>
                <div className="treeview-container">
                    <div className="title-container">
                        <h1 className="title-text">Event Queue:</h1>
                    </div>
                    <div id="list-container">
                        <div>
                            {/* Tab element */}
                            <TabComponent id="tab" selected={selectedHanlder.bind(this)} >
                                <TabItemsDirective>
                                    <TabItemDirective header={headerText[0]} content={"#treeview1"} />
                                    <TabItemDirective header={headerText[1]} content={"#treeview2"} />
                                    <TabItemDirective header={headerText[2]} content={"#treeview3"} />
                                </TabItemsDirective>
                            </TabComponent>
                        </div>
                        {/* ListView element */}
                        <TreeViewComponent ref={treeObj1} id="treeview1" style={styleNone} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields1} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                        <TreeViewComponent ref={treeObj2} id='treeview2' style={styleNone} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields2} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                        <TreeViewComponent ref={treeObj3} id='treeview3' style={styleNone} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={treeTemplate} fields={fields3} nodeDragStop={onTreeDragStop} nodeSelecting={onItemSelecting} nodeDragging={onTreeDrag} nodeDragStart={onTreeDragStart} allowDragAndDrop={allowDragAndDrops} />
                    </div>

                </div>
                <div id="target" className="col-lg-8">
                    <DialogComponent id="modalDialog" isModal={true} buttons={buttons} header="Notice" width="335px" content="" ref={dialogInstance} target="#target" visible={status} open={dialogOpen} close={dialogClose} animationSettings={animationSettings}></DialogComponent>
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
                    <div className="title-container">
                        <h4 className="title-text">Select Event</h4>
                    </div>
                    <DropDownListComponent
                        dataSource={eventsName}
                        fields={{ text: 'name', value: 'id' }}
                        placeholder="Select Event"
                        // value={selectedRoom}
                        change={onFilterChange}
                    />
                </div>
            </div>
        </div>
    </div>);
};
export default App;