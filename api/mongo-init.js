db = db.getSiblingDB("upivot");

db.createCollection("drills");

db.drills.insertMany([
  {
    title: "SQL Injection Basics",
    difficulty: "easy",
    tags: ["security", "sql", "injection"],
    questions: [
      { id: "Q1", prompt: "What is the primary risk of SQL injection?", keywords: ["unauthorized access", "data leak", "modify database"] },
      { id: "Q2", prompt: "How can parameterized queries help?", keywords: ["prepared statements", "bind variables", "safe queries"] },
      { id: "Q3", prompt: "What database operations are vulnerable?", keywords: ["select", "update", "delete"] },
      { id: "Q4", prompt: "Which SQL clause is most often exploited?", keywords: ["where", "order by", "union"] },
      { id: "Q5", prompt: "How can input sanitization reduce SQL injection?", keywords: ["escape characters", "whitelist", "validate input"] }
    ]
  },
  {
    title: "Cross-Site Scripting (XSS)",
    difficulty: "medium",
    tags: ["security", "xss", "javascript"],
    questions: [
      { id: "Q1", prompt: "What is reflected XSS?", keywords: ["user input", "unsanitized", "script injection"] },
      { id: "Q2", prompt: "What is stored XSS?", keywords: ["database", "persistent", "injected script"] },
      { id: "Q3", prompt: "What is DOM-based XSS?", keywords: ["client-side", "document object model", "javascript"] },
      { id: "Q4", prompt: "Name one way to mitigate XSS.", keywords: ["input validation", "output encoding", "CSP"] },
      { id: "Q5", prompt: "Which HTTP header helps prevent XSS?", keywords: ["X-XSS-Protection", "Content-Security-Policy", "X-Content-Type-Options"] }
    ]
  },
  {
    title: "Privilege Escalation",
    difficulty: "hard",
    tags: ["security", "privilege", "linux"],
    questions: [
      { id: "Q1", prompt: "What is privilege escalation?", keywords: ["root access", "admin rights", "misconfiguration"] },
      { id: "Q2", prompt: "Which Linux file often contains SUID binaries?", keywords: ["/etc/passwd", "/etc/shadow", "find suid"] },
      { id: "Q3", prompt: "What is horizontal privilege escalation?", keywords: ["same level", "different user", "access resources"] },
      { id: "Q4", prompt: "What is vertical privilege escalation?", keywords: ["low privilege", "root", "administrator"] },
      { id: "Q5", prompt: "How can patch management help prevent escalation?", keywords: ["update software", "security patches", "fix vulnerabilities"] }
    ]
  },
  {
    title: "Phishing Attacks",
    difficulty: "easy",
    tags: ["security", "phishing", "social-engineering"],
    questions: [
      { id: "Q1", prompt: "What is phishing?", keywords: ["fraud", "fake emails", "steal credentials"] },
      { id: "Q2", prompt: "What is spear phishing?", keywords: ["targeted", "specific person", "organization"] },
      { id: "Q3", prompt: "What is whaling?", keywords: ["executives", "high-value targets", "fraud"] },
      { id: "Q4", prompt: "How to detect a phishing email?", keywords: ["suspicious links", "typos", "sender address"] },
      { id: "Q5", prompt: "How to protect against phishing?", keywords: ["training", "spam filters", "2FA"] }
    ]
  },
  {
    title: "Denial of Service (DoS)",
    difficulty: "medium",
    tags: ["security", "dos", "ddos"],
    questions: [
      { id: "Q1", prompt: "What is a DoS attack?", keywords: ["overload server", "deny access", "network flood"] },
      { id: "Q2", prompt: "What is a DDoS attack?", keywords: ["distributed", "botnets", "multiple sources"] },
      { id: "Q3", prompt: "What is a SYN flood?", keywords: ["tcp handshake", "half-open", "exhaust resources"] },
      { id: "Q4", prompt: "How to mitigate DDoS attacks?", keywords: ["firewall", "rate limiting", "cloud protection"] },
      { id: "Q5", prompt: "Which layer of OSI model does DoS usually target?", keywords: ["network layer", "transport layer", "application layer"] }
    ]
  },
  {
    title: "Password Security",
    difficulty: "easy",
    tags: ["security", "password", "authentication"],
    questions: [
      { id: "Q1", prompt: "Why are strong passwords important?", keywords: ["prevent attacks", "secure accounts", "reduce risk"] },
      { id: "Q2", prompt: "What is a brute force attack?", keywords: ["try combinations", "guessing", "password cracking"] },
      { id: "Q3", prompt: "What is a dictionary attack?", keywords: ["common words", "password list", "cracking"] },
      { id: "Q4", prompt: "How does password hashing help?", keywords: ["irreversible", "bcrypt", "store securely"] },
      { id: "Q5", prompt: "What is multi-factor authentication?", keywords: ["two-factor", "OTP", "extra security"] }
    ]
  },
  {
    title: "Network Security",
    difficulty: "medium",
    tags: ["security", "network", "firewall"],
    questions: [
      { id: "Q1", prompt: "What is a firewall?", keywords: ["filter traffic", "block access", "security rule"] },
      { id: "Q2", prompt: "What is IDS?", keywords: ["intrusion detection system", "monitor traffic", "detect threats"] },
      { id: "Q3", prompt: "What is IPS?", keywords: ["intrusion prevention system", "block traffic", "prevent attacks"] },
      { id: "Q4", prompt: "What is a VPN?", keywords: ["secure tunnel", "encrypt traffic", "privacy"] },
      { id: "Q5", prompt: "What is port scanning?", keywords: ["nmap", "open ports", "network reconnaissance"] }
    ]
  },
  {
    title: "Malware Analysis",
    difficulty: "hard",
    tags: ["security", "malware", "analysis"],
    questions: [
      { id: "Q1", prompt: "What is malware?", keywords: ["malicious software", "virus", "worm"] },
      { id: "Q2", prompt: "What is a trojan?", keywords: ["fake software", "backdoor", "exploit"] },
      { id: "Q3", prompt: "What is ransomware?", keywords: ["encrypt files", "demand ransom", "malware"] },
      { id: "Q4", prompt: "What is spyware?", keywords: ["monitor activity", "steal data", "keylogger"] },
      { id: "Q5", prompt: "What is sandboxing in malware analysis?", keywords: ["isolation", "test safely", "virtual environment"] }
    ]
  },
  {
    title: "Cloud Security",
    difficulty: "medium",
    tags: ["security", "cloud", "aws", "azure"],
    questions: [
      { id: "Q1", prompt: "What is shared responsibility model?", keywords: ["cloud provider", "customer", "security responsibilities"] },
      { id: "Q2", prompt: "What is IAM in cloud?", keywords: ["identity access management", "users", "permissions"] },
      { id: "Q3", prompt: "What is data encryption at rest?", keywords: ["storage encryption", "cloud security", "AES"] },
      { id: "Q4", prompt: "What is cloud misconfiguration?", keywords: ["public bucket", "open ports", "default settings"] },
      { id: "Q5", prompt: "How to secure APIs in cloud?", keywords: ["authentication", "rate limiting", "api gateway"] }
    ]
  },
  {
    title: "Incident Response",
    difficulty: "hard",
    tags: ["security", "incident", "response"],
    questions: [
      { id: "Q1", prompt: "What is incident response?", keywords: ["detect", "respond", "recover"] },
      { id: "Q2", prompt: "What is the first phase of incident response?", keywords: ["preparation", "planning", "readiness"] },
      { id: "Q3", prompt: "What is containment in incident response?", keywords: ["limit impact", "stop spread", "isolate"] },
      { id: "Q4", prompt: "What is eradication?", keywords: ["remove threat", "clean system", "fix vulnerabilities"] },
      { id: "Q5", prompt: "What is recovery?", keywords: ["restore system", "monitor", "resume operations"] }
    ]
  }
]);
