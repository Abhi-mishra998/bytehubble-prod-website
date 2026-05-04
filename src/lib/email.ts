// Email sending utility - Uses Resend (https://resend.com)
// Free tier: 100 emails/day, production ready

interface RegistrationData {
  name: string;
  email: string;
  phone: string;
  course: string;
  graduation_year: string;
  degree: string;
  college: string;
  motivation: string;
  source: string;
}

// Email templates for each course
const getEmailTemplate = (course: string, data: RegistrationData) => {
  const baseStyle = `
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #333;
  `;

  const courseEmails: Record<string, { subject: string; html: string }> = {
    "Master Claude AI": {
      subject: "🤖 Welcome to Master Claude AI - 60-Day Mastery Program",
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #2E2A8F;">Master Claude AI Registration Received ✅</h2>
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Thank you for registering for our <strong>Master Claude AI</strong> program!</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E2A8F;">What's Next?</h3>
            <p>✅ Your registration is confirmed<br/>
            📧 We'll send you access details within 24 hours<br/>
            🚀 Program starts with Module 1: Introduction to Claude AI<br/>
            📅 60-day journey to complete mastery</p>
          </div>

          <h3 style="color: #2E2A8F;">Your Program Details</h3>
          <ul>
            <li><strong>Course:</strong> Master Claude AI (60 days, 15 modules)</li>
            <li><strong>Duration:</strong> 1 hour per module</li>
            <li><strong>Format:</strong> Video + Live demos + Hands-on projects</li>
            <li><strong>Certification:</strong> Professional certification included</li>
          </ul>

          <h3 style="color: #2E2A8F;">Program Highlights</h3>
          <ul>
            <li>✓ Complete Claude mastery (APIs, MCP, Prompt Engineering)</li>
            <li>✓ Token optimization (save 40-70% on costs)</li>
            <li>✓ Real-world capstone projects</li>
            <li>✓ 200+ ready-to-use templates</li>
            <li>✓ Lifetime course access & updates</li>
            <li>✓ Professional certification with LinkedIn badge</li>
          </ul>

          <div style="background: #2E2A8F; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">📧 Check your inbox for next steps</p>
          </div>

          <p>Questions? Reply to this email or visit bytehubble.ai</p>
          <p style="color: #999; font-size: 12px;">
            ByteHubble Education | +91-XXXX-XXXX | suresh.avula@bytehubble.ai
          </p>
        </div>
      `
    },
    "PostgreSQL Migration": {
      subject: "📚 PostgreSQL Migration Mastery - Registration Confirmed",
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #2E2A8F;">PostgreSQL Migration Program - Confirmed ✅</h2>
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Great choice! You're registered for <strong>PostgreSQL Migration Mastery</strong>.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E2A8F;">What's Next?</h3>
            <p>✅ Registration confirmed<br/>
            📧 Access details coming within 24 hours<br/>
            🚀 Start with Module 1: Migration Drivers & Architecture<br/>
            ⏰ 15-week program (60-80 hours)</p>
          </div>

          <h3 style="color: #2E2A8F;">You'll Master</h3>
          <ul>
            <li>Oracle to PostgreSQL migrations</li>
            <li>MSSQL to PostgreSQL conversions</li>
            <li>Schema conversion & data migration</li>
            <li>Zero-downtime deployment strategies</li>
            <li>Performance tuning & optimization</li>
          </ul>

          <div style="background: #2E2A8F; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">🎓 Enterprise migration expertise awaits</p>
          </div>

          <p>Questions? Let us know!</p>
          <p style="color: #999; font-size: 12px;">
            ByteHubble Training | suresh.avula@bytehubble.ai
          </p>
        </div>
      `
    },
    "MongoDB DBA Mastery": {
      subject: "🍃 MongoDB DBA Mastery - Welcome!",
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #2E2A8F;">MongoDB DBA Program Registration ✅</h2>
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Excellent! You've registered for <strong>MongoDB DBA Mastery</strong>.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E2A8F;">Getting Started</h3>
            <p>✅ Your spot is confirmed<br/>
            📧 Program access within 24 hours<br/>
            🚀 Module 1: MongoDB Fundamentals<br/>
            📅 12-week comprehensive program</p>
          </div>

          <h3 style="color: #2E2A8F;">Program Includes</h3>
          <ul>
            <li>11 comprehensive modules</li>
            <li>Replication & sharding strategies</li>
            <li>MongoDB Atlas cloud deployment</li>
            <li>Security & performance tuning</li>
            <li>Real-world projects & capstone</li>
          </ul>

          <div style="background: #2E2A8F; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">🎓 NoSQL mastery begins soon</p>
          </div>

          <p>Contact us anytime: suresh.avula@bytehubble.ai</p>
          <p style="color: #999; font-size: 12px;">
            ByteHubble Training | suresh.avula@bytehubble.ai
          </p>
        </div>
      `
    },
    "MS SQL Server DBA": {
      subject: "💻 MS SQL Server DBA Program - Registration Complete",
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #2E2A8F;">MS SQL Server DBA Registration ✅</h2>
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>You're all set for <strong>MS SQL Server DBA Mastery</strong>!</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E2A8F;">What Happens Now</h3>
            <p>✅ Registered and ready<br/>
            📧 Access link in next 24 hours<br/>
            🚀 Start learning: Module 1<br/>
            ⏰ 12-week industry-ready program</p>
          </div>

          <h3 style="color: #2E2A8F;">You Will Learn</h3>
          <ul>
            <li>Production SQL Server administration</li>
            <li>Performance tuning & optimization</li>
            <li>High availability & disaster recovery</li>
            <li>DP-300 certification alignment</li>
            <li>Azure SQL deployment</li>
          </ul>

          <div style="background: #2E2A8F; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">🎓 Production DBA expertise starts now</p>
          </div>

          <p>Questions? suresh.avula@bytehubble.ai</p>
          <p style="color: #999; font-size: 12px;">
            ByteHubble Training | suresh.avula@bytehubble.ai
          </p>
        </div>
      `
    },
    "Applied AI Engineer Mastery": {
      subject: "🚀 Applied AI Engineer Mastery - You're In!",
      html: `
        <div style="${baseStyle}">
          <h2 style="color: #2E2A8F;">AI Engineer Program - Confirmed ✅</h2>
          <p>Hi <strong>${data.name}</strong>,</p>
          <p>Welcome to <strong>Applied AI Engineer Mastery</strong>!</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #2E2A8F;">Next Steps</h3>
            <p>✅ Registration confirmed<br/>
            📧 Program details within 24 hours<br/>
            🚀 Module 1: AI Fundamentals<br/>
            📅 16-week intensive program</p>
          </div>

          <h3 style="color: #2E2A8F;">Program Overview</h3>
          <ul>
            <li>RAG (Retrieval Augmented Generation)</li>
            <li>AI Agents & Multi-Agent Systems</li>
            <li>Fine-tuning & Custom Models</li>
            <li>LLM APIs & Integration</li>
            <li>6+ Real-world projects</li>
          </ul>

          <div style="background: #2E2A8F; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">🤖 AI engineering journey begins</p>
          </div>

          <p>See you soon! suresh.avula@bytehubble.ai</p>
          <p style="color: #999; font-size: 12px;">
            ByteHubble Training | suresh.avula@bytehubble.ai
          </p>
        </div>
      `
    },
  };

  // Default template if course not found
  const defaultTemplate = {
    subject: `✅ Registration Received - ${data.course}`,
    html: `
      <div style="${baseStyle}">
        <h2 style="color: #2E2A8F;">Registration Confirmed ✅</h2>
        <p>Hi <strong>${data.name}</strong>,</p>
        <p>Thank you for registering for <strong>${data.course}</strong>!</p>

        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #2E2A8F;">What's Next?</h3>
          <p>✅ Your registration is confirmed<br/>
          📧 We'll send you program details within 24 hours<br/>
          🚀 Get ready to transform your skills!<br/>
          📞 Any questions? We're here to help</p>
        </div>

        <h3 style="color: #2E2A8F;">Your Registration Details</h3>
        <p>
          <strong>Course:</strong> ${data.course}<br/>
          <strong>Email:</strong> ${data.email}<br/>
          <strong>Phone:</strong> ${data.phone}
        </p>

        <div style="background: #2E2A8F; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
          <p style="margin: 0;">🎓 Your learning journey starts soon</p>
        </div>

        <p>Warm regards,<br/>ByteHubble Team</p>
        <p style="color: #999; font-size: 12px;">
          ByteHubble Training | suresh.avula@bytehubble.ai
        </p>
      </div>
    `
  };

  return courseEmails[course] || defaultTemplate;
};

