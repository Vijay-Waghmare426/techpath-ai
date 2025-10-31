const mongoose = require('mongoose');
require('dotenv').config();

const InterviewQuestion = require('../models/InterviewQuestion');
const BlogPost = require('../models/BlogPost');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techpath-ai')
  .then(() => {
    console.log('✅ Connected to MongoDB for seeding');
    seedData();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

async function seedData() {
  try {
    // Clear existing data
    await InterviewQuestion.deleteMany({});
    await BlogPost.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Interview Questions
    const questions = [
      {
        question: "What is the difference between let, const, and var in JavaScript?",
        answer: "var is function-scoped and can be redeclared and reassigned. let is block-scoped, can be reassigned but not redeclared in the same scope. const is block-scoped and cannot be reassigned or redeclared.",
        category: "frontend",
        difficulty: "Beginner",
        type: "Conceptual",
        tags: ["JavaScript", "ES6", "Variables"],
        popular: true,
        views: 1250,
        likes: 89
      },
      {
        question: "Explain the concept of closures in JavaScript with an example.",
        answer: "A closure is a function that has access to variables in its outer scope even after the outer function has returned. Example: function outer() { let x = 10; return function inner() { console.log(x); }; } The inner function has access to 'x' even after outer() completes.",
        category: "frontend",
        difficulty: "Intermediate",
        type: "Conceptual",
        tags: ["JavaScript", "Closures", "Scope"],
        popular: false,
        views: 890,
        likes: 67
      },
      {
        question: "How do you optimize React component performance?",
        answer: "Use React.memo for functional components, useMemo for expensive calculations, useCallback for function references, implement proper key props for lists, use lazy loading with React.lazy(), avoid inline objects and functions in JSX, and implement virtualization for large lists.",
        category: "frontend",
        difficulty: "Intermediate",
        type: "Performance",
        tags: ["React", "Performance", "Optimization"],
        popular: true,
        views: 2100,
        likes: 156
      },
      {
        question: "What is the difference between REST and GraphQL APIs?",
        answer: "REST uses multiple endpoints with HTTP methods and fixed data structures. GraphQL uses a single endpoint where clients specify exactly what data they need, reducing over-fetching and under-fetching. GraphQL provides real-time subscriptions and strong type system.",
        category: "backend",
        difficulty: "Intermediate",
        type: "Conceptual",
        tags: ["API", "REST", "GraphQL"],
        popular: false,
        views: 1456,
        likes: 98
      },
      {
        question: "Explain the CAP theorem in distributed systems.",
        answer: "CAP theorem states that in a distributed system, you can only guarantee 2 out of 3 properties: Consistency (all nodes see the same data simultaneously), Availability (system remains operational), and Partition tolerance (system continues despite network failures).",
        category: "backend",
        difficulty: "Advanced",
        type: "System Design",
        tags: ["Distributed Systems", "CAP Theorem", "Database"],
        popular: false,
        views: 756,
        likes: 45
      },
      {
        question: "How would you implement authentication in a Node.js application?",
        answer: "Use JWT tokens for stateless authentication, bcrypt for password hashing, implement middleware for route protection, use HTTPS for secure transmission, implement refresh tokens for better security, and consider OAuth for third-party authentication.",
        category: "backend",
        difficulty: "Intermediate",
        type: "Implementation",
        tags: ["Node.js", "Authentication", "JWT", "Security"],
        popular: false,
        views: 934,
        likes: 72
      },
      {
        question: "What is the difference between EC2 and Lambda in AWS?",
        answer: "EC2 provides virtual servers that you manage, with full control over the operating system and applications. Lambda is serverless compute that automatically scales and you only pay for execution time. Lambda is event-driven and has execution time limits.",
        category: "cloud",
        difficulty: "Beginner",
        type: "Conceptual",
        tags: ["AWS", "EC2", "Lambda", "Serverless"],
        popular: false,
        views: 1200,
        likes: 78
      },
      {
        question: "Explain the concept of Infrastructure as Code (IaC).",
        answer: "IaC is managing and provisioning infrastructure through code rather than manual processes. Tools like Terraform, CloudFormation, and Ansible allow you to define infrastructure declaratively, enabling version control, repeatability, and automation.",
        category: "devops",
        difficulty: "Intermediate",
        type: "Conceptual",
        tags: ["DevOps", "IaC", "Terraform", "Automation"],
        popular: true,
        views: 1800,
        likes: 134
      },
      {
        question: "What are the key principles of CI/CD?",
        answer: "Continuous Integration: frequent code integration with automated testing. Continuous Deployment: automated deployment to production after passing all tests. Key principles include automated testing, fast feedback loops, small frequent changes, and maintaining deployable main branch.",
        category: "devops",
        difficulty: "Intermediate",
        type: "Conceptual",
        tags: ["CI/CD", "DevOps", "Automation", "Testing"],
        popular: true,
        views: 1650,
        likes: 112
      },
      {
        question: "How do you handle state management in React Native?",
        answer: "Use useState for local state, useContext for shared state across components, Redux for complex global state, Zustand for simpler global state management, and consider React Query for server state management. Choose based on app complexity and team preferences.",
        category: "mobile",
        difficulty: "Intermediate",
        type: "Implementation",
        tags: ["React Native", "State Management", "Redux", "Context"],
        popular: false,
        views: 945,
        likes: 67
      },
      {
        question: "What is the difference between supervised and unsupervised learning?",
        answer: "Supervised learning uses labeled training data to predict outcomes (classification/regression). Unsupervised learning finds patterns in unlabeled data (clustering/association). Semi-supervised learning combines both approaches.",
        category: "ai",
        difficulty: "Beginner",
        type: "Conceptual",
        tags: ["Machine Learning", "AI", "Supervised Learning", "Unsupervised Learning"],
        popular: true,
        views: 2200,
        likes: 178
      },
      {
        question: "Explain the concept of neural networks and deep learning.",
        answer: "Neural networks are computing systems inspired by biological neural networks. Deep learning uses neural networks with multiple hidden layers to learn complex patterns. Each layer transforms input data, enabling the network to learn hierarchical representations.",
        category: "ai",
        difficulty: "Intermediate",
        type: "Conceptual",
        tags: ["Deep Learning", "Neural Networks", "AI", "Machine Learning"],
        popular: true,
        views: 1890,
        likes: 145
      }
    ];

    await InterviewQuestion.insertMany(questions);
    console.log(`✅ Seeded ${questions.length} interview questions`);

    // Seed Blog Posts
    const blogPosts = [
      {
        title: "The Future of Web Development: AI-Powered Development Tools",
        slug: "future-web-development-ai-powered-tools",
        excerpt: "Explore how artificial intelligence is revolutionizing the way we build web applications, from code generation to automated testing and deployment.",
        content: `# The Future of Web Development: AI-Powered Development Tools

The landscape of web development is rapidly evolving, and artificial intelligence is at the forefront of this transformation. As we step into 2024 and beyond, AI-powered development tools are becoming increasingly sophisticated, offering developers unprecedented capabilities to streamline their workflows and create more robust applications.

## The Current State of AI in Web Development

Today's AI tools go far beyond simple code completion. Modern AI-powered development environments can understand context, suggest architectural patterns, and even generate entire components based on natural language descriptions.

### Key Areas of Impact

- **Code Generation**: AI can now generate complex functions, components, and even entire modules
- **Automated Testing**: Intelligent test case generation and bug detection
- **Performance Optimization**: AI-driven code analysis for performance improvements
- **Documentation**: Automatic generation of comprehensive documentation

## Revolutionary Tools Changing the Game

### GitHub Copilot and Beyond

GitHub Copilot was just the beginning. New tools are emerging that can:

- Generate complete React components from design mockups
- Automatically optimize database queries
- Suggest optimal deployment configurations
- Create accessibility-compliant code by default

### AI-Powered Debugging

Modern AI debuggers can:

\`\`\`javascript
// AI can automatically identify and suggest fixes for issues like this:
function calculateTotal(items) {
  let total = 0;
  for (item of items) { // Missing 'let' keyword - AI would flag this
    total += item.price;
  }
  return total;
}
\`\`\`

## Best Practices for AI-Assisted Development

### 1. Maintain Code Quality Standards

While AI can generate code quickly, developers must still:
- Review generated code thoroughly
- Ensure adherence to project coding standards
- Test AI-generated components rigorously

### 2. Understanding AI Limitations

- AI may not understand complex business logic
- Generated code might not follow your specific architectural patterns
- Security considerations may be overlooked

## The Future Outlook

Looking ahead, we can expect:

- **Fully Automated Deployment Pipelines**: AI will manage the entire DevOps workflow
- **Intelligent Refactoring**: Automatic code modernization and optimization
- **Predictive Development**: AI will anticipate developer needs and suggest improvements proactively

## Conclusion

AI-powered development tools are not replacing developers; they're empowering them to focus on higher-level problem-solving and creative solutions. As these tools continue to evolve, developers who embrace and master them will have a significant advantage in building the next generation of web applications.

The key is to view AI as a powerful assistant that enhances human creativity and efficiency, rather than a replacement for human expertise and judgment.`,
        author: {
          name: "Sarah Chen",
          role: "Senior Frontend Engineer at Google"
        },
        category: "ai",
        tags: ["ai", "web development", "future tech", "automation"],
        isFeatured: true,
        isTrending: true,
        views: 12500,
        likes: 324,
        readTime: "8 min read"
      },
      {
        title: "Mastering React Server Components: A Complete Guide",
        slug: "mastering-react-server-components-guide",
        excerpt: "Deep dive into React Server Components, understanding when to use them, and how they improve performance.",
        content: `# Mastering React Server Components: A Complete Guide

React Server Components represent a paradigm shift in how we think about React applications. This comprehensive guide will walk you through everything you need to know about Server Components, from basic concepts to advanced implementation patterns.

## What are React Server Components?

React Server Components allow developers to build components that render on the server, reducing the amount of JavaScript sent to the client and improving performance. Unlike traditional Server-Side Rendering (SSR), Server Components run exclusively on the server and never hydrate on the client.

### Key Benefits

- **Reduced Bundle Size**: Server Components don't add to your client-side JavaScript bundle
- **Direct Data Access**: Access databases and file systems directly without additional API layers
- **Enhanced Security**: Sensitive operations remain on the server
- **Improved Performance**: Faster initial page loads and reduced client-side processing

## Server vs Client Components

Understanding when to use each type is crucial:

### Server Components (Default)
- Fetch data from databases or APIs
- Access server-only resources
- Render static content
- Don't use browser-only APIs

### Client Components
- Handle user interactions
- Use browser APIs (localStorage, geolocation, etc.)
- Maintain state with hooks
- Marked with 'use client' directive

\`\`\`jsx
// Server Component (default)
export default async function BlogPost({ slug }) {
  const post = await db.posts.findBySlug(slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
      <LikeButton initialLikes={post.likes} /> {/* Client Component */}
    </article>
  );
}

// Client Component
'use client';
import { useState } from 'react';

export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  
  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  );
}
\`\`\`

## Data Fetching Patterns

### Direct Database Access

\`\`\`jsx
// Server Component can directly access the database
export default async function UserProfile({ userId }) {
  const user = await db.users.findById(userId);
  const posts = await db.posts.findByAuthor(userId);
  
  return (
    <div>
      <h1>{user.name}</h1>
      <PostList posts={posts} />
    </div>
  );
}
\`\`\`

### Parallel Data Fetching

\`\`\`jsx
export default async function Dashboard() {
  // Fetch data in parallel
  const [user, analytics, notifications] = await Promise.all([
    fetchUser(),
    fetchAnalytics(),
    fetchNotifications()
  ]);
  
  return (
    <div>
      <UserHeader user={user} />
      <Analytics data={analytics} />
      <NotificationCenter notifications={notifications} />
    </div>
  );
}
\`\`\`

## Best Practices

### 1. Component Boundaries

- Keep Server Components at the data fetching layer
- Use Client Components for interactivity
- Pass data down from Server to Client Components

### 2. Error Handling

\`\`\`jsx
export default async function ProductList() {
  try {
    const products = await fetchProducts();
    return <ProductGrid products={products} />;
  } catch (error) {
    return <ErrorMessage error={error} />;
  }
}
\`\`\`

### 3. Streaming and Suspense

\`\`\`jsx
export default function ProductPage() {
  return (
    <div>
      <ProductHeader />
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews /> {/* Server Component that fetches data */}
      </Suspense>
    </div>
  );
}
\`\`\`

## Common Pitfalls and Solutions

### 1. Prop Serialization

Only serializable props can be passed between Server and Client Components:

\`\`\`jsx
// ❌ Won't work - functions aren't serializable
<ClientComponent onSubmit={() => console.log('submit')} />

// ✅ Works - use server actions instead
<ClientComponent action={submitForm} />
\`\`\`

### 2. State Management

Server Components can't use React hooks:

\`\`\`jsx
// ❌ Won't work in Server Component
const [count, setCount] = useState(0);

// ✅ Move to Client Component
'use client';
const [count, setCount] = useState(0);
\`\`\`

## Getting Started

### 1. Set up Next.js App Router

\`\`\`bash
npx create-next-app@latest my-app --app
cd my-app
npm run dev
\`\`\`

### 2. Create Your First Server Component

\`\`\`jsx
// app/posts/page.js
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts');
  
  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

## Conclusion

React Server Components represent the future of React development, offering significant performance benefits and a better developer experience. By understanding when and how to use them effectively, you can build faster, more efficient React applications.

Start small, experiment with the patterns shown in this guide, and gradually adopt Server Components in your existing projects. The investment in learning this technology will pay dividends in application performance and maintainability.`,
        author: {
          name: "Michael Rodriguez",
          role: "Full Stack Developer"
        },
        category: "react",
        tags: ["react", "server components", "performance"],
        views: 8200,
        likes: 156,
        readTime: "12 min read"
      },
      {
        title: "Building Scalable APIs with Node.js and Microservices",
        slug: "building-scalable-apis-nodejs-microservices",
        excerpt: "Learn how to design and implement scalable microservices architecture using Node.js and Docker.",
        content: "Full content here...",
        author: {
          name: "Emily Johnson",
          role: "Backend Architect"
        },
        category: "nodejs",
        tags: ["nodejs", "microservices", "architecture", "docker"],
        views: 6800,
        likes: 198,
        readTime: "15 min read"
      },
      {
        title: "AWS Lambda vs Azure Functions: Performance Comparison",
        slug: "aws-lambda-vs-azure-functions-comparison",
        excerpt: "Comprehensive comparison of serverless computing platforms, including performance benchmarks and cost analysis.",
        content: "Full content here...",
        author: {
          name: "David Kim",
          role: "Cloud Solutions Architect"
        },
        category: "cloud",
        tags: ["aws", "azure", "serverless", "cloud computing"],
        views: 9100,
        likes: 243,
        readTime: "10 min read"
      },
      {
        title: "DevOps Best Practices for 2025: CI/CD Pipeline Optimization",
        slug: "devops-best-practices-2025-cicd-optimization",
        excerpt: "Updated strategies for implementing efficient CI/CD pipelines with modern tools and practices.",
        content: "Full content here...",
        author: {
          name: "Alex Thompson",
          role: "DevOps Engineer"
        },
        category: "devops",
        tags: ["devops", "ci/cd", "automation", "best practices"],
        views: 7500,
        likes: 189,
        readTime: "14 min read"
      },
      {
        title: "JavaScript Performance Optimization Techniques in 2025",
        slug: "javascript-performance-optimization-techniques-2025",
        excerpt: "Essential techniques for optimizing JavaScript performance in modern web applications.",
        content: "Full content here...",
        author: {
          name: "Lisa Wang",
          role: "Performance Engineer"
        },
        category: "javascript",
        tags: ["javascript", "performance", "optimization", "best practices"],
        views: 10200,
        likes: 287,
        readTime: "11 min read"
      },
      {
        title: "Career Transition: From Bootcamp to Senior Developer",
        slug: "career-transition-bootcamp-to-senior-developer",
        excerpt: "Real stories and practical advice for advancing your career from bootcamp graduate to senior developer role.",
        content: "Full content here...",
        author: {
          name: "James Martinez",
          role: "Senior Software Engineer"
        },
        category: "career",
        tags: ["career", "bootcamp", "senior developer", "growth"],
        views: 5600,
        likes: 142,
        readTime: "9 min read"
      }
    ];

    await BlogPost.insertMany(blogPosts);
    console.log(`✅ Seeded ${blogPosts.length} blog posts`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}