// Send registration email via Resend
export async function sendRegistrationEmail(data: RegistrationData) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn("[email] RESEND_API_KEY not set - emails disabled");
    return;
  }

  const { subject, html } = getEmailTemplate(data.course, data);
  const adminEmail = process.env.ADMIN_EMAIL || "suresh.avula@bytehubble.ai";

  try {
    // Send to you (admin)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ByteHubble Training <no-reply@bytehubble.ai>",
        to: adminEmail,
        subject: `[ADMIN] ${subject}`,
        html: `
          <div style="font-family: sans-serif;">
            <h3 style="color: #2E2A8F;">🔔 New Course Registration</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Course:</strong> ${data.course}</p>
            <p><strong>College:</strong> ${data.college}</p>
            <p><strong>Degree:</strong> ${data.degree}</p>
            <p><strong>Grad Year:</strong> ${data.graduation_year}</p>
            <p><strong>Source:</strong> ${data.source || "Not specified"}</p>
            <p><strong>Motivation:</strong> ${data.motivation || "Not provided"}</p>
            <hr/>
            <p style="color: #999; font-size: 12px;">Registered at ${new Date().toLocaleString()}</p>
          </div>
        `,
      }),
    });

    // Send confirmation to student
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ByteHubble Training <no-reply@bytehubble.ai>",
        to: data.email,
        subject: subject,
        html: html,
      }),
    });

    console.log(`[email] Sent registration emails for ${data.name} (${data.course})`);
  } catch (error) {
    console.error("[email] Failed to send email:", error instanceof Error ? error.message : String(error));
    // Don't throw - registration already succeeded
  }
}